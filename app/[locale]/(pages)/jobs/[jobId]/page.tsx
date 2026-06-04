import CompanyOverviewSection from "@/components/jobDetails/CompanyOverviewSection";
import JobDescriptionSection from "@/components/jobDetails/JobDescriptionSection";
import JobPerksSection from "@/components/jobDetails/JobPerksSection";
import JobResponsibilitiesSection from "@/components/jobDetails/JobResponsibilitiesSection";
import JobSidebarSection from "@/components/jobDetails/JobSidebarSection";
import SimilarJobsSection from "@/components/jobDetails/SimilarJobsSection";
import { jobsDetailsResponse, perks, similarJobs } from "@/data/jobDetailsData";
import Image from "next/image";
import Link from "next/link";

export default async function JobDetailsPage({
  params,
}: Readonly<{
  params: Promise<{ jobId: string }>;
}>) {
  const { jobId } = await params;
  const jobDetails = jobsDetailsResponse.find((job) => job.id === jobId);

  if (!jobDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center text-brand capitalize text-[24px] font-semibold">
        Job not found
      </div>
    );
  }

  return (
    <section className="w-full bg-white">
      {/* hero section */}
      <div
        className="w-full bg-light-brand-neutral py-8 md:py-12"
        style={{
          backgroundImage: `url(/BG.png)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="w-full max-w-6xl mx-auto md:px-6 px-4">
          {/* Breadcrumbs */}
          <div className="flex items-center text-sm text-[#7C8493] mb-6 overflow-hidden">
            <Link
              href="/"
              className="hover:text-[#4640DE] transition-colors truncate max-w-[60px] md:max-w-none"
            >
              Home
            </Link>

            <span className="mx-2 shrink-0">/</span>

            <Link
              href="/companies"
              className="hover:text-[#4640DE] transition-colors truncate max-w-[90px] md:max-w-none"
            >
              Companies
            </Link>

            <span className="mx-2 shrink-0">/</span>

            <Link
              href="/companies/nomad"
              className="hover:text-[#4640DE] transition-colors truncate max-w-[80px] md:max-w-none"
            >
              Nomad
            </Link>

            <span className="mx-2 shrink-0">/</span>

            <span className="text-[#25324B] font-medium text-nowrap">
              {jobDetails.title}
            </span>
          </div>

          {/* Hero Card */}
          <div className="w-full bg-white border border-[#D6DDEB] p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            {/* TOP SECTION MOBILE */}
            <div className="flex flex-col md:flex-row md:items-center gap-6 w-full ">
              {/* Left Content */}
              <div className="flex  flex-col md:flex-row md:items-center gap-5 flex-1">
                {/* Logo */}
                <div className="flex justify-between items-center ">
                  <div className="relative w-18 h-18 shrink-0">
                    <Image
                      src={jobDetails.image}
                      alt={jobDetails.title}
                      fill
                      quality={100}
                      className="object-cover"
                    />
                  </div>
                  <button className="md:hidden text-[#7C8493] hover:text-[#4640DE] transition-colors cursor-pointer">
                    <Image
                      src="/linkIcon.png"
                      alt="Share"
                      width={28}
                      height={28}
                    />
                  </button>
                </div>

                {/* Text Content */}
                <div className="flex-1">
                  <h1 className="text-[32px] leading-[1.05] max-md:text-[28px] tracking-0 font-bold text-[#25324B] tracking-[-0.02em]">
                    {jobDetails.title}
                  </h1>

                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mt-4 text-[16px] md:text-[18px] text-[#515B6F]">
                    <span>{jobDetails.company}</span>

                    <span className="w-1.5 h-1.5 rounded-full bg-[#A8ADB7]" />

                    <span>{jobDetails.location}</span>

                    <span className="w-1.5 h-1.5 rounded-full bg-[#A8ADB7]" />

                    <span>{jobDetails.jobType}</span>
                  </div>
                </div>
              </div>

              {/* Right Side */}
              <div className="flex md:flex-row flex-col md:items-center gap-6 md:gap-8">
                {/* Share Icon */}

                <button className="hidden md:block text-[#7C8493] hover:text-[#4640DE] transition-colors cursor-pointer">
                  <Image
                    src="/linkIcon.png"
                    alt="Share"
                    width={28}
                    height={28}
                  />
                </button>

                {/* Divider Desktop */}
                <div className="hidden md:block w-px h-14 bg-[#D6DDEB]" />

                {/* Apply Button */}
                <button className="w-full md:w-auto bg-[#4640DE] hover:bg-[#352fc9] transition-colors text-white font-semibold text-lg px-12 py-3 cursor-pointer">
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* main content */}
      <div className="w-full max-w-6xl mx-auto md:px-6  px-4">
        {" "}
        <div className="grid grid-cols-1 lg:grid-cols-3 md:gap-14 py-8 md:py-20">
          <div className="col-span-2  md:space-y-8  ">
            <JobDescriptionSection description={jobDetails.description} />
            {/* separator for small devices */}
            <hr className="block md:hidden border-t border-light-brand-neutral my-6" />
            <JobResponsibilitiesSection
              responsibilities={jobDetails.responsibilities}
              whoYouAre={jobDetails.whoYouAre}
              niceToHaves={jobDetails.niceToHaves}
            />
          </div>

          <JobSidebarSection
            className="divide-y divide-brand-light-neutral"
            roleInfo={jobDetails.roleInfo}
            categories={jobDetails.categories}
            requiredSkills={jobDetails.requiredSkills}
          />
        </div>
        <JobPerksSection perks={perks} />
        <CompanyOverviewSection
          company={jobDetails.company}
          companyLogo={jobDetails.image}
          description={`${jobDetails.company} is a technology company that builds economic infrastructure for the internet. Businesses of every size—from new startups to public companies—use our software to accept payments and manage their businesses online.`}
          mainImage="/img5.jpg"
          topRightImage="/img6.jpg"
          bottomRightImage="/img4.jpg"
        />
      </div>
      <SimilarJobsSection jobs={similarJobs} />
    </section>
  );
}
