import { SectionTitle } from "@/components/ui/Title";
import { latestJobs } from "@/data/latestJobs";
import Image from "next/image";

const tagStyles: Record<string, string> = {
  "Full-Time": "text-accent-green bg-accent-light-green  ",
  Marketing: "text-yellow-500 border border-yellow-400 bg-transparent",
  Design: "text-indigo-600 border border-indigo-500 bg-transparent font-bold",
};

export default function LatestJobsOpenSection() {
  return (
    <section className="bg-pattern py-12 ">
      <div className="px-4 md:px-12  w-full max-w-7xl mx-auto  ">
        <SectionTitle
          title="Latest"
          highlight="jobs open"
          showAllText="Show all jobs"
          showAllLink="/jobs"
          isExpanded
        />
        <div className=" grid grid-cols-1 md:grid-cols-2  gap-6  overflow-hidden ">
          {latestJobs.map((job, i) => (
            <div
              key={job.id + "-" + i}
              className={`
              flex items-center gap-5 px-8 py-6 bg-white
              hover:shadow-sm transition-all cursor-pointer
              border-[#D6DDEB] border
          
            `}
            >
              {/* Logo */}
              <div className="flex-shrink-0 w-16 h-16 flex items-center justify-center">
                <Image
                  src={job.companyLogo}
                  alt={job.companyName}
                  width={56}
                  height={56}
                  className="object-contain"
                />
              </div>

              {/* Content */}
              <div className="flex flex-col gap-1">
                <h4 className="font-bold text-[16px] text-[#202430]">
                  {job.title}
                </h4>
                <p className="text-sm text-gray-400 flex items-center gap-1.5">
                  {job.companyName}
                  <span className="text-gray-300">•</span>
                  {job.location}
                </p>

                {/* Tags row */}
                <div className="flex items-center gap-2 flex-wrap mt-1">
                  <span className="text-xs font-semibold px-3 py-1 rounded-full text-teal-600 border border-teal-300 bg-teal-50">
                    Full-Time
                  </span>

                  <span className="w-px h-4 bg-gray-200 inline-block" />

                  {/* Category tags */}
                  {job.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`text-xs font-semibold px-3 py-1 rounded-full ${
                        tagStyles[tag] ??
                        "text-gray-500 border border-gray-300 bg-transparent"
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
