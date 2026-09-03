import CompanyList from "@/components/platform/companies/search/CompanyList";
import SharedDisplayMobileFilter from "@/components/platform/companies/search/SharedDisplayMobileFilter";
import { SidebarFilters } from "@/components/platform/companies/search/SidebarFilters";
import ReusableHeroSection from "@/components/platform/jobs/HeroSection/ReusableHeroSection";
import { mockSidebarCompanyFilters } from "@/data/companyPageData";

function SearchCompaniesPage() {
  return (
    <section className="min-h-screen relative">
      <ReusableHeroSection
        title="Find your  "
        highlight=" dream companies"
        subtitle="Find the dream companies you dream work for"
        searchEnabled={true}
        popularTags={["Twitter, Microsoft, Apple, Facebook"]}
        underlineSize="lg"
      />
      <SharedDisplayMobileFilter DataToFilter={mockSidebarCompanyFilters} />
      <div className="py-16 pt-4 px-4 md:px-12   w-full max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="hidden md:block">
            <SidebarFilters
              isCollapsible={false}
              sidebarFilterData={mockSidebarCompanyFilters}
            />
          </div>

          <CompanyList search="" />
        </div>
      </div>
    </section>
  );
}
export default SearchCompaniesPage;
