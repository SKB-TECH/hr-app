"use client";

import FilterDropDown from "./filter-dropdown";
import ClearFilters from "./clear-filters";
import DateRangePicker from "./date-picker";

export interface TableHeaderFilters {
  statusFilters: string[];
  jobTypeFilters: string[];
  onStatusChange: (value: string, checked: boolean) => void;
  onJobTypeChange: (value: string, checked: boolean) => void;
  onClearFilters: () => void;
}

function TableHeader({
  statusFilters,
  jobTypeFilters,
  onStatusChange,
  onJobTypeChange,
  onClearFilters,
}: TableHeaderFilters) {
  const activeCount = statusFilters.length + jobTypeFilters.length;

  return (
    <div className="sm:border-b  border-brand-light-neutral w-full py-4 max-sm:pt-1 max-md:px-2 pb-5  flex items-center justify-between  px-3 max-md:gap-4">
      <div className="sm:hidden">
        <DateRangePicker />
      </div>
      <h1 className="max-sm:hidden block text-[20px]   font-bold text-neutral-100 tracking-tight">
        Job List
      </h1>
      <div className="flex items-center gap-2 max-sm:mr-4">
        {activeCount > 0 && <ClearFilters onClearFilters={onClearFilters} />}
        <FilterDropDown
          statusFilters={statusFilters}
          jobTypeFilters={jobTypeFilters}
          onStatusChange={onStatusChange}
          onJobTypeChange={onJobTypeChange}
          onClearFilters={onClearFilters}
        />
      </div>
    </div>
  );
}

export default TableHeader;
