"use client";

import Image from "next/image";
import { Link } from "@/i18n/routing";
import { ArrowLeft, BriefcaseBusiness, CalendarDays, MapPin, Users } from "lucide-react";
import { useMyCompany } from "@/core/hooks/company/use-my-company";
import { useCompanyJob } from "@/core/hooks/jobs/use-company-job";
import RecruitmentWorkspace from "./RecruitmentWorkspace";

export default function CompanyJobATSPage({ jobId }: { jobId: string }) {
  const company = useMyCompany();
  const job = useCompanyJob(company.data?.id, jobId);
  if (company.isPending || job.isPending) return <div className="grid h-full place-items-center text-neutral-60">Loading ATS…</div>;
  if (company.isError || job.isError || !company.data || !job.data) return <div className="grid h-full place-items-center text-center"><div><p className="font-bold text-neutral-100">Unable to load this job ATS.</p><button onClick={() => { void company.refetch(); void job.refetch(); }} className="mt-4 bg-brand px-5 py-3 text-sm font-bold text-white">Try again</button></div></div>;
  const item = job.data;
  const progress = Math.min(100, Math.round((item.hiredCount / Math.max(1, item.hiringTarget)) * 100));
  return <main className="h-full overflow-y-auto bg-white px-4 pb-10 pt-5 lg:px-6"><div className="w-full space-y-4"><div className="flex items-center gap-3 text-sm font-medium text-neutral-60"><Link href="/company/job-listing" className="grid size-9 place-items-center border border-brand-light-neutral text-neutral-100"><ArrowLeft size={18}/></Link><span>All jobs</span><span>/</span><span className="text-neutral-100">{item.title}</span></div><section className="border border-brand-light-neutral bg-white p-5 lg:p-6"><div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between"><div className="flex min-w-0 items-center gap-4"><div className="relative size-14 shrink-0 border bg-[#f8f8fc]">{company.data.logo ? <Image src={company.data.logo} alt="" fill className="object-contain p-2"/> : <span className="grid size-full place-items-center text-xl font-bold text-brand">{company.data.name.slice(0,1)}</span>}</div><div><h1 className="text-xl font-bold text-neutral-100 lg:text-2xl">{item.title}</h1><div className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-xs text-neutral-60"><span className="flex items-center gap-1.5"><BriefcaseBusiness size={14}/>{company.data.name}</span><span className="flex items-center gap-1.5"><MapPin size={14}/>{item.location || company.data.location || "Remote"}</span><span className="flex items-center gap-1.5"><CalendarDays size={14}/>{new Date(item.publishedAt || item.createdAt).toLocaleDateString()}</span><span className="flex items-center gap-1.5"><Users size={14}/>{item.applicantsCount} applicants</span></div></div></div><div className="border-l pl-6 text-right"><p className="text-2xl font-bold text-brand">{progress}%</p><p className="text-xs text-neutral-60">Hiring progress</p></div></div></section><RecruitmentWorkspace jobId={jobId} companyId={company.data.id}/></div></main>;
}
