"use client";

import { Link } from "@/i18n/routing";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

interface JobUpdate {
  id: number;
  title: string;
  company: string;
  location: string;
  logo: string;
  tags: string[];
  applied: number;
  capacity: number;
}

interface JobUpdatesSectionProps {
  jobs?: JobUpdate[];
}

const tagStyles: Record<string, string> = {
  Marketing:  "text-yellow-500 border border-yellow-300",
  Design:     "text-indigo-600 border border-indigo-400 font-bold",
  Business:   "text-teal-600  border border-teal-300",
  Technology: "text-red-400   border border-red-200",
};

const defaultJobs: JobUpdate[] = [
  {
    id: 1,
    title: "Social Media Assistant",
    company: "Nomad",
    location: "Paris, France",
    logo: "/Nomad.png",
    tags: ["Marketing", "Design"],
    applied: 5,
    capacity: 10,
  },
  {
    id: 2,
    title: "Brand Designer",
    company: "Nomad",
    location: "Paris, France",
    logo: "/Dropbox.png",
    tags: ["Business", "Design"],
    applied: 5,
    capacity: 10,
  },
  {
    id: 3,
    title: "Interactive Developer",
    company: "Terraform",
    location: "Berlin, Germany",
    logo: "/Terraform.png",
    tags: ["Marketing", "Design"],
    applied: 5,
    capacity: 10,
  },
  {
    id: 4,
    title: "Product Designer",
    company: "ClassPass",
    location: "Berlin, Germany",
    logo: "/ClassPass.png",
    tags: ["Business", "Design"],
    applied: 5,
    capacity: 10,
  },
];

export default function JobUpdatesSection({ jobs = defaultJobs }: JobUpdatesSectionProps) {
  return (
    <div className="bg-white border border-gray-200 py-6">
      <div className="border-b border-gray-200 ">
 <div className="flex items-center justify-between px-6 mb-6">
        <h2 className="text-[20px] font-bold text-[#202430]">Job Updates</h2>
        <Link
          href="/company/job-listing"
          className=" hidden sm:flex items-center gap-1.5 text-[13px] font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
        >
          View All
          <ArrowRightIcon className="w-4 h-4" />
        </Link>
      </div>
      </div>
     

      <div className="grid grid-cols-1 p-6 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {jobs.map((job) => {
          const percent = (job.applied / job.capacity) * 100;
          return (
            <div key={job.id} className="border border-gray-200 p-5 flex flex-col gap-3">
              {/* Logo */}
              <div className="flex items-start justify-between">
                <Image
                  src={job.logo}
                  alt={job.company}
                  width={40}
                  height={40}
                  className="object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              
                <span className="text-[12px] font-medium text-teal-700 bg-teal-50 px-3.5 py-1.5 rounded-full">
                  Full-Time
                </span>
              </div>

              {/* Title + company */}
              <div>
                <h3 className="text-[16px] sm:text-[14px] font-bold text-[#202430]">{job.title}</h3>
                <p className="text-[12px] text-gray-400 mt-1 flex items-center gap-1.5">
                  {job.company}
                  <span className="text-gray-300">•</span>
                  {job.location}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {job.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`text-[12px] font-semibold px-3.5 py-1 rounded-full ${
                      tagStyles[tag] ?? "text-gray-500 border border-gray-300"
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Capacity progress */}
              <div className="mt-1">
                <div className="w-full h-1.5 bg-[#D6DDEB] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-teal-400 rounded-full"
                    style={{ width: `${percent}%` }}
                  />
                </div>
                <p className="text-[13px] text-gray-400 mt-2">
                  <span className="font-bold text-[#202430]">{job.applied} applied</span> of{" "}
                  {job.capacity} capacity
                </p>
              </div>
            </div>
          );
        })}
      </div>
        <div className="sm:hidden flex justify-center mt-6">
        <Link
          href="#"
          className="flex items-center gap-1.5 text-[14px] font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
        >
          View All
          <ArrowRightIcon className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}