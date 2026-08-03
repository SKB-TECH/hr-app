"use client";
import ApplicantHeader from "@/components/dashboard/company/all-applicants/applicantHeader";
import ApplicantTable from "@/components/dashboard/company/all-applicants/ApplicantTable";
import Pagination from "@/components/dashboard/company/all-applicants/pagination";
import { applicants } from "@/data/applicants";
import { useMemo, useState } from "react";
import ApplicantPipeline from "@/components/dashboard/company/all-applicants/ApplicantPipeline";
import { ViewMode } from "@/components/dashboard/company/all-applicants/viewSwitcher";

const tableHeaders = [
  "",
  "Full Name",
  "Score",
  "Hiring Stage",
  "Applied Date",
  "Job Role",
  "Action",
];

export default function ApplicantsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [view, setView] = useState<ViewMode>("table");

  const totalPages = Math.ceil(applicants.length / pageSize);

  const paginatedApplicants = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return applicants.slice(start, start + pageSize);
  }, [currentPage, pageSize]);
  return (
    <div>
      <main className="p-4 md:p-5">
        <div className="w-full">
          <ApplicantHeader totalApplicants={applicants.length} view={view} onViewChange={setView} />

          {view === "table" ? <ApplicantTable tableHeaders={tableHeaders} applicants={paginatedApplicants} /> : <ApplicantPipeline applicants={applicants} />}

          {view === "table" && <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
            onPageSizeChange={(size) => {
              setPageSize(size);
              setCurrentPage(1);
            }}
          />}
        </div>
      </main>
    </div>
  );
}
