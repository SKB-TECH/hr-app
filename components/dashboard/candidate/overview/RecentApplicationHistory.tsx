// components/RecentApplicationsHistory.tsx
"use client";

import Image from "next/image";
import { Link } from "@/i18n/routing";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { DateRange } from "react-day-picker";
import { format, parseISO, isWithinInterval, startOfDay, endOfDay } from "date-fns";
import { useMyApplications } from "@/core/hooks/applications/use-my-applications";
import { SectionSkeleton } from "../applicant/profile/shared/Skeleton";

function stageStyles(stageName: string): string {
  const label = stageName.toLowerCase();
  if (label.includes("reject") || label.includes("declin") || label.includes("unsuitable")) {
    return "text-red-500 border border-red-400";
  }
  if (label.includes("hire") || label.includes("offer")) {
    return "text-indigo-600 border border-indigo-500 font-bold";
  }
  if (label.includes("interview") || label.includes("shortlist")) {
    return "text-yellow-500 border border-yellow-400";
  }
  return "text-gray-500 border border-gray-300";
}

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
  const { data: applicationsPage, isLoading, isError } = useMyApplications({ limit: 20 });
  const applications = applicationsPage?.data ?? [];

  const filteredApplications = applications.filter((application) => {
    if (!dateRange?.from || !dateRange?.to) return true;
    const appliedDate = parseISO(application.appliedAt);
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
        {isLoading && <SectionSkeleton rows={3} />}

        {!isLoading && isError && (
          <p className="text-center text-[#7C8493] py-6">
            We couldn&apos;t load your applications right now. Please refresh the page to try again.
          </p>
        )}

        {!isLoading && !isError && filteredApplications.length > 0
          ? filteredApplications.map((application) => {
              const status = application.stage?.name || "Applied";
              return (
            <div
              key={application.id}
              className="bg-[#F8F8FD] px-5 py-4 rounded-md"
            >
              {/* MOBILE layout */}
              <div className="sm:hidden">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-14 h-14 flex items-center justify-center">
                    <Image
                      src={application.job.companyLogoUrl || "/logo/lgo.png"}
                      alt={application.job.companyName || application.job.title}
                      width={52}
                      height={52}
                      className="object-contain rounded-lg"
                    />
                  </div>
                  <ThreeDots />
                </div>
                <p className="text-[18px] font-bold text-[#25324B] mb-1">
                  {application.job.title}
                </p>
                <p className="text-[13px] text-gray-400 flex items-center gap-1.5 flex-wrap mb-3">
                  <span>{application.job.companyName || "—"}</span>
                  <span className="text-gray-300">•</span>
                  <span>{application.job.location || "Remote"}</span>
                </p>
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-[16px] text-[#25324B] font-medium">
                      Date Applied
                    </p>
                    <p className="text-[14px] text-[#7C8493] mt-0.5">
                      {format(parseISO(application.appliedAt), "d MMMM yyyy")}
                    </p>
                  </div>
                  <span
                    className={`text-[12px] font-semibold px-4 py-1.5 rounded-full ${stageStyles(status)}`}
                  >
                    {status}
                  </span>
                </div>
              </div>

              {/* DESKTOP layout */}
              <div className="hidden sm:flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center">
                    <Image
                      src={application.job.companyLogoUrl || "/logo/lgo.png"}
                      alt={application.job.companyName || application.job.title}
                      width={44}
                      height={44}
                      className="object-contain rounded-lg"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[18px] font-bold text-[#25324B]">
                      {application.job.title}
                    </p>
                    <p className="text-[16px] text-gray-400 mt-0.5 flex items-center gap-1.5 flex-wrap">
                      <span>{application.job.companyName || "—"}</span>
                      <span className="text-gray-300">•</span>
                      <span>{application.job.location || "Remote"}</span>
                    </p>
                  </div>
                </div>

                <div className="flex-shrink-0 text-right">
                  <p className="text-[18px] text-[#25324B] font-medium">
                    Date Applied
                  </p>
                  <p className="text-[16px] font-medium text-[#7C8493] mt-0.5">
                    {format(parseISO(application.appliedAt), "d MMMM yyyy")}
                  </p>
                </div>

                <div className="flex-shrink-0">
                  <span
                    className={`text-[12px] font-semibold px-4 py-1.5 rounded-full ${stageStyles(status)}`}
                  >
                    {status}
                  </span>
                </div>

                <ThreeDots />
              </div>
            </div>
              );
            })
          : !isLoading &&
            !isError && (
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
