import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ListFilter } from "lucide-react";
import { TableHeaderFilters } from "./table-header";
import { STATUS_OPTIONS, JOB_TYPE_OPTIONS } from "@/data/company-job-listing";
import FilterCheckbox from "./filter-checkbox";

function FilterDropDown({
  statusFilters,
  jobTypeFilters,
  onStatusChange,
  onJobTypeChange,
}: TableHeaderFilters) {
  const activeCount = statusFilters.length + jobTypeFilters.length;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="border  border-[#D6DDEB] px-4 py-2 flex gap-2 items-center cursor-pointer hover:border-indigo-400 transition-colors relative">
          <ListFilter size={16} />
          <span className=" text-sm">Filter</span>
          {activeCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {activeCount}
            </span>
          )}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-56 p-4 shadow-none!  border-[#D6DDEB] rounded-none"
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        {/* Status section */}
        <p className="text-[11px] font-semibold text-neutral-60 uppercase tracking-widest mb-2">
          Status
        </p>
        <div className="flex flex-col gap-2 mb-4">
          {STATUS_OPTIONS.map((status) => (
            <label
              key={status}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <FilterCheckbox
                checked={statusFilters.includes(status)}
                onChange={(checked) => onStatusChange(status, checked)}
              />
              <span className="text-sm text-neutral-100 group-hover:text-indigo-600 transition-colors">
                {status}
              </span>
            </label>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-[#D6DDEB] my-3" />

        {/* Job Type section */}
        <p className="text-[11px] font-semibold text-neutral-60 uppercase tracking-widest mb-2">
          Job Type
        </p>
        <div className="flex flex-col gap-2">
          {JOB_TYPE_OPTIONS.map((type) => (
            <label
              key={type}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <FilterCheckbox
                checked={jobTypeFilters.includes(type)}
                onChange={(checked) => onJobTypeChange(type, checked)}
              />
              <span className="text-sm text-neutral-100 group-hover:text-indigo-600 transition-colors">
                {type}
              </span>
            </label>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default FilterDropDown;
