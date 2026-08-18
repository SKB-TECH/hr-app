"use client";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import { ArrowRight, BriefcaseBusiness, FileClock, UsersRound } from "lucide-react";
import { useSession } from "@/core/hooks/auth/use-session";
import { useMyCompany } from "@/core/hooks/company/use-my-company";
import { useCompanyJobs } from "@/core/hooks/jobs/use-company-jobs";
import { useCompanyJobStats } from "@/core/hooks/jobs/use-company-job-stats";
import { mediaUrl } from "@/core/lib/media-url";

export default function CompanyOverviewDashboard() {
  const session = useSession();
  const company = useMyCompany();
  const jobs = useCompanyJobs(company.data?.id, { limit: 100 });
  const stats = useCompanyJobStats(Boolean(company.data));

  if (session.isPending || company.isPending || jobs.isPending || stats.isPending) {
    return <State message="Loading company dashboard…" />;
  }

  if (company.isError || jobs.isError || stats.isError) {
    return <State message="Unable to load the company dashboard." action={() => {
      void company.refetch();
      void jobs.refetch();
      void stats.refetch();
    }} />;
  }

  const companyJobs = jobs.data?.data || [];
  const summary = stats.data;
  const recentJobs = companyJobs.slice(0, 6);
  const maxApplications = Math.max(1, ...recentJobs.map((job) => job.applicantsCount));
  const firstName = session.data?.fullName?.split(" ")[0] || "there";
  const liveJobs = summary?.statuses.LIVE || 0;
  const draftJobs = summary?.statuses.DRAFT || 0;
  const applications = summary?.applications || 0;

  return (
    <main className="h-full overflow-y-auto bg-[#fafaff] px-4 pb-10 sm:px-6 lg:px-8">
      <header className="flex flex-col gap-4 py-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-brand">{company.data?.name || "My company"}</p>
          <h1 className="mt-1 truncate text-2xl font-bold text-neutral-100 sm:text-3xl">Good morning, {firstName}</h1>
          <p className="mt-1 text-sm text-neutral-60">Live recruiting activity and job performance.</p>
        </div>
        <p className="w-fit border border-brand-light-neutral bg-white px-4 py-2 text-sm text-neutral-80">
          {new Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(new Date())}
        </p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Metric icon={<UsersRound />} label="Total applications" value={applications} tone="bg-brand" />
        <Metric icon={<BriefcaseBusiness />} label="Live jobs" value={liveJobs} tone="bg-[#56CDAD]" />
        <Metric icon={<FileClock />} label="Draft jobs" value={draftJobs} tone="bg-[#26A4FF]" />
        <Metric icon={<BriefcaseBusiness />} label="All jobs" value={summary?.total || 0} tone="bg-[#25324B]" />
      </section>

      <section className="mt-5 grid min-w-0 gap-5 xl:grid-cols-[minmax(0,1.6fr)_minmax(280px,.7fr)]">
        <div className="min-w-0 border border-brand-light-neutral bg-white p-5 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div><h2 className="text-xl font-bold text-neutral-100">Applications by job</h2><p className="text-sm text-neutral-60">Current totals from your latest positions</p></div>
            <Link href="/company/job-listing" className="flex items-center gap-2 text-sm font-bold text-brand">View jobs <ArrowRight size={16} /></Link>
          </div>
          <div className="mt-7 space-y-5">
            {recentJobs.length ? recentJobs.map((job) => (
              <Link key={job.id} href={`/company/job-listing/${job.id}`} className="grid min-w-0 gap-2 sm:grid-cols-[minmax(140px,220px)_1fr_44px] sm:items-center">
                <span className="truncate text-sm font-semibold text-neutral-100">{job.title}</span>
                <span className="h-2 overflow-hidden bg-[#edf0f7]"><span className="block h-full bg-brand" style={{ width: `${Math.max(3, (job.applicantsCount / maxApplications) * 100)}%` }} /></span>
                <span className="text-right text-sm font-bold text-neutral-100">{job.applicantsCount}</span>
              </Link>
            )) : <Empty text="No job has been published yet." />}
          </div>
        </div>

        <aside className="min-w-0 border border-brand-light-neutral bg-white p-5 sm:p-6">
          <h2 className="text-xl font-bold text-neutral-100">Company profile</h2>
          <div className="mt-5 flex min-w-0 items-center gap-4">
            <Image src={mediaUrl(company.data?.logo)} alt="" width={64} height={64} className="size-16 shrink-0 border border-brand-light-neutral object-contain p-1" />
            <div className="min-w-0"><p className="truncate font-bold text-neutral-100">{company.data?.name}</p><p className="truncate text-sm text-neutral-60">{company.data?.industry || "Industry not specified"}</p></div>
          </div>
          <dl className="mt-6 divide-y divide-brand-light-neutral border-y border-brand-light-neutral text-sm">
            <Fact label="Location" value={company.data?.location || "Not specified"} />
            <Fact label="Company size" value={company.data?.companySize || "Not specified"} />
            <Fact label="Profile status" value={company.data?.status || "active"} />
          </dl>
          <Link href="/company/settings" className="mt-5 block bg-brand px-4 py-3 text-center text-sm font-bold text-white">Complete company profile</Link>
        </aside>
      </section>

      <section className="mt-5 border border-brand-light-neutral bg-white">
        <div className="flex items-center justify-between border-b border-brand-light-neutral px-5 py-4 sm:px-6"><h2 className="text-xl font-bold text-neutral-100">Recent job updates</h2><Link href="/company/job-listing" className="text-sm font-bold text-brand">View all</Link></div>
        <div className="grid gap-px bg-brand-light-neutral sm:grid-cols-2 xl:grid-cols-3">
          {recentJobs.length ? recentJobs.map((job) => (
            <Link key={job.id} href={`/company/job-listing/${job.id}`} className="min-w-0 bg-white p-5 hover:bg-[#fafaff]">
              <div className="flex items-start justify-between gap-3"><h3 className="truncate font-bold text-neutral-100">{job.title}</h3><Status value={job.status} /></div>
              <p className="mt-2 truncate text-sm text-neutral-60">{job.location || "Remote"} · {job.employmentTypes[0]?.replaceAll("_", " ") || "Not specified"}</p>
              <p className="mt-5 text-sm"><strong>{job.applicantsCount}</strong> <span className="text-neutral-60">applications / {job.hiringTarget} capacity</span></p>
            </Link>
          )) : <div className="col-span-full bg-white"><Empty text="Your latest jobs will appear here." /></div>}
        </div>
      </section>
    </main>
  );
}

