"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

const timeSlots = ["10:00 AM", "10:30 AM", "11:00 AM"];

const interviews = [
  {
    time: "10:30 AM",
    name: "Joe Bartmann",
    role: "HR Manager at Divvy",
    avatar: "/joe.png",
  },
  {
    time: "1:30 PM",
    name: "Zack Carlos",
    role: "Fresh Graduated",
    avatar: "/zack.jpg",
  },
];

export function UpcomingInterviews() {
  return (
    <div className="border border-gray-200 bg-white flex flex-col">
      {/* Title */}
      <div className="border-b border-b-gray-200 p-4">
        <p className="text-[16px] xl:text-[18px] font-epilogue tracking-wider font-bold text-[#202430]">
          Upcomming Interviews
        </p>
      </div>

      {/* Date nav */}
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <p className="text-[14px] font-semibold text-[#202430]">
          Today, <span className="font-normal text-gray-400">26 November</span>
        </p>
        <div className="flex items-center gap-1">
          <button className="p-1 hover:text-indigo-600 transition-colors text-gray-400">
            <ChevronLeftIcon className="w-4 h-4" />
          </button>
          <button className="p-1 hover:text-indigo-600 transition-colors text-gray-900">
            <ChevronRightIcon className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ── MOBILE: 2-col card grid ── */}
      <div className="sm:hidden grid grid-cols-2 gap-3 p-4">
        {interviews.map((interview) => (
          <div
            key={interview.name}
            className="bg-[#E9EBFD] rounded-xl p-4 flex flex-col gap-3"
          >
            {/* Avatar */}
            <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-300 flex-shrink-0">
              <Image
                src={interview.avatar}
                alt={interview.name}
                width={48}
                height={48}
                className="object-cover w-full h-full"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            </div>

            {/* Info */}
            <div>
              <p className="text-[13px] font-bold text-[#202430]">
                {interview.name}
              </p>
              <p className="text-[11px] text-gray-400 mt-0.5">
                {interview.role}
              </p>
              <p className="text-[12px] font-semibold text-[#202430] mt-2">
                {interview.time}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* ── DESKTOP: time-slot list ── */}
      <div className="hidden sm:flex flex-col gap-2 pl-4 pr-2">
        {timeSlots.map((slot) => (
          <div key={slot} className="flex items-center gap-2 min-h-[44px]">
            <span className="text-[12px] text-gray-400 w-[68px] flex-shrink-0">
              {slot}
            </span>
            {slot === interviews[0].time ? (
              <div className="flex-1 flex items-center gap-3 bg-[#E9EBFD] px-4 py-3 rounded-md">
                <div className="w-9 h-9 rounded-full overflow-hidden bg-gray-300 flex-shrink-0">
                  <Image
                    src={interviews[0].avatar}
                    alt={interviews[0].name}
                    width={36}
                    height={36}
                    className="object-cover w-full h-full"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                </div>
                <div>
                  <p className="text-[13px] font-bold text-[#202430]">
                    {interviews[0].name}
                  </p>
                  <p className="text-[11px] text-gray-400">
                    {interviews[0].role}
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex-1 h-px bg-gray-100" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
