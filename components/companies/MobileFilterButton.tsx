import Image from "next/image";
import { SidebarFilters } from "./SidebarFilters";
import { companySizes, industries } from "@/data/companyPageData";

function MobileFilterButton() {
  return (
    <div className="flex items-center justify-center md:hidden mb-4 gap-2 font-clash font-medium text-neutral-100 text-[16px] p-4 border border-brand-light-neutral">
      <Image src="/filter.png" alt="filter icon" width={20} height={20} />
      <p>More Filters</p>
      {/* <SidebarFilters industries={industries} companySizes={companySizes} /> */}
    </div>
  );
}

export default MobileFilterButton;