function Metric({ icon, label, value, tone }: { icon: React.ReactNode; label: string; value: number; tone: string }) { return <article className={`${tone} flex min-w-0 items-center justify-between gap-4 p-5 text-white`}><div className="min-w-0"><p className="text-4xl font-bold">{value}</p><p className="mt-1 truncate text-sm text-white/85">{label}</p></div><span className="grid size-11 shrink-0 place-items-center bg-white/15">{icon}</span></article>; }
function Fact({ label, value }: { label: string; value: string }) { return <div className="flex min-w-0 justify-between gap-4 py-3"><dt className="text-neutral-60">{label}</dt><dd className="truncate text-right font-semibold capitalize text-neutral-100">{value}</dd></div>; }
function Status({ value }: { value: string }) { const style = value === "LIVE" ? "border-[#56CDAD] text-[#299676]" : value === "CLOSED" ? "border-accent-red text-accent-red" : "border-accent-yellow text-[#b87500]"; return <span className={`shrink-0 border px-2 py-1 text-[10px] font-bold ${style}`}>{value}</span>; }
function Empty({ text }: { text: string }) { return <p className="p-8 text-center text-sm text-neutral-60">{text}</p>; }
function State({ message, action }: { message: string; action?: () => void }) { return <div className="grid h-full min-h-80 place-items-center p-8 text-center"><div><p className="font-semibold text-neutral-100">{message}</p>{action && <button onClick={action} className="mt-4 bg-brand px-5 py-2.5 text-sm font-bold text-white">Try again</button>}</div></div>; }
