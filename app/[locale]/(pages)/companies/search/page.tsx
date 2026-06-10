import { mockSidebarCompanyFilters } from "../../../../../data/companyPageData";
import { SidebarFilters } from "@/components/shared/listing/SidebarFilters";
import CompanyList from "./_components/CompanyList";
import SharedDisplayMobileFilter from "@/components/shared/listing/SharedDisplayMobileFilter";
import ReusableHeroSection from "../../jobs/HeroSection/ReusableHeroSection";

function SearchCompaniesPage() {
  return (
    <section className="min-h-screen relative">
      <ReusableHeroSection
        title="Find your  "
        highlight=" dream companies"
        subtitle="Find the dream companies you dream work for"
        searchEnabled={true}
        popularTags={["Twitter, Microsoft, Apple, Facebook"]}
      />
      <SharedDisplayMobileFilter DataToFilter={mockSidebarCompanyFilters} />
      <div className="px-4 py-16 pt-4 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="hidden md:block">
            <SidebarFilters sidebarFilterData={mockSidebarCompanyFilters} />
          </div>

          <CompanyList />
        </div>
      </div>
    </section>
  );
}
export default SearchCompaniesPage;
