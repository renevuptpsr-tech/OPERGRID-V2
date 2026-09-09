export type SelectOption = { value: string; label: string; disabled?: boolean; keywords?: readonly string[] };
export function filterOptions(options: readonly SelectOption[], query: string): SelectOption[] {
  const needle = query.trim().normalize("NFKD").replace(/\p{M}/gu, "").toLocaleLowerCase("id-ID");
  return options.filter((option) => [option.label, ...(option.keywords ?? [])].join(" ")
    .normalize("NFKD").replace(/\p{M}/gu, "").toLocaleLowerCase("id-ID").includes(needle));
}
export function nextEnabledOption(options: readonly SelectOption[], current: number, direction: 1 | -1): number {
  for (let step = 1; step <= options.length; step++) {
    const index = (current + direction * step + options.length) % options.length;
    if (!options[index].disabled) return index;
  }
  return -1;
}
export function selectedOption(options: readonly SelectOption[], value: string) { return options.find((option) => option.value === value); }
