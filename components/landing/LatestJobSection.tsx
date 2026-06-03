// components/LatestJobsSection.tsx
import {SectionTitle }from "@/components/ui/Title";
import { latestJobs } from "@/data/latestJobs";
import Image from "next/image";
export default function LatestJobsSection() {
  return (
    <section className="bg-[#f5f5fb] px-6 md:px-18 py-12">
      <div className="">
        <SectionTitle title="Latest" highlight="jobs open" showAllText="Show all jobs" showAllLink="/jobs" isExpanded />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border border-gray-200  overflow-hidden ">
          {latestJobs.map((job, i) => (
            <div
              key={job.id}
              className={`flex items-center gap-4 p-5 border-b bg-white border-gray-100 hover:border hover:border-indigo-600 transition-colors cursor-pointer
                ${i % 2 === 0 ? "md:border-r border-gray-100" : ""}
                ${i >= latestJobs.length - 2 ? "border-b-0" : ""}
              `}
            >
              <div >
                <Image src={job.companyLogo} alt={job.companyLogo} width={28} height={28} />
              </div>
              <div>
                <h4 className="font-bold text-sm">{job.title}</h4>
                <p className="text-xs text-gray-500 mb-2">{job.companyName} · {job.location}</p>
                <div className="flex gap-2 flex-wrap">
                  <div> <span className="text-xs font-semibold text-teal-700 border border-teal-300 rounded-full px-3 py-0.5 bg-teal-50">Full-Time</span> </div>
                  
                  {job.tags.map((tag) => (
                    <span key={tag} className="text-xs font-semibold px-3 py-0.5 rounded-full bg-yellow-100 text-yellow-800">{tag}</span>
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