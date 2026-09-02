"use client";

import { useState } from "react";
import {
  PencilSquareIcon,
  EnvelopeIcon,
  DevicePhoneMobileIcon,
} from "@heroicons/react/24/outline";

import { useMyCandidateProfile } from "@/core/hooks/candidate/use-my-candidate-profile";
import { SectionSkeleton } from "./shared/Skeleton";
import EditAdditionalDetailsModal from "./Profile/EditAdditionalDetailsModal";

export default function AdditionalDetailsSection() {
  const { data: profile, isLoading, isError } = useMyCandidateProfile();
  const [editOpen, setEditOpen] = useState(false);

  console.log("profile", profile);

  return (
    <div className='bg-white border border-gray-200 p-6 font-epilogue'>
      <div className='flex items-center justify-between mb-5'>
        <h2 className='text-[18px] font-bold text-[#25324B]'>
          Additional Details
        </h2>
        <button
          type='button'
          onClick={() => setEditOpen(true)}
          disabled={isLoading}
          aria-label='Edit additional details'
          className='cursor-pointer border border-gray-200 p-1.5 hover:border-brand disabled:cursor-not-allowed disabled:opacity-50'
        >
          <PencilSquareIcon className='w-4 h-4 text-brand' />
        </button>
      </div>

      {isLoading && <SectionSkeleton rows={2} />}

      {!isLoading && isError && (
        <p className='text-[14px] text-gray-500'>
          We couldn&apos;t load your details right now. Please refresh the page
          to try again.
        </p>
      )}

      {!isLoading && !isError && profile && (
        <div className='flex flex-col gap-5'>
          <div className='flex items-center gap-3'>
            <EnvelopeIcon className='w-5 h-5 text-[#7C8493] flex-shrink-0 mt-0.5' />
            <div>
              <p className='text-[14px] text-[#7C8493]'>Email</p>
              <p className='text-[16px] font-medium text-[#25324B] mt-0.5'>
                {profile.email}
              </p>
            </div>
          </div>

          {profile.phoneNumber && (
            <div className='flex items-center gap-3'>
              <DevicePhoneMobileIcon className='w-5 h-5 text-[#7C8493] flex-shrink-0 mt-0.5' />
              <div>
                <p className='text-[14px] text-[#7C8493]'>Phone number</p>
                <p className='text-[16px] font-medium text-[#25324B] mt-0.5'>
                  {profile.phoneNumber}
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {profile && (
        <EditAdditionalDetailsModal
          open={editOpen}
          onOpenChange={setEditOpen}
          profile={profile}
        />
      )}
    </div>
  );
}
