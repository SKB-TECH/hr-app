import JobsPerPageDropDown from "./jobs-per-page-dropdown";
import { JobListingTable } from "./data-table-client";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { cn } from "@/lib/utils";

function Pagination({
  jobsPerPage,
  onPerPageChange,
  currentPage = 1,
  totalPages = 1,
  onPageChange,
}: JobListingTable) {
  const handlePrevious = () => {
    if (currentPage > 1 && onPageChange) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages && onPageChange) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex justify-between itemse-center border-t border-[#D6DDEB] w-full px-4 py-5 ">
      <div className="flex items-center gap-4">
        <p className="text-[16px] text-neutral-60">View</p>
        <JobsPerPageDropDown
          jobsPerPage={jobsPerPage}
          onPerPageChange={onPerPageChange}
        />
        <p className=" text-neutral-60 tracking-tight">Applicants per page</p>
      </div>
      <div className="flex items-center gap-3">
        {/* pagination left arrow buttons */}
        <Button
          aria-label="previous click"
          onClick={handlePrevious}
          disabled={currentPage <= 1}
          className={cn(
            "bg-transparent border-none text-neutral-100 hover:bg-transparent cursor-pointer disabled:opacity-50",
          )}
        >
          {<ChevronLeftIcon className="scale-150  cursor-pointer" />}
        </Button>

        {/* pagination view */}
        <div className="flex items-center gap-1">
          <Button
            className="p-5 px-4.5 font-bold bg-brand text-white rounded-none hover:bg-brand/90"
            onClick={() => onPageChange?.(currentPage)}
          >
            {currentPage}
          </Button>
          {currentPage < totalPages && (
            <Button
              className="p-5 px-4.5 font-bold bg-white text-brand rounded-none hover:bg-brand/10"
              onClick={() => onPageChange?.(currentPage + 1)}
            >
              {currentPage + 1}
            </Button>
          )}
        </div>
        {/* pagination right arrow */}
        <Button
          aria-label="next click"
          onClick={handleNext}
          disabled={currentPage >= totalPages}
          className={cn(
            "bg-transparent border-none text-neutral-100 hover:bg-transparent cursor-pointer disabled:opacity-50",
          )}
        >
          {<ChevronRightIcon className="scale-150 cursor-pointer " />}
        </Button>
      </div>
    </div>
  );
}

export default Pagination;
