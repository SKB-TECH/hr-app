'use client';

import { PencilSquareIcon, MapPinIcon, FlagIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

interface ProfileSectionProps {
  name?: string;
  title?: string;
  company?: string;
  location?: string;
  openForOpportunities?: boolean;
}

export default function ProfileSection({
  name = "Jake Gyll",
  title = "Product Designer",
  company = "Twitter",
  location = "Manchester, UK",
  openForOpportunities = true,
}: ProfileSectionProps) {
  return (
    <div className="bg-white border border-gray-200 font-epilogue">
      {/* Cover banner */}
      <div className="relative h-[140px] sm:h-[160px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/profile-bg.jpg')",
          }}
        />
        <div className="absolute inset-0 bg-black/20" />
        <button className="absolute top-4 right-4 sm:top-5 sm:right-5 bg-white/90 bg-white p-2 transition-colors z-10 cursor-pointer">
          <PencilSquareIcon className="w-4 h-4 text-brand" />
        </button>
      </div>                        

      {/* Profile info */}
      <div className="relative flex flex-col items-center sm:flex-row sm:items-start sm:gap-4 px-6 py-6 pt-0">

       
        <div className="relative -mt-12 sm:-mt-14 mb-4 sm:mb-4 flex-shrink-0">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-white overflow-hidden bg-accent-light-blue">
            <Image
              src="/img_design/jakePro.png"
              alt="jake"
              width={140}
              height={140}
              className="object-cover w-full h-full"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          </div>
        </div>

        {/* Name + Edit button row */}
        <div className="flex flex-col items-center text-center w-full sm:ml-2 sm:items-start sm:text-left sm:flex-row sm:items-start sm:justify-between sm:pt-4">

          <div className="flex flex-col items-center sm:items-start">
            <h1 className="text-[24px] font-bold text-[#202430]">{name}</h1>
            <p className="text-[18px] text-gray-500 mt-1">
              {title} at <span className="font-semibold text-[#202430]">{company}</span>
            </p>
            <div className="text-[18px] text-gray-400 mt-2 flex  gap-1.5">
              <MapPinIcon className="w-5 h-5" />
              <p> {location} </p>
            </div>

            {/* Open for opportunities badge */}
            {openForOpportunities && (
              <div className="mt-4 w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#56CDAD1A] text-[#56CDAD] text-[12px] md:text-[16px] font-bold px-4 py-2 tracking-wide">
                <FlagIcon className="w-5 h-5" />
                OPEN FOR OPPORTUNITIES
              </div>
            )}
          </div>

          <button className="mt-4 w-full sm:mt-0 sm:w-auto border border-gray-200 text-brand font-bold font-epilogue text-[14px] px-5 py-2.5  whitespace-nowrap self-stretch sm:self-start cursor-pointer">
            Edit Profile
          </button>
        </div>

      </div>
    </div>
  );
}