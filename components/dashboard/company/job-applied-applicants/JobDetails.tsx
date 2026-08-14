import JobDescriptionSection from "@/components/platform/jobs/job-details/JobDescriptionSection";
import JobPerksSection from "@/components/platform/jobs/job-details/JobPerksSection";
import JobResponsibilitiesSection from "@/components/platform/jobs/job-details/JobResponsibilitiesSection";
import JobSidebarSection from "@/components/platform/jobs/job-details/JobSidebarSection";
import { getJobDetailsById } from "@/lib/company_applicant";
import { perks } from "@/data/jobDetailsData";
import JobDetailHeader from "./JobDetailHeader";

interface JobDetailsProps {
  jobId: number;
}

export default function JobDetails({ jobId }: JobDetailsProps) {
  const jobDetails = getJobDetailsById(jobId);

  return (
    <section className="w-full bg-white">
      <JobDetailHeader jobTitle={jobDetails.title} src={jobDetails.image} />
      {/* main content */}
      <div className="job-details-tab">
        <div className="grid grid-cols-1 lg:grid-cols-3 md:gap-14 ">
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
            className="divide-y divide-brand-light-neutral "
            roleInfo={jobDetails.roleInfo}
            categories={jobDetails.categories}
            requiredSkills={jobDetails.requiredSkills}
          />
        </div>
        <hr className="bg-brand-light-neutral mt-10" />
        <JobPerksSection
          className="job-details-tab border-none md:py-10!"
          perks={perks}
        />
      </div>
    </section>
  );
}
