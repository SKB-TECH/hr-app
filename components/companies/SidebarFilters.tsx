import { FilterOption } from "@/types/types";
import { FilterSection } from "./FilterSection";

interface SidebarFiltersProps {
  industries: FilterOption[];
  companySizes: FilterOption[];
}

export function SidebarFilters({
  industries,
  companySizes,
}: SidebarFiltersProps) {
  return (
    <aside className="lg:w-72 shrink-0">
      <FilterSection title="Industry" options={industries} />
      <FilterSection
        title="Company Size"
        options={companySizes}
        defaultSelected={["251-500"]}
      />
    </aside>
  );
}
