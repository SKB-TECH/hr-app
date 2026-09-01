"use client";

import { useState } from "react";
import { PencilSquareIcon, DocumentTextIcon } from "@heroicons/react/24/outline";

import { useMyCandidateProfile } from "@/core/hooks/candidate/use-my-candidate-profile";
import { SectionSkeleton } from "./shared/Skeleton";
import EditBioModal from "./Profile/EditBioModal";

export default function AboutSection() {
  const { data: profile, isLoading, isError } = useMyCandidateProfile();
  const [editOpen, setEditOpen] = useState(false);

  const bio = profile?.candidateProfile?.bio || "";
  const paragraphs = bio.split(/\n{2,}/).filter(Boolean);

  return (
    <div className="bg-white border border-gray-200 p-6 font-epilogue">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-[20px] font-bold text-[#202430]">About Me</h2>
        <button
          type="button"
          onClick={() => setEditOpen(true)}
          disabled={isLoading}
          aria-label="Edit about me"
          className="cursor-pointer border border-gray-200 p-1.5 transition-colors hover:border-brand disabled:cursor-not-allowed disabled:opacity-50"
        >
          <PencilSquareIcon className="w-4 h-4 text-brand" />
        </button>
      </div>

      {isLoading && <SectionSkeleton rows={2} />}

      {!isLoading && isError && (
        <p className="text-[14px] text-gray-500">We couldn&apos;t load your bio right now. Please refresh the page to try again.</p>
      )}

      {!isLoading && !isError && paragraphs.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-2 py-6 text-center">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-50 text-brand">
            <DocumentTextIcon className="h-5 w-5" />
          </span>
          <p className="text-[15px] font-medium text-[#202430]">Tell your story</p>
          <p className="text-[14px] text-gray-500">Add a short bio so recruiters can learn more about you.</p>
          <button
            type="button"
            onClick={() => setEditOpen(true)}
            className="mt-2 cursor-pointer text-[14px] font-semibold text-brand transition-colors hover:text-indigo-800"
          >
            + Add About Me
          </button>
        </div>
      )}

      {!isLoading && !isError && paragraphs.length > 0 && (
        <div className="flex flex-col gap-4">
          {paragraphs.map((paragraph, index) => (
            <p key={index} className="text-[16px] font-epilogue text-gray-500 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      )}

      {profile && <EditBioModal open={editOpen} onOpenChange={setEditOpen} profile={profile} />}
    </div>
  );
}
