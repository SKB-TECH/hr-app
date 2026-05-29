import {
  companies,
  companySizes,
  industries,
  sortOptions,
} from "../../../../../data/data";
import { SidebarFilters } from "@/components/companies/SidebarFilters";
import { SearchHeader } from "@/components/companies/SearchHeader";
import { CompanyCard } from "@/components/companies/CompanyCard";

function SearchCompaniesPage() {
  return (
    <div className="px-6 py-16 md:px-12 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-8">
        <SidebarFilters industries={industries} companySizes={companySizes} />

        <main className="flex-1">
          <SearchHeader
            totalResults={companies.length}
            sortOptions={sortOptions}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {companies.map((company) => (
              <CompanyCard key={company.id} company={company} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
export default SearchCompaniesPage;
