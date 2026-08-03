import { Button } from "@/components/ui/button";
import { SharedFilterSection } from "./SharedFilterSection";
import { X } from "lucide-react";
import { SidebarFilterCompany } from "@/types/types";

function MobileFilters({
  setShowMobileFilters,
  DataToFilter,
}: {
  setShowMobileFilters: React.Dispatch<React.SetStateAction<boolean>>;
  DataToFilter: SidebarFilterCompany[];
}) {
  return (
    <div className="max-md:flex fixed hidden inset-0 bg-neutral-100/30 z-50  items-center justify-center">
      <div className="flex flex-col  bg-white  h-[95vh] w-[90%]  p-6 overflow-y-auto">
        <div className="flex justify-between items-center mb-4 text-neutral-100">
          <h3 className="font-semibold  font-clash text-[20px]">
            More Filters
          </h3>
          <X
            size={24}
            className="cursor-pointer"
            onClick={() => setShowMobileFilters(false)}
          />
        </div>

        {DataToFilter.map((filter) => (
          <SharedFilterSection
            key={filter.title}
            title={filter.title}
            options={filter.options}
          />
        ))}

        <Button className="rounded-none bg-brand w-full py-1  mt-auto">
          Apply
        </Button>
      </div>
    </div>
  );
}

export default MobileFilters;
