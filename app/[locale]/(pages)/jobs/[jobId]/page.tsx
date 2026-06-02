import CompanyOverviewSection from "@/components/jobDetails/CompanyOverviewSection";
import JobDescriptionSection from "@/components/jobDetails/JobDescriptionSection";
import JobPerksSection from "@/components/jobDetails/JobPerksSection";
import JobResponsibilitiesSection from "@/components/jobDetails/JobResponsibilitiesSection";
import JobSidebarSection from "@/components/jobDetails/JobSidebarSection";
import { jobsDetailsResponse, perks } from "@/data/jobDetailsData";
import Image from "next/image";

export default async function JobDetailsPage({
  params,
}: Readonly<{
  params: Promise<{ jobId: string }>;
}>) {
  const { jobId } = await params;
  const jobDetails = jobsDetailsResponse.find((job) => job.id === jobId);

  if (!jobDetails) {
    return <div>Job not found</div>;
  }

  return (
    <section className="w-full bg-white">
      <div className="w-full max-w-6xl mx-auto px-4">
        {" "}
        <div className="grid grid-cols-1 lg:grid-cols-3 md:gap-14 py-16">
          <div className="col-span-2 space-y-10">
            <JobDescriptionSection description={jobDetails.description} />
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
          companyLogo="/stripe.png"
          description={`${jobDetails.company} is a technology company that builds economic infrastructure for the internet. Businesses of every size—from new startups to public companies—use our software to accept payments and manage their businesses online.`}
          mainImage="/img5.jpg"
          topRightImage="/img6.jpg"
          bottomRightImage="/img4.jpg"
        />
      </div>
      <div className="relative w-full min-h-[500px] mt-16 overflow-hidden rounded-3xl">
        <Image
          src="/background.png"
          alt="Background"
          fill
          quality={100}
          priority
          className="absolute inset-0 object-cover pointer-events-none"
        />

        {/* Optional overlay */}
        <div className="absolute inset-0 bg-white/40 backdrop-blur-[1px]" />

        {/* Content */}
        <div className="relative z-10 px-6 py-12">{/* cards here */}</div>
      </div>
    </section>
  );
}
