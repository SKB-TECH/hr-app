import { Alljobsfilter } from "@/data/companyPageData";
import { SidebarFilters } from "@/components/pages/companies/search/SidebarFilters";
import SharedDisplayMobileFilter from "@/components/pages/companies/search/SharedDisplayMobileFilter";
import JobsList from "./JobsList";

interface AllJobsProps {
  currentPage: number;
  pageSize: number;
}

function AllJobs({ currentPage, pageSize }: AllJobsProps) {
  return (
    <section className="relative">
      <SharedDisplayMobileFilter DataToFilter={Alljobsfilter} />
      <div className=" py-16 pt-4 px-4 md:px-12   w-full max-w-7xl mx-auto m-10">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="hidden md:block space-y-20 mt-5">
            <SidebarFilters sidebarFilterData={Alljobsfilter} />
          </div>

          {/* JobsList only called once here */}
          <JobsList currentPage={currentPage} pageSize={pageSize} />
        </div>
      </div>
    </section>
  );
}
export default AllJobs;
