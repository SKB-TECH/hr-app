import { SectionTitle } from "@/components/ui/Title";
import { FeaturedJob } from "@/data/featuredJob";
import { featuredJobsData } from "@/data/featuredJob";
import Image from "next/image";

const tagStyles: Record<string, string> = {
  Marketing: "bg-accent-light-yellow  text-accent-yellow  ",
  Design: "bg-accent-light-green  text-accent-green  ",
  Business: "bg-accent-light-brand   text-brand ",
  Technology: "bg-accent-light-red     text-accent-red  ",
};

const defaultTag = "bg-gray-50 text-gray-500  border border-gray-200";

export default function FeaturedJobsSection() {
  return (
    <section className=" pb-20 px-4 md:px-12  w-full max-w-7xl mx-auto">
      <div>
        <SectionTitle
          title="Featured"
          highlight="jobs"
          showAllText="Show all jobs"
          showAllLink="/jobs"
          isExpanded
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredJobsData.map((job: FeaturedJob) => (
            <div
              key={job.id}
              className="border border-gray-200 p-5 flex flex-col gap-3 hover:border-[#1C222D] transition-all cursor-pointer"
            >
              {/* Logo + badge */}
              <div className="flex justify-between items-start">
                <Image
                  src={job.companyLogo}
                  alt={job.companyName}
                  width={48}
                  height={48}
                  className="object-contain"
                />
                <span className="text-xs font-semibold text-brand border border-brand px-2 py-1">
                  Full Time
                </span>
              </div>

              {/* Info */}
              <div className="text-black">
                <h4 className="font-bold text-[16px]">{job.title}</h4>
                <p className="text-[14px]  font-epilogue text-neutral-100  mt-1 flex items-center gap-1.5">
                  {job.companyName}
                  <span className="text-gray-400">•</span>
                  {job.location}
                </p>
              </div>

              <p className="text-[14px] text-neutral-60 leading-relaxed">
                {job.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-auto">
                {job.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`inline-flex items-center justify-center text-center text-[14px]  px-2 py-1 md:px-4 md:py-1.5 rounded-full font-medium ${tagStyles[tag] ?? defaultTag}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
