import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, BriefcaseBusiness, CalendarDays, MapPin, Users } from "lucide-react";
import { getJobById, getJobDetailsById } from "@/lib/company_applicant";
import RecruitmentWorkspace from "@/components/dashboard/Company/recruitment/RecruitmentWorkspace";

export default async function JobPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const job = getJobById(Number(id));

  if (!job) {
    return <div className="grid h-full place-items-center text-lg font-semibold text-accent-red">Job not found</div>;
  }

  const details = getJobDetailsById(Number(id));

  return (
    <main className="h-full overflow-y-auto bg-white px-4 pb-10 pt-5 lg:px-6 lg:pt-6">
      <div className="w-full space-y-4">
        <div className="flex items-center gap-3 text-sm font-medium text-neutral-60">
          <Link href="/company/job-listing" aria-label="Back to jobs" className="grid size-9 place-items-center border border-brand-light-neutral bg-white text-neutral-100 transition hover:border-brand hover:text-brand">
            <ArrowLeft size={18} />
          </Link>
          <span>All jobs</span><span>/</span><span className="text-neutral-100">{job.role}</span>
        </div>

        <section className="border border-brand-light-neutral bg-white p-5 lg:p-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex min-w-0 items-center gap-4">
              <div className="relative size-14 shrink-0 overflow-hidden border border-brand-light-neutral bg-[#f8f8fc] p-2">
                <Image src={details.image} alt="Company logo" fill className="object-contain p-2" />
              </div>
              <div className="min-w-0">
                <h1 className="truncate text-xl font-bold text-neutral-100 lg:text-2xl">{job.role}</h1>
                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-xs text-neutral-60">
                  <span className="flex items-center gap-1.5"><BriefcaseBusiness size={14} className="text-brand" />Nomad</span>
                  <span className="flex items-center gap-1.5"><MapPin size={14} className="text-brand" />Kinshasa, DRC</span>
                  <span className="flex items-center gap-1.5"><CalendarDays size={14} />Posted {job.date_posted.toLocaleDateString("en", { month: "short", day: "numeric", year: "numeric" })}</span>
                  <span className="flex items-center gap-1.5"><Users size={14} />{job.applicants} applicants</span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between gap-6 lg:justify-end">
              <Link href={`/jobs/${id}`} className="text-sm font-semibold text-brand underline underline-offset-4">View job description</Link>
              <div className="border-l border-brand-light-neutral pl-6 text-right">
                <p className="text-2xl font-bold text-brand">{Math.min(100, Math.round((job.current_applicants / Math.max(1, job.max_applicants)) * 100))}%</p>
                <p className="mt-1 text-xs text-neutral-60">Hiring progress</p>
              </div>
            </div>
          </div>
        </section>

        <RecruitmentWorkspace jobId={Number(id)} role={job.role} />
      </div>
    </main>
  );
}
