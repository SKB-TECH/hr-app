"use client";
import { columns } from "./columns";
import { jobListingData, TableDataTypes } from "@/data/company-job-listing";
import { DataTable } from "./data-table";
import TableHeader from "./table-header";
import Pagination from "./pagination";
import { useState, useMemo } from "react";

export interface JobListingTable {
  jobsPerPage: number;
  onPerPageChange: (value: number) => void;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
}

function DataTableClient() {
  const [jobsPerPage, setJobsPerPage] = useState<number>(7);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [statusFilters, setStatusFilters] = useState<string[]>([]);
  const [jobTypeFilters, setJobTypeFilters] = useState<string[]>([]);

  const handlePerPageChange = (value: number) => {
    setJobsPerPage(value);
    setCurrentPage(1); // reset to first page
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleStatusChange = (value: string, checked: boolean) => {
    setStatusFilters((prev) =>
      checked ? [...prev, value] : prev.filter((s) => s !== value),
    );
  };

  const handleJobTypeChange = (value: string, checked: boolean) => {
    setJobTypeFilters((prev) =>
      checked ? [...prev, value] : prev.filter((t) => t !== value),
    );
  };

  const handleClearFilters = () => {
    setStatusFilters([]);
    setJobTypeFilters([]);
  };

  const filteredData = useMemo(() => {
    return jobListingData.filter((job) => {
      const statusMatch =
        statusFilters.length === 0 || statusFilters.includes(job.status);
      const typeMatch =
        jobTypeFilters.length === 0 || jobTypeFilters.includes(job.job_type);
      return statusMatch && typeMatch;
    });
  }, [statusFilters, jobTypeFilters]);

  const totalPages = Math.ceil(filteredData.length / jobsPerPage);

  return (
    <div className="w-full">
      <DataTable<TableDataTypes, unknown>
        headerCellClassName="py-6 text-neutral-60 tex-sm font-medium tracking-wide px-4! "
        cellClassName="py-6  md:py-8 text-neutral-100 tracking-wide px-4! text-neutral-100"
        rowClassName={() =>
          "odd:bg-white cursor-pointer  even:bg-[#F8F8FD] text-[15px] "
        }
        columns={columns}
        data={filteredData}
        tableHeader={
          <TableHeader
            statusFilters={statusFilters}
            jobTypeFilters={jobTypeFilters}
            onStatusChange={handleStatusChange}
            onJobTypeChange={handleJobTypeChange}
            onClearFilters={handleClearFilters}
          />
        }
        pagination={
          <Pagination
            jobsPerPage={jobsPerPage}
            onPerPageChange={handlePerPageChange}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        }
        jobsPerPage={jobsPerPage}
        currentPage={currentPage}
      />
    </div>
  );
}

export default DataTableClient;
