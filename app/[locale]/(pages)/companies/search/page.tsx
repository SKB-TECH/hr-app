import { companySizes, industries } from "../../../../../data/companyPageData";
import { SidebarFilters } from "@/components/companies/SidebarFilters";

import CompanyList from "@/components/companies/CompanyList";

function SearchCompaniesPage() {
  return (
    <div className="px-6 py-16 md:px-12 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-8">
        <SidebarFilters industries={industries} companySizes={companySizes} />
        <CompanyList />
      </div>
    </div>
  );
}
export default SearchCompaniesPage;
