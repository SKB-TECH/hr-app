import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

type ApplicationStatus = "In Review" | "Shortlisted" | "Declined";

interface Application {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  dateApplied: string;
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

export default function RecentApplicationsHistory() {
  return (
    <div className="bg-white border border-gray-200 ">
      {/* Header */}
      <h2 className="text-[18px] font-bold text-[#202430] p-6 border-b border-gray-100">
        Recent Applications History
      </h2>

      {/* List */}
      <div className="flex flex-col gap-3 p-6 ">
        {applications.map((app) => (
          <div
            key={app.id}
            className={` ${app.status == "Shortlisted" ? "" : "bg-[#F8F8FD]"} px-5 py-4 rounded-md`}
          >
            {/* ── MOBILE layout (default) ── */}
            <div className="sm:hidden">
              {/* Row 1: logo + three dots */}
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

              {/* Row 2: job title */}
              <p className="text-[18px] font-bold text-[#25324B]  mb-1">
                {app.title}
              </p>

              {/* Row 3: company • location • type */}
              <p className="text-[13px] text-gray-400 flex items-center gap-1.5 flex-wrap mb-3">
                <span>{app.company}</span>
                <span className="text-gray-300">•</span>
                <span>{app.location}</span>
                <span className="text-gray-300">•</span>
                <span>{app.type}</span>
              </p>

              {/* Row 4: date + status badge side by side */}
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-[16px] text-[#25324B]  font-medium">
                    Date Applied
                  </p>
                  <p className="text-[14px]  text-[#7C8493] mt-0.5">
                    {app.dateApplied}
                  </p>
                </div>
                <span
                  className={`text-[12px] font-semibold px-4 py-1.5 rounded-full ${statusStyles[app.status]}`}
                >
                  {app.status}
                </span>
              </div>
            </div>

            {/* ── DESKTOP layout (sm+) ── */}
            <div className="hidden sm:flex items-center justify-between gap-4">
              {/* Logo + info */}
              <div className="flex  items-center gap-4 ">
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
                  <Link href="/candidate/find-jobs/1">
                    <p className="text-[18px] font-bold hover:text-brand text-[#25324B]">
                      {app.title}
                    </p>
                  </Link>
                  <p className="text-[16px] text-gray-400 mt-0.5 flex items-center gap-1.5 flex-wrap">
                    <span>{app.company}</span>
                    <span className="text-gray-300">•</span>
                    <span>{app.location}</span>
                    <span className="text-gray-300">•</span>
                    <span>{app.type}</span>
                  </p>
                </div>
              </div>

              {/* Date */}
              <div className="flex-shrink-0 text-right">
                <p className="text-[18px] [#25324B] font-medium">
                  Date Applied
                </p>
                <p className="text-[16px] font-medium text-[#7C8493] mt-0.5">
                  {app.dateApplied}
                </p>
              </div>

              {/* Status */}
              <div className="flex-shrink-0">
                <span
                  className={`text-[12px] font-semibold px-4 py-1.5 rounded-full ${statusStyles[app.status]}`}
                >
                  {app.status}
                </span>
              </div>

              {/* Three dots */}
              <ThreeDots />
            </div>
          </div>
        ))}
      </div>

      {/* Footer link */}
      <div className="sm:flex  justify-center p-6 ">
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
