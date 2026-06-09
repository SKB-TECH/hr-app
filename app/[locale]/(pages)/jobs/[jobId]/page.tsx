import CompanyOverviewSection from "./_components/CompanyOverviewSection";
import JobDescriptionSection from "./_components/JobDescriptionSection";
import JobHeroSection from "./_components/JobHeroSection";
import JobPerksSection from "@/components/shared/job/JobPerksSection";
import JobResponsibilitiesSection from "./_components/JobResponsibilitiesSection";
import JobSidebarSection from "./_components/JobSidebarSection";
import SimilarJobsSection from "@/components/shared/job/SimilarJobsSection";
import { jobsDetailsResponse, perks, similarJobs } from "@/data/jobDetailsData";

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
      <JobHeroSection jobDetails={jobDetails} />
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
