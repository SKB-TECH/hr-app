import { companySizes, industries } from "../../../../../data/companyPageData";
import { SidebarFilters } from "@/components/companies/SidebarFilters";
import CompanyList from "@/components/companies/CompanyList";
import MobileFilterButton from "@/components/companies/MobileFilterButton";
import MobileFilters from "@/components/companies/MobileFilters";

function SearchCompaniesPage() {
  return (
    <section className="min-h-screen relative">
      {/* <MobileFilters /> */}
      <MobileFilterButton />
      <div className="px-6 py-16 pt-4 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="hidden md:block">
            <SidebarFilters
              industries={industries}
              companySizes={companySizes}
            />
          </div>

          <CompanyList />
        </div>
      </div>
    </section>
  );
}
export default SearchCompaniesPage;
