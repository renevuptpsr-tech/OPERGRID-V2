"use client";
import { useId, useMemo, useRef, useState, type KeyboardEvent } from "react";
import * as Popover from "@radix-ui/react-popover";
import { Check, ChevronDown, X } from "lucide-react";
import { Input, type InputProps } from "../primitives/input";
import { IconButton } from "../primitives/icon-button";
import { filterOptions, nextEnabledOption, selectedOption, type SelectOption } from "./options";
import { useFormPortal } from "./use-form-portal";
import { useValue } from "./use-value";

export type ComboboxProps = Omit<InputProps, "value" | "defaultValue" | "onChange" | "rightSlot" | "type" | "role" | "readOnly"> & {
  options: readonly SelectOption[]; value?: string; defaultValue?: string; onValueChange?: (value: string) => void;
  loading?: boolean; clearable?: boolean; onQueryChange?: (query: string) => void;
  filter?: boolean; selectedLabel?: string; emptyText?: string;
};
const ROW_HEIGHT = 36;
export function Combobox({ options, value, defaultValue = "", onValueChange, loading = false,
  clearable = true, onQueryChange, filter = true, selectedLabel, emptyText = "Tidak ada pilihan",
  disabled, required, name, form, id, placeholder = "Cari pilihan…", onKeyDown, onFocus, ...props }: ComboboxProps) {
  const generated = useId(), inputId = id ?? generated, listId = `${inputId}-list`;
  const [selected, setSelected] = useValue(value, defaultValue, onValueChange);
  const [open, setOpen] = useState(false), [query, setQuery] = useState("");
  const [highlight, setHighlight] = useState(-1), [windowStart, setWindowStart] = useState(0);
  const viewport = useRef<HTMLDivElement>(null);
  const { container, attachHost } = useFormPortal();
  const filtered = useMemo(() => filter ? filterOptions(options, query) : [...options], [options, query, filter]);
  const active = filtered[highlight] && !filtered[highlight].disabled ? highlight : nextEnabledOption(filtered, -1, 1);
  const label = selectedOption(options, selected)?.label ?? selectedLabel ?? selected;
  const start = Math.max(0, windowStart - 3), end = Math.min(filtered.length, windowStart + 12);
  const visible = Array.from({ length: Math.max(0, end - start) }, (_, i) => start + i);
  if (active >= 0 && !visible.includes(active)) visible.push(active);
  function changeOpen(next: boolean) {
    setOpen(!disabled && next);
    if (next) { setQuery(""); onQueryChange?.(""); setHighlight(-1); setWindowStart(0); }
  }
  function move(index: number) {
    setHighlight(index);
    const el = viewport.current;
    if (!el || index < 0) return;
    const top = index * ROW_HEIGHT;
    if (top < el.scrollTop) el.scrollTop = top;
    else if (top + ROW_HEIGHT > el.scrollTop + el.clientHeight) el.scrollTop = top + ROW_HEIGHT - el.clientHeight;
    setWindowStart(Math.floor(el.scrollTop / ROW_HEIGHT));
  }
  function choose(index: number) {
    const option = filtered[index];
    if (!option || option.disabled || disabled || loading) return;
    setSelected(option.value); setOpen(false); setQuery("");
  }
  function keyboard(event: KeyboardEvent<HTMLInputElement>) {
    onKeyDown?.(event);
    if (event.defaultPrevented || event.nativeEvent.isComposing) return;
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      if (!open) {
        changeOpen(true);
        setHighlight(event.key === "ArrowUp" ? nextEnabledOption(options, 0, -1) : nextEnabledOption(options, -1, 1));
        return;
      }
      move(nextEnabledOption(filtered, active, event.key === "ArrowDown" ? 1 : -1));
    } else if (open && (event.key === "Home" || event.key === "End")) {
      event.preventDefault(); move(nextEnabledOption(filtered, event.key === "Home" ? -1 : 0, event.key === "Home" ? 1 : -1));
    } else if (open && event.key === "Enter") { event.preventDefault(); choose(active); }
    else if (event.key === "Escape" && open) { event.preventDefault(); setOpen(false); }
    else if (event.key === "Tab") setOpen(false);
  }
  return <span ref={attachHost} className="og-ds-control-host">
    {name && <input type="hidden" name={name} form={form} value={selected} disabled={disabled} />}
    <Popover.Root open={open && !disabled} onOpenChange={changeOpen}>
      <Popover.Anchor asChild><span className="og-ds-control-host">
        <Input {...props} id={inputId} form={form} type="text" role="combobox" autoComplete="off"
          disabled={disabled} aria-required={required} aria-expanded={open && !disabled}
          aria-controls={open ? listId : undefined} aria-autocomplete="list" aria-haspopup="listbox"
          aria-activedescendant={open && active >= 0 ? `${listId}-${active}` : undefined}
          aria-busy={loading} value={open ? query : label} placeholder={placeholder}
          onFocus={(event) => { onFocus?.(event); if (!event.defaultPrevented) changeOpen(true); }}
          onClick={() => { if (!open) changeOpen(true); }} onKeyDown={keyboard}
          onChange={(event) => { setQuery(event.target.value); onQueryChange?.(event.target.value); setHighlight(-1); setWindowStart(0); if (viewport.current) viewport.current.scrollTop = 0; setOpen(true); }}
          rightSlot={<>
            {loading && <span className="og-ds-spinner" aria-hidden="true" />}
            {clearable && !required && selected && <IconButton size="sm" aria-label="Hapus pilihan" disabled={disabled}
              onClick={() => { setSelected(""); setQuery(""); onQueryChange?.(""); setOpen(false); }}><X /></IconButton>}
            <ChevronDown size={14} aria-hidden="true" />
          </>} />
      </span></Popover.Anchor>
      <Popover.Portal container={container}>
        <Popover.Content className="og-ds-combobox-content" sideOffset={4} collisionPadding={12}
          role="presentation" onOpenAutoFocus={(event) => event.preventDefault()} onCloseAutoFocus={(event) => event.preventDefault()}
          onInteractOutside={(event) => { if ((event.target as HTMLElement)?.id === inputId) event.preventDefault(); }}>
          <div role="status" className="og-ds-field-help og-ds-option-summary">{loading ? "Memuat pilihan…" : `${filtered.length} pilihan`}</div>
          <div ref={viewport} id={listId} role="listbox" aria-label={props["aria-label"] ?? "Pilihan"}
            className="og-ds-combobox-list" onScroll={(event) => setWindowStart(Math.floor(event.currentTarget.scrollTop / ROW_HEIGHT))}>
            <div role="presentation" style={{ height: filtered.length * ROW_HEIGHT, position: "relative" }}>
              {visible.map((index) => { const option = filtered[index]; return <div key={option.value}
                id={`${listId}-${index}`} role="option" aria-selected={option.value === selected}
                aria-disabled={option.disabled || loading || undefined} aria-posinset={index + 1} aria-setsize={filtered.length}
                data-highlighted={index === active || undefined} className="og-ds-option og-ds-virtual-option"
                style={{ top: index * ROW_HEIGHT, height: ROW_HEIGHT }} title={option.label}
                onPointerMove={() => { if (!option.disabled) setHighlight(index); }}
                onMouseDown={(event) => event.preventDefault()} onClick={() => choose(index)}>
                <span>{option.label}</span>{option.value === selected && <Check size={14} aria-hidden="true" />}
              </div>; })}
            </div>
          </div>
          {!loading && !filtered.length && <p className="og-ds-option-summary">{emptyText}</p>}
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  </span>;
}
