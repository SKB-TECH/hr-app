import JobBulletList from "@/components/jobDetails/JobBulletList";
import JobCategories from "@/components/jobDetails/JobCategories";
import JobDetailsSection from "@/components/jobDetails/JobDetailsSection";
import JobSummaryCard from "@/components/jobDetails/JobSummaryCard";
import RequiredSkills from "@/components/jobDetails/RequiredSkills";
import { jobsDetailsResponse } from "@/data/jobDetailsData";

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
    <section className="w-full max-w-6xl mx-auto px-4 py-10 ">
      {/* Job Details Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 md:gap-14 ">
        {/* LEFT */}
        <div className="col-span-2 space-y-10">
          <JobDetailsSection title="Description">
            <p className="text-neutral-80 text-[16px]">
              {jobDetails.description}
            </p>
          </JobDetailsSection>

          <JobBulletList
            title="Responsibilities"
            items={jobDetails.responsibilities}
          />
          <JobBulletList title="Who you are" items={jobDetails.whoYouAre} />
          <JobBulletList title="Nice to Haves" items={jobDetails.niceToHaves} />
        </div>

        {/* RIGHT */}
        <div className="divide-y divide-brand-light-neutral">
          <JobSummaryCard
            applyBefore="June 30, 2024"
            postedOn="June 1, 2024"
            jobType="Full-Time"
            salary="$100k - $120k"
          />

          <JobCategories labels={jobDetails.categories} />

          <RequiredSkills skills={jobDetails.requiredSkills} />
        </div>
      </div>
      {/* perks & benefits */}
      <div></div>
      {/* company information */}
      <div></div>
      {/* similar jobs */}
      <div></div>
    </section>
  );
}
