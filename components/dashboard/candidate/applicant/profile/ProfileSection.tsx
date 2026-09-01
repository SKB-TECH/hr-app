"use client";

import { useState } from "react";
import { PencilSquareIcon, MapPinIcon, FlagIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

import { useMyCandidateProfile } from "@/core/hooks/candidate/use-my-candidate-profile";
import EditProfileModal from "./Profile/EditProfileModal";
import { Skeleton } from "./shared/Skeleton";

const DEFAULT_AVATAR = "/img_design/jakePro.png";
const DEFAULT_COVER = "/profile-bg.jpg";

export default function ProfileSection() {
  const { data: profile, isLoading, isError } = useMyCandidateProfile();
  const [editOpen, setEditOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="bg-white border border-gray-200 font-epilogue">
        <Skeleton className="h-[140px] rounded-none sm:h-[160px]" />
        <div className="px-6 py-6">
          <Skeleton className="-mt-12 mb-4 h-24 w-24 rounded-full border-4 border-white sm:-mt-14 sm:h-28 sm:w-28" />
          <Skeleton className="h-6 w-48" />
          <Skeleton className="mt-2 h-4 w-64" />
        </div>
      </div>
    );
  }

  if (isError || !profile) {
    return (
      <div className="bg-white border border-gray-200 p-6 font-epilogue">
        <p className="text-[14px] text-gray-500">
          We couldn&apos;t load your profile right now. Please refresh the page to try again.
        </p>
      </div>
    );
  }

  const location = [profile.candidateProfile?.cityName, profile.candidateProfile?.countryName]
    .filter(Boolean)
    .join(", ");

  return (
    <div className="bg-white border border-gray-200 font-epilogue">
      {/* Cover banner */}
      <div className="relative h-[140px] sm:h-[160px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('${DEFAULT_COVER}')`,
          }}
        />
        <div className="absolute inset-0 bg-black/20" />
        <button
          type="button"
          onClick={() => setEditOpen(true)}
          aria-label="Edit profile"
          className="absolute top-4 right-4 sm:top-5 sm:right-5 bg-white/90 p-2 transition-colors z-10 cursor-pointer"
        >
          <PencilSquareIcon className="w-4 h-4 text-brand" />
        </button>
      </div>

      {/* Profile info */}
      <div className="relative flex flex-col items-center sm:flex-row sm:items-start sm:gap-4 px-6 py-6 pt-0">
        <div className="relative -mt-12 sm:-mt-14 mb-4 sm:mb-4 flex-shrink-0">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-white overflow-hidden bg-accent-light-blue">
            <Image
              src={profile.avatar || DEFAULT_AVATAR}
              alt={profile.fullName}
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
            <h1 className="text-[24px] font-bold text-[#202430]">{profile.fullName}</h1>
            {profile.candidateProfile?.headline && (
              <p className="text-[18px] text-gray-500 mt-1">{profile.candidateProfile.headline}</p>
            )}
            {location && (
              <div className="text-[18px] text-gray-400 mt-2 flex gap-1.5">
                <MapPinIcon className="w-5 h-5" />
                <p>{location}</p>
              </div>
            )}

            {/* Open for opportunities badge */}
            {profile.candidateProfile?.openToWork && (
              <div className="mt-4 w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#56CDAD1A] text-[#56CDAD] text-[12px] md:text-[16px] font-bold px-4 py-2 tracking-wide">
                <FlagIcon className="w-5 h-5" />
                OPEN FOR OPPORTUNITIES
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => setEditOpen(true)}
            className="mt-4 w-full sm:mt-0 sm:w-auto border border-gray-200 text-brand font-bold font-epilogue text-[14px] px-5 py-2.5 whitespace-nowrap self-stretch sm:self-start cursor-pointer"
          >
            Edit Profile
          </button>
        </div>
      </div>

      <EditProfileModal open={editOpen} onOpenChange={setEditOpen} profile={profile} />
    </div>
  );
}
