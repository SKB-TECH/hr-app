import { SidebarFilterCompany } from "@/types/types";
import { SharedFilterSection } from "./SharedFilterSection";

export function SidebarFilters({
  sidebarFilterData,
  className,
  isCollapsible,
}: {
  sidebarFilterData: SidebarFilterCompany[];
  className?: string;
  isCollapsible: boolean;
}) {
  return (
    <aside className={`lg:w-72 shrink-0 ${className || ""}`}>
      {sidebarFilterData.map((filter) => (
        <SharedFilterSection
          key={filter.title}
          title={filter.title}
          options={filter.options}
          isCollapsible={isCollapsible}
        />
      ))}
    </aside>
  );
}
