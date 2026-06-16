import { mockSidebarCompanyFilters } from "@/data/companyPageData";
import { SidebarFilters } from "@/components/pages/companies/search/SidebarFilters";
import CompanyList from "@/components/pages/companies/search/CompanyList";
import SharedDisplayMobileFilter from "@/components/pages/companies/search/SharedDisplayMobileFilter";
import ReusableHeroSection from "@/components/pages/jobs/HeroSection/ReusableHeroSection";

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
      <div className="py-16 pt-4 px-4 md:px-12   w-full max-w-7xl mx-auto">
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
