"use client";
import ApplicantHeader from "@/components/dashboard/Company/all-applicants/applicantHeader";
import ApplicantTable from "@/components/dashboard/Company/all-applicants/ApplicantTable";
import Pagination from "@/components/dashboard/Company/all-applicants/pagination";
import { getCandidatesAppliedJob } from "@/lib/company_applicant";
import { useMemo, useState } from "react";
import ApplicantPipeline from "@/components/dashboard/Company/all-applicants/ApplicantPipeline";
import { ViewMode } from "@/components/dashboard/Company/all-applicants/viewSwitcher";

const tableHeaders = [
  "",
  "Full Name",
  "Score",
  "Hiring Stage",
  "Applied Date",
  "Action",
];

interface ApplicantsPageProps {
  jobId: number;
}

export default function ApplicantsPage({ jobId }: ApplicantsPageProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [view, setView] = useState<ViewMode>("table");

  const filteredApplicants = useMemo(() => {
    return getCandidatesAppliedJob(jobId);
  }, [jobId]);

  const applicants = useMemo(
    () =>
      filteredApplicants.map(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ({ jobId: _jobId, ...applicant }) => applicant,
      ),
    [filteredApplicants],
  );

  const totalPages = Math.ceil(applicants.length / pageSize);

  const paginatedApplicants = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return applicants.slice(start, start + pageSize);
  }, [applicants, currentPage, pageSize]);

  return (
    <div>
      <main>
        <div className="w-full py-5">
          <ApplicantHeader
            totalApplicants={applicants.length}
            view={view}
            onViewChange={setView}
          />

          {view === "table" ? (
            <ApplicantTable
              tableHeaders={tableHeaders}
              applicants={paginatedApplicants}
            />
          ) : (
            <ApplicantPipeline applicants={applicants} />
          )}

          {view === "table" && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              pageSize={pageSize}
              onPageChange={setCurrentPage}
              onPageSizeChange={(size) => {
                setPageSize(size);
                setCurrentPage(1);
              }}
            />
          )}
        </div>
      </main>
    </div>
  );
}
