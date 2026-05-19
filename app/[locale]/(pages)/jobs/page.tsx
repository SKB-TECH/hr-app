import { JobCard } from "@/components/ui/JobCard";

import ReusableHero from "../../../../components/shared/ReusableHero";
import SearchInput from "../../../../components/static/SearchInput";
import { getAllJobs } from "../../../../services/job.service";
import { Job } from "../../../../core/types";

const cardcontent = {
  id: "FDMAN2038-234",
  ref: "#FDMAN2038-234",
  title: "Frontend Developer",
  location: "Manchester, UK",
  salary: "£40,000 - £55,000 per annum",
  jobType: "Hybrid, Permanent",
  description:
    "We're looking for an experienced Frontend Developer to join our dynamic team. You'll work with modern technologies like React, TypeScript, and Tailwind CSS to build responsive, user-friendly web applications. This is an excellent opportunity to grow your skills in a collaborative environment with a focus on code quality and innovation.",
};

export default async function JobsPage() {
  const jobsList: Job[] = await getAllJobs();
  return (
    <div className="bg-[#fcfcfc] min-h-screen">
      <ReusableHero>
        <h2 className="font-bold text-4xl leading-tight sm:text-5xl md:text-6xl  text-white wrap-break-word">
          JOBS
        </h2>
      </ReusableHero>

      <div className="w-full max-w-7xl mx-auto px-6 py-16 md:px-12">
        {/* Search Bar */}
        <SearchInput />

        <div className="space-y-6">
          {jobsList.map((job: Job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between pt-8 border-t border-none mt-8">
          <p className="text-sm text-gray-500">Show 1 - 4 of 20 entries</p>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <button className="font-medium text-gray-900">1</button>
            <span className="text-gray-300">|</span>
            <button className="font-medium text-gray-400 hover:text-gray-700">
              2
            </button>
            <span className="text-gray-300">|</span>
            <button className="font-medium text-gray-400 hover:text-gray-700">
              3
            </button>
            <span className="text-gray-300">|</span>
            <button className="font-medium text-gray-400 hover:text-gray-700">
              4
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
