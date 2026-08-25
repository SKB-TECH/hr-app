"use client";

import { useCompanyJobs } from "@/core/hooks/jobs/use-company-jobs";
import { useMyCompany } from "@/core/hooks/company/use-my-company";
import type { CompanyJob } from "@/core/types/job";
import type { TableDataTypes } from "@/data/company-job-listing";
import DataTableClient from "./data-table-client";
import JobListingCards from "./job-listing-cards";

function toTableJob(job: CompanyJob): TableDataTypes {
  return {
    id: job.id,
    role: job.title,
    status: job.status === "LIVE" ? "Live" : job.status === "CLOSED" ? "Closed" : "Draft",
    date_posted: new Date(job.publishedAt || job.createdAt),
    due_date: job.closesAt ? job.closesAt.slice(0, 10) : "—",
    job_type: job.employmentTypes[0] || "Not specified",
    applicants: job.applicantsCount || 0,
    current_applicants: job.hiredCount || 0,
    max_applicants: job.hiringTarget || 1,
  };
}

export default function ListJobs() {
  const company = useMyCompany();
  const jobs = useCompanyJobs(company.data?.id, { limit: 100 });

  if (company.isError || jobs.isError) return <div className="grid min-h-72 place-items-center border border-brand-light-neutral text-center"><div><p className="font-bold text-neutral-100">Unable to load jobs.</p><p className="mt-1 text-sm text-neutral-60">Check the API connection and try again.</p><button onClick={() => { void company.refetch(); void jobs.refetch(); }} className="mt-4 bg-brand px-5 py-2.5 text-sm font-bold text-white">Try again</button></div></div>;
  if (company.isPending || jobs.isPending) return <div className="grid min-h-72 place-items-center border border-brand-light-neutral text-sm text-neutral-60">Loading company jobs…</div>;
  if (!company.data) return <div className="grid min-h-72 place-items-center border border-brand-light-neutral text-sm text-neutral-60">Create your company profile before publishing jobs.</div>;

  const rows = (jobs.data?.data || []).map(toTableJob);
  return <><div className="hidden sm:block"><DataTableClient jobs={rows} /></div><div className="sm:hidden"><JobListingCards jobs={rows} /></div></>;
}
