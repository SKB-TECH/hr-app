import { Alljobsfilter } from "@/data/companyPageData";

import JobsList from "./JobsList";
import SharedDisplayMobileFilter from "../../companies/search/SharedDisplayMobileFilter";
import { SidebarFilters } from "../../companies/search/SidebarFilters";

interface AllJobsProps {
  currentPage: number;
  pageSize: number;
  viewGrid: boolean;
  setViewGrid: React.Dispatch<React.SetStateAction<boolean>>;
  getApplyLink: (id: string | number) => string;
}

function AllJobs({
  currentPage,
  pageSize,
  viewGrid,
  setViewGrid,
  getApplyLink,
}: AllJobsProps) {
  return (
    <section className="relative">
      <SharedDisplayMobileFilter DataToFilter={Alljobsfilter} />
      <div className="flex flex-col md:flex-row gap-8 px-4 md:px-0">
        <div className="hidden md:block  space-y-20">
          <SidebarFilters
            className=" lg:!w-fit  !mr-2 mt-4"
            sidebarFilterData={Alljobsfilter}
            isCollapsible={true}
          />
        </div>

        {/* JobsList only called once here */}
        <JobsList
          currentPage={currentPage}
          pageSize={pageSize}
          viewGrid={viewGrid}
          setViewGrid={setViewGrid}
          getApplyLink={getApplyLink}
        />
      </div>
    </section>
  );
}
export default AllJobs;
