import ReusableHero from "@/components/shared/ReusableHero";
import { Link } from "@/i18n/routing";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { JobDetail } from "../../../../../types/types";
import { getJobById } from "../../../../../services/job.service";

export default async function JobDetailsPage({
  params,
}: {
  params: Promise<{ jobId: string }>;
}) {
  const { jobId } = await params;
  console.log("job id params: " + jobId);
  let job: JobDetail | null = null;
  try {
    const { jobId } = await params;
    job = await getJobById(jobId);
  } catch (error) {
    console.error("Error fetching job details:", error);
  }

  if (!job) {
    return (
      <main className="flex-1 px-6 py-16 md:px-12 max-w-7xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-brand-dark">
          Job not found
        </h1>
        <p className="text-gray-500 mt-2 text-sm sm:text-base">
          No job matches ID:{" "}
          <span className="font-mono text-brand">{jobId}</span>
        </p>
        <Link
          href="/jobs"
          className="mt-6 inline-flex items-center gap-2 bg-brand-dark text-white px-6 py-3 text-sm font-semibold uppercase tracking-wider hover:opacity-90"
        >
          <ArrowLeft size={16} />
          Back to jobs
        </Link>
      </main>
    );
  }

  return (
    <main className="flex-1 bg-white">
      <ReusableHero>
        <h2 className="font-bold text-4xl leading-tight sm:text-5xl md:text-6xl  text-white wrap-break-word">
          {job.title.toUpperCase()}
        </h2>
        <p className="text-xl text-white font-medium">{job.location}</p>
      </ReusableHero>

      <div className="px-6 py-10 md:py-14 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12  gap-10 lg:gap-14">
          <aside className="lg:col-span-4 xl:col-span-4">
            <div className="border border-gray-200 bg-white p-6 sm:p-8">
              <SidebarRow label="Location" value={job.location} />
              <hr className="border-gray-200 my-5" />
              <SidebarRow label="Salary" value={job.salary} />
              <hr className="border-gray-200  my-5" />
              <SidebarRow label="Job Type" value={job.jobType} />
            </div>

            <div className="mt-4 border border-gray-200 px-4 py-3">
              <p className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-1">
                Reference
              </p>
              <p className="text-sm font-mono text-gray-600">{job.ref}</p>
            </div>

            <Link
              href="/jobs"
              className="mt-8 inline-flex items-center gap-2 bg-brand-dark text-white px-6 py-3.5 text-sm font-semibold uppercase tracking-wider hover:opacity-90 transition-opacity"
            >
              <ArrowLeft size={18} />
              Back
            </Link>
          </aside>

          {/* Right main content */}
          <div className="lg:col-span-8 xl:col-span-8 space-y-12">
            <section>
              <h2 className="text-2xl sm:text-3xl font-bold text-brand-dark mb-4">
                Description
              </h2>
              <h3 className="text-lg font-bold text-gray-900 mb-1">
                {job.title}
              </h3>
              <p className="text-sm text-gray-500 mb-6">{job.companyLine}</p>
              <div className="space-y-4 text-gray-600 text-sm sm:text-base leading-relaxed">
                {job.descriptionParagraphs.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </section>

            <section id="apply">
              <h2 className="text-2xl sm:text-3xl font-bold text-brand-dark mb-6">
                Apply For This Role
              </h2>
              <form className="space-y-5 max-w-xl">
                <FormField label="Full Name" type="text" />
                <FormField label="Email" type="email" />
                <FormField label="Contact Number" type="tel" />
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    Cover Letter
                  </label>
                  <textarea
                    rows={6}
                    className="w-full border border-gray-200 px-4 py-3 text-sm text-gray-800 outline-none focus:border-[#00c896] transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center gap-3 bg-[#00c896] text-white font-semibold px-8 py-3.5 text-sm uppercase tracking-wider hover:opacity-90 transition-opacity"
                >
                  Send Application
                  <ArrowRight size={18} />
                </button>
              </form>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}

function SidebarRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-sm font-bold text-gray-900 mb-1 uppercase tracking-widest">
        {label}
      </p>
      <p className="text-sm text-gray-600 leading-relaxed">{value}</p>
    </div>
  );
}

function FormField({
  label,
  type,
}: {
  label: string;
  type: "text" | "email" | "tel";
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-800 mb-2">
        {label}
      </label>
      <input
        type={type}
        className="w-full border border-gray-200 px-4 py-3 text-sm text-gray-800 outline-none focus:border-[#00c896] transition-colors"
      />
    </div>
  );
}
