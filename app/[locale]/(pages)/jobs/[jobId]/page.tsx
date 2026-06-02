import JobBulletList from "@/components/jobDetails/JobBulletList";
import JobCategories from "@/components/jobDetails/JobCategories";
import JobDetailsSection from "@/components/jobDetails/JobDetailsSection";
import JobSummaryCard from "@/components/jobDetails/JobSummaryCard";
import PerkCard from "@/components/jobDetails/PerkCard";
import RequiredSkills from "@/components/jobDetails/RequiredSkills";
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
    <section className="w-full max-w-6xl mx-auto px-4   ">
      {/* Job Details Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 md:gap-14 pb-16  ">
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
      <div className="border-y border-gray-200 py-16 ">
        {/* Heading */}
        <div className="mb-8">
          <h2 className="text-[32px] font-bold text-neutral-100">
            Perks & Benefits
          </h2>

          <p className=" text-lg text-[16px] text-neutral-80">
            This job comes with several perks and benefits
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-x-10 gap-y-14 md:grid-cols-2 lg:grid-cols-4">
          {perks.map((perk) => (
            <PerkCard
              key={perk.title}
              icon={perk.icon}
              title={perk.title}
              description={perk.description}
            />
          ))}
        </div>
      </div>
      {/* company information */}
      <div className="py-16 ">
        <div className="flex gap-4 bg-red-500">
          <Image
            src="/stripe.png"
            alt="Stripe icon"
            width={40}
            height={40}
            quality={100}
            className=" shrink-0 "
          />
          <div>
            <h3 className="text-[20px] font-bold text-neutral-100">Stripe</h3>
            <p className="text-[14px] text-brand font-semibold">
              Read, more about stripe
            </p>
          </div>
        </div>
      </div>
      {/* similar jobs */}
      <div></div>
    </section>
  );
}
