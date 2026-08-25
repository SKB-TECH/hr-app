// components/RecentApplicationsHistory.tsx
"use client";

import Image from "next/image";
import { Link } from "@/i18n/routing";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { DateRange } from "react-day-picker";
import { parse, isWithinInterval, startOfDay, endOfDay } from "date-fns";

type ApplicationStatus = "In Review" | "Shortlisted" | "Declined";

interface Application {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  dateApplied: string; // e.g. "24 July 2021"
  status: ApplicationStatus;
  logo: string;
}

const applications: Application[] = [
  {
    id: 1,
    title: "Social Media Assistant",
    company: "Nomad",
    location: "Paris, France",
    type: "Full-Time",
    dateApplied: "24 July 2021",
    status: "In Review",
    logo: "/Nomad.png",
  },
  {
    id: 2,
    title: "Social Media Assistant",
    company: "Udacity",
    location: "New York, USA",
    type: "Full-Time",
    dateApplied: "23 July 2021",
    status: "Shortlisted",
    logo: "/Udacity.png",
  },
  {
    id: 3,
    title: "Social Media Assistant",
    company: "Packer",
    location: "Madrid, Spain",
    type: "Full-Time",
    dateApplied: "22 July 2021",
    status: "Declined",
    logo: "/Packer.png",
  },
];

const statusStyles: Record<ApplicationStatus, string> = {
  "In Review": "text-yellow-500 border border-yellow-400",
  Shortlisted: "text-indigo-600 border border-indigo-500 font-bold",
  Declined: "text-red-500 border border-red-400",
};

function ThreeDots() {
  return (
    <button className="text-[#25324B] p-1">
      <svg width="18" height="4" viewBox="0 0 18 4" fill="currentColor">
        <circle cx="2" cy="2" r="2" />
        <circle cx="9" cy="2" r="2" />
        <circle cx="16" cy="2" r="2" />
      </svg>
    </button>
  );
}

interface RecentApplicationsProps {
  dateRange?: DateRange;
}

export default function RecentApplicationsHistory({
  dateRange,
}: RecentApplicationsProps) {
  // Filter logic
  const filteredApplications = applications.filter((app) => {
    if (!dateRange?.from || !dateRange?.to) return true;

    // Parse string date ("24 July 2021") into Date object
    const appliedDate = parse(app.dateApplied, "d MMMM yyyy", new Date());

    return isWithinInterval(appliedDate, {
      start: startOfDay(dateRange.from),
      end: endOfDay(dateRange.to),
    });
  });

  return (
    <div className="bg-white border border-gray-200">
      {/* Header */}
      <h2 className="text-[18px] font-bold text-[#202430] p-6 border-b border-gray-100">
        Recent Applications History
      </h2>

      {/* List */}
      <div className="flex flex-col gap-3 p-6">
        {filteredApplications.length > 0 ? (
          filteredApplications.map((app) => (
            <div
              key={app.id}
              className={`${
                app.status === "Shortlisted" ? "" : "bg-[#F8F8FD]"
              } px-5 py-4 rounded-md`}
            >
              {/* MOBILE layout */}
              <div className="sm:hidden">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-14 h-14 flex items-center justify-center">
                    <Image
                      src={app.logo}
                      alt={app.company}
                      width={52}
                      height={52}
                      className="object-contain rounded-lg"
                    />
                  </div>
                  <ThreeDots />
                </div>
                <p className="text-[18px] font-bold text-[#25324B] mb-1">
                  {app.title}
                </p>
                <p className="text-[13px] text-gray-400 flex items-center gap-1.5 flex-wrap mb-3">
                  <span>{app.company}</span>
                  <span className="text-gray-300">•</span>
                  <span>{app.location}</span>
                  <span className="text-gray-300">•</span>
                  <span>{app.type}</span>
                </p>
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-[16px] text-[#25324B] font-medium">
                      Date Applied
                    </p>
                    <p className="text-[14px] text-[#7C8493] mt-0.5">
                      {app.dateApplied}
                    </p>
                  </div>
                  <span
                    className={`text-[12px] font-semibold px-4 py-1.5 rounded-full ${
                      statusStyles[app.status]
                    }`}
                  >
                    {app.status}
                  </span>
                </div>
              </div>

              {/* DESKTOP layout */}
              <div className="hidden sm:flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center">
                    <Image
                      src={app.logo}
                      alt={app.company}
                      width={44}
                      height={44}
                      className="object-contain rounded-lg"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[18px] font-bold text-[#25324B]">
                      {app.title}
                    </p>
                    <p className="text-[16px] text-gray-400 mt-0.5 flex items-center gap-1.5 flex-wrap">
                      <span>{app.company}</span>
                      <span className="text-gray-300">•</span>
                      <span>{app.location}</span>
                      <span className="text-gray-300">•</span>
                      <span>{app.type}</span>
                    </p>
                  </div>
                </div>

                <div className="flex-shrink-0 text-right">
                  <p className="text-[18px] text-[#25324B] font-medium">
                    Date Applied
                  </p>
                  <p className="text-[16px] font-medium text-[#7C8493] mt-0.5">
                    {app.dateApplied}
                  </p>
                </div>

                <div className="flex-shrink-0">
                  <span
                    className={`text-[12px] font-semibold px-4 py-1.5 rounded-full ${
                      statusStyles[app.status]
                    }`}
                  >
                    {app.status}
                  </span>
                </div>

                <ThreeDots />
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-[#7C8493] py-6">
            No applications found for the selected date range.
          </p>
        )}
      </div>

      {/* Footer link */}
      <div className="sm:flex justify-center p-6">
        <Link
          href="/candidate/applications"
          className="flex items-center gap-1.5 text-sm sm:text-[14px] font-semibold text-[#4640DE] hover:text-indigo-800 transition-colors"
        >
          View all applications history
          <ArrowRightIcon className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}