import { mockSidebarCompanyFilters } from "@/data/companyPageData";

import SearchHeader from "@/components/dashboard/candidate/browse-companies/SearchHeader";
import PopularTags from "@/components/dashboard/candidate/browse-companies/PopularTags";
import CompanyList from "@/components/platform/companies/search/CompanyList";
import SharedDisplayMobileFilter from "@/components/platform/companies/search/SharedDisplayMobileFilter";
import { SidebarFilters } from "@/components/platform/companies/search/SidebarFilters";

const tags = ["Tech", "Finance", "Healthcare", "Education", "Retail"];

function SearchCompaniesPage() {
  return (
    <section className="min-h-screen relative max-w-[2500px] ">
      <div className="border-b border-brand-light-neutral py-8 ">
        <div className="mx-4 md:mx-6">
          <SearchHeader />
          <PopularTags tags={tags} />
        </div>
      </div>
      <SharedDisplayMobileFilter DataToFilter={mockSidebarCompanyFilters} />
      <div className="px-6 pt-4 sm:pt-10 ">
        <div className="flex flex-col md:flex-row gap-6 lg:gap-4">
          <div className="hidden md:block ">
            <SidebarFilters
              className=" lg:!w-fit mr-4 mt-4"
              sidebarFilterData={mockSidebarCompanyFilters}
              isCollapsible={false}
            />
          </div>

          <CompanyList />
        </div>
      </div>
    </section>
  );
}
export default SearchCompaniesPage;
