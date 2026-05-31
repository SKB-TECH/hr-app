import { SidebarFilterCompany } from "@/types/types";
import { SharedFilterSection } from "./SharedFilterSection";

export function SidebarFilters({
  sidebarFilterData,
}: {
  sidebarFilterData: SidebarFilterCompany[];
}) {
  return (
    <aside className="lg:w-72 shrink-0">
      {sidebarFilterData.map((filter) => (
        <SharedFilterSection
          key={filter.title}
          title={filter.title}
          options={filter.options}
        />
      ))}
    </aside>
  );
}
