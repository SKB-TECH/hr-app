import { SectionTitle } from "@/components/ui/Title";
import { FeaturedJob } from "@/data/featuredJob";
import { featuredJobsData } from "@/data/featuredJob";
import Image from "next/image";

const tagStyles: Record<string, string> = {
  "Marketing":  "bg-yellow-50  text-yellow-500  ",
  "Design":     "bg-teal-50    text-teal-600  ",
  "Business":   "bg-indigo-50  text-indigo-600 ",
  "Technology": "bg-red-50     text-red-400 ",
};

const defaultTag = "bg-gray-50 text-gray-500 border border-gray-200";

export default function FeaturedJobsSection() {
  return (
    <section className="bg-white px-6 md:px-18 pb-10">
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
              className="border border-gray-200 p-5 flex flex-col gap-3 hover:border-brand transition-all cursor-pointer"
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
                <p className="text-[14px] text-[#7C8493]  mt-1 flex items-center gap-1.5">
                  {job.companyName}
                  <span >•</span>
                  {job.location}
                </p>
              </div>

              <p className="text-xs text-[#7C8493] leading-relaxed">
                {job.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-auto">
                {job.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`text-xs font-semibold px-3 py-1 rounded-full ${tagStyles[tag] ?? defaultTag}`}
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