"use client";

import { useState } from "react";
import MobileFilterButton from "./MobileFilterButton";
import MobileFilters from "./MobileFilters";
import { SidebarFilterCompany } from "@/types/types";

function SharedDisplayMobileFilter({
  DataToFilter,
}: {
  DataToFilter: SidebarFilterCompany[];
}) {
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  return (
    <div>
      {showMobileFilters && (
        <MobileFilters
          DataToFilter={DataToFilter}
          setShowMobileFilters={setShowMobileFilters}
        />
      )}
      <MobileFilterButton setShowMobileFilters={setShowMobileFilters} />
    </div>
  );
}

export default SharedDisplayMobileFilter;
