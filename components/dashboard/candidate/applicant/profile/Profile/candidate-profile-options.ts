export const WORK_TYPE_OPTIONS = [
  { value: "remote", label: "Remote" },
  { value: "hybrid", label: "Hybrid" },
  { value: "onsite", label: "On-site" },
];

export const AVAILABILITY_OPTIONS = [
  { value: "immediate", label: "Immediate" },
  { value: "one_week", label: "1 week notice" },
  { value: "two_weeks", label: "2 weeks notice" },
  { value: "one_month", label: "1 month notice" },
];

export function optionLabel(options: { value: string; label: string }[], value: string | null): string | null {
  if (!value) return null;
  return options.find((option) => option.value === value)?.label || value;
}
