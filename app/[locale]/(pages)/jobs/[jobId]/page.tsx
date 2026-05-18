import ReusableHero from "@/components/shared/ReusableHero";
import { Link } from "@/i18n/routing";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface JobDetail {
  id: string;
  ref: string;
  title: string;
  location: string;
  salary: string;
  jobType: string;
  companyLine: string;
  descriptionParagraphs: string[];
}

const MOCK_JOBS: JobDetail[] = [
  {
    id: "FDMAN2038-234",
    ref: "#FDMAN2038-234",
    title: "Frontend Developer",
    location: "Manchester, UK",
    salary: "£45,000 - £55,000 per annum + Bonus + Pension + Benefits",
    jobType: "Hybrid, Permanent",
    companyLine: "UK Leading Ecommerce Firm - Manchester - Hybrid",
    descriptionParagraphs: [
      "We're looking for an experienced Frontend Developer to join our dynamic team. You'll work with modern technologies including React, Next.js, TypeScript, and Tailwind CSS to build responsive, user-friendly web applications across our digital platforms.",
      "You'll collaborate closely with designers and product teams to translate wireframes and prototypes into polished, accessible interfaces. This role is ideal for someone who cares about performance, code quality, and delivering excellent user experiences.",
      "Our company is a UK-leading ecommerce firm with a strong culture of innovation. We offer a hybrid working model based in Manchester, with flexibility and support for professional growth.",
      "If you're passionate about frontend development and want to make an impact in a fast-paced environment, we'd love to hear from you.",
    ],
  },
];

async function getJobById(jobId: string): Promise<JobDetail | null> {
  return MOCK_JOBS.find((job) => job.id === jobId) ?? null;
}

export const dynamic = "force-dynamic";

export default async function JobDetailsPage({
  params,
}: Readonly<{
  params: Promise<{ locale: string; jobId: string }>;
}>) {
  const { jobId } = await params;
  const job = await getJobById(jobId);

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
      <ReusableHero title={job.title.toUpperCase()} subtitle={job.location} />

      <div className="px-6 py-10 md:py-14 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Left sidebar */}
          <aside className="lg:col-span-4 xl:col-span-4">
            <div className="border-4 border-[#1e6fff] bg-white p-6 sm:p-8">
              <SidebarRow label="Location" value={job.location} />
              <hr className="border-gray-200 my-5" />
              <SidebarRow label="Salary" value={job.salary} />
              <hr className="border-gray-200 my-5" />
              <SidebarRow label="Job Type" value={job.jobType} />
            </div>

            <p className="mt-4 text-sm font-mono text-gray-500">{job.ref}</p>

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
      <p className="text-sm font-bold text-gray-900 mb-1">{label}</p>
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
