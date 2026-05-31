import { Alljobsfilter, mockSidebarCompanyFilters } from "../../../../../data/companyPageData";
import { SidebarFilters } from "@/components/companies/SidebarFilters";
import CompanyList from "@/components/companies/CompanyList";
import SharedDisplayMobileFilter from "@/components/companies/SharedDisplayMobileFilter";
import JobsList from "./JobsList";

function AllJobs() {
  return (
    <section className="min-h-screen relative">
      <SharedDisplayMobileFilter DataToFilter={Alljobsfilter} />
      <div className="px-4 py-16 pt-4 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="hidden md:block">
            <SidebarFilters sidebarFilterData={Alljobsfilter} />
          </div>

          <JobsList />
        </div>
      </div>
    </section>
  );
}
export default AllJobs;
