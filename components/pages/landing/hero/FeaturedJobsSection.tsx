import { SectionTitle } from "@/components/ui/Title";
import { FeaturedJob } from "@/data/featuredJob";
import { featuredJobsData } from "@/data/featuredJob";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const marqueeJobs = [...featuredJobsData, ...featuredJobsData];

const tagStyles: Record<string, string> = {
  Marketing: "bg-accent-light-yellow  text-accent-yellow  ",
  Design: "bg-accent-light-green  text-accent-green  ",
  Business: "bg-accent-light-brand   text-brand ",
  Technology: "bg-accent-light-red     text-accent-red  ",
};

const defaultTag = "bg-gray-50 text-gray-500  border border-gray-200";

function FeaturedJobCard({
  job,
  isDuplicate = false,
}: {
  job: FeaturedJob;
  isDuplicate?: boolean;
}) {
  return (
    <article
      aria-hidden={isDuplicate}
      className={`border border-gray-200 p-5 flex flex-col gap-3 hover:border-[#1C222D] transition-all flex-none w-[280px] sm:w-[320px] md:w-auto md:flex-[1_1_280px] ${
        isDuplicate ? "md:hidden" : ""
      }`}
    >
      <div className="flex justify-between items-start gap-4">
        <Image
          src={job.companyLogo}
          alt={`${job.companyName} logo`}
          width={48}
          height={48}
          className="object-contain flex-none"
        />
        <span className="text-xs font-semibold text-brand border border-brand px-2 py-1 whitespace-nowrap">
          Full Time
        </span>
      </div>

      <div className="text-black">
        <Link
          href={`/jobs/${job.id}`}
          className="font-bold text-neutral-100 text-[16px] hover:text-brand"
        >
          {job.title}
        </Link>
        <p className="text-[14px] font-epilogue text-neutral-100 mt-1 flex items-center gap-1.5">
          <Link href={`/companies/${job.id}`} className="truncate">
            {job.companyName}
          </Link>
          <span className="text-gray-400" aria-hidden="true">
            &bull;
          </span>
          <span className="truncate">{job.location}</span>
        </p>
      </div>

      <p className="text-[14px] text-neutral-60 leading-relaxed">
        {job.description}
      </p>

      <div className="flex flex-wrap gap-2 mt-auto">
        {job.tags.map((tag) => (
          <span
            key={tag}
            className={`inline-flex items-center justify-center text-center text-[14px] px-2 py-1 md:px-4 md:py-1.5 rounded-full font-medium ${tagStyles[tag] ?? defaultTag}`}
          >
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
}

export default function FeaturedJobsSection() {
  return (
    <section className="pb-8  px-4 md:px-12  w-full max-w-7xl mx-auto">
      <div>
        <SectionTitle
          title="Featured"
          highlight="jobs"
          showAllText="Show all jobs"
          showAllLink="/jobs"
          isExpanded
        />

        <div className="mt-6 overflow-hidden md:mt-1 max-md:-mx-4 max-md:px-4">
          <div className="max-md:flex md:grid md:grid-cols-3 lg:grid-cols-4 w-max gap-4 max-md:animate-[featured-jobs-marquee_100s_linear_infinite] max-md:hover:[animation-play-state:paused] max-md:focus-within:[animation-play-state:paused] motion-reduce:animate-none md:w-auto md:flex-wrap md:items-stretch md:justify-between">
            {marqueeJobs.map((job: FeaturedJob, index) => (
              <FeaturedJobCard
                key={`${job.id}-${index}`}
                job={job}
                isDuplicate={index >= featuredJobsData.length}
              />
            ))}
          </div>
        </div>
        {/* Show all jobs — mobile only, below the list */}
        <div className="md:hidden mt-4">
          <Link
            href="/jobs"
            className="flex flex-row text-brand text-[16px] font-semibold items-center gap-1"
          >
            <span>Show all jobs</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
