"use client";

import {
  Check,
  ChevronDown,
  Search,
  X,
} from "lucide-react";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";


export type SearchableComboboxOption = {
  value: string;
  label: string;
  description?: string | null;
};


type SearchableComboboxProps = {
  name?: string;

  value: string;

  onChange: (
    value: string
  ) => void;

  options:
    SearchableComboboxOption[];

  placeholder?: string;

  searchPlaceholder?: string;

  emptyText?: string;

  disabled?: boolean;

  allowClear?: boolean;
};


export function SearchableCombobox({
  name,
  value,
  onChange,
  options,
  placeholder =
    "Select option",
  searchPlaceholder =
    "Search...",
  emptyText =
    "No results found.",
  disabled =
    false,
  allowClear =
    true,
}: SearchableComboboxProps) {
  const [
    open,
    setOpen,
  ] =
    useState(false);


  const [
    query,
    setQuery,
  ] =
    useState("");


  const rootRef =
    useRef<HTMLDivElement>(
      null
    );


  const selectedOption =
    useMemo(
      () =>
        options.find(
          (
            option
          ) =>
            option.value ===
            value
        ) ??
        null,
      [
        options,
        value,
      ]
    );


  const filteredOptions =
    useMemo(
      () => {
        const normalizedQuery =
          query
            .trim()
            .toLowerCase();


        if (!normalizedQuery) {
          return options;
        }


        return options.filter(
          (
            option
          ) => {
            const searchable =
              [
                option.label,
                option.description ??
                  "",
              ]
                .join(" ")
                .toLowerCase();


            return searchable.includes(
              normalizedQuery
            );
          }
        );
      },
      [
        options,
        query,
      ]
    );


  useEffect(
    () => {
      function handleOutsideClick(
        event: MouseEvent
      ) {
        if (
          rootRef.current &&
          !rootRef.current.contains(
            event.target as Node
          )
        ) {
          setOpen(
            false
          );
        }
      }


      document.addEventListener(
        "mousedown",
        handleOutsideClick
      );


      return () => {
        document.removeEventListener(
          "mousedown",
          handleOutsideClick
        );
      };
    },
    []
  );


  function selectValue(
    nextValue: string
  ) {
    onChange(
      nextValue
    );

    setOpen(
      false
    );

    setQuery(
      ""
    );
  }


  return (
    <div
      ref={
        rootRef
      }
      className="relative"
    >

      {name && (
        <input
          type="hidden"
          name={
            name
          }
          value={
            value
          }
        />
      )}


      <button
        type="button"
        disabled={
          disabled
        }
        onClick={() =>
          setOpen(
            (
              current
            ) =>
              !current
          )
        }
        className="og-ui-input flex h-10 w-full items-center justify-between gap-3 rounded-[10px] px-3 text-left outline-none transition"
        aria-expanded={
          open
        }
      >

        <span
          className={[
            "min-w-0 flex-1 truncate text-[11px]",
            selectedOption
              ? "og-text"
              : "og-muted",
          ].join(
            " "
          )}
        >
          {selectedOption
            ?.label ??
            placeholder}
        </span>


        <div className="flex shrink-0 items-center gap-1">

          {allowClear &&
           selectedOption &&
           !disabled && (
            <span
              role="button"
              tabIndex={0}
              aria-label="Clear selection"
              onClick={(
                event
              ) => {
                event.stopPropagation();

                selectValue(
                  ""
                );
              }}
              onKeyDown={(
                event
              ) => {
                if (
                  event.key ===
                    "Enter" ||
                  event.key ===
                    " "
                ) {
                  event.preventDefault();

                  event.stopPropagation();

                  selectValue(
                    ""
                  );
                }
              }}
              className="og-muted flex h-6 w-6 items-center justify-center rounded-[7px] transition hover:bg-[var(--og-surface-soft)] hover:text-[var(--og-text)]"
            >
              <X
                size={12}
              />
            </span>
          )}


          <ChevronDown
            size={13}
            className={[
              "og-muted transition-transform",
              open
                ? "rotate-180"
                : "",
            ].join(
              " "
            )}
          />

        </div>

      </button>


      {open &&
       !disabled && (
        <div
          className="absolute left-0 right-0 z-[120] mt-1.5 overflow-hidden rounded-[12px] border"
          style={{
            background:
              "var(--og-surface-raised)",

            borderColor:
              "var(--og-border)",

            boxShadow:
              "0 16px 40px rgba(7,17,28,0.16)",
          }}
        >

          <div
            className="border-b p-2"
            style={{
              borderColor:
                "var(--og-border-soft)",
            }}
          >

            <div
              className="flex h-9 items-center gap-2 rounded-[9px] border px-2.5"
              style={{
                borderColor:
                  "var(--og-border-soft)",

                background:
                  "var(--og-surface-soft)",
              }}
            >

              <Search
                size={13}
                className="og-muted shrink-0"
              />


              <input
                autoFocus
                type="text"
                value={
                  query
                }
                onChange={(
                  event
                ) =>
                  setQuery(
                    event.target.value
                  )
                }
                placeholder={
                  searchPlaceholder
                }
                className="og-text min-w-0 flex-1 bg-transparent text-[10px] outline-none"
              />

            </div>

          </div>


          <div className="max-h-[260px] overflow-y-auto p-1.5">

            {filteredOptions.length ===
            0 ? (
              <div className="og-muted px-3 py-6 text-center text-[9px]">
                {emptyText}
              </div>
            ) : (
              filteredOptions.map(
                (
                  option
                ) => {

                  const selected =
                    option.value ===
                    value;


                  return (
                    <button
                      key={
                        option.value
                      }
                      type="button"
                      onClick={() =>
                        selectValue(
                          option.value
                        )
                      }
                      className="flex w-full items-start gap-2.5 rounded-[9px] px-3 py-2.5 text-left transition hover:bg-[var(--og-surface-soft)]"
                    >

                      <div className="min-w-0 flex-1">

                        <div className="og-text truncate text-[10px] font-medium">
                          {option.label}
                        </div>


                        {option.description && (
                          <div className="og-muted mt-0.5 truncate text-[8px]">
                            {option.description}
                          </div>
                        )}

                      </div>


                      {selected && (
                        <Check
                          size={13}
                          strokeWidth={2}
                          style={{
                            color:
                              "var(--og-cyan-strong)",
                          }}
                          className="mt-0.5 shrink-0"
                        />
                      )}

                    </button>
                  );
                }
              )
            )}

          </div>

        </div>
      )}

    </div>
  );
}