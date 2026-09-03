"use client";

import toast from "react-hot-toast";
import { DocumentTextIcon, TrashIcon, ArrowDownTrayIcon, StarIcon, SparklesIcon } from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid";

import { formatFileSize } from "../shared/profile-document-validation";
import { useSetDefaultCandidateResume } from "@/core/hooks/candidate/use-set-default-candidate-resume";
import type { CandidateResume } from "@/core/types/candidate-resume";
import { ApiError } from "@/core/types/api";

interface ResumeItemProps {
  resume: CandidateResume;
  isLast: boolean;
  onDelete: (resume: CandidateResume) => void;
  onAutofill: (resume: CandidateResume) => void;
}

export default function ResumeItem({ resume, isLast, onDelete, onAutofill }: ResumeItemProps) {
  const setDefaultResume = useSetDefaultCandidateResume();

  const handleSetDefault = async () => {
    if (resume.isDefault || setDefaultResume.isPending) return;
    try {
      await setDefaultResume.mutateAsync(resume.id);
      toast.success("Default resume updated.");
    } catch (error) {
      toast.error(error instanceof ApiError ? error.message : "Failed to set default resume. Please try again.");
    }
  };

  return (
    <div className={`flex items-center gap-4 ${!isLast ? "pb-4 mb-4 border-b border-gray-100" : ""}`}>
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-brand">
        <DocumentTextIcon className="h-5 w-5" />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="truncate text-[15px] font-semibold text-[#202430]">{resume.fileName}</p>
          {resume.isDefault && (
            <span className="shrink-0 rounded-full bg-indigo-50 px-2.5 py-0.5 text-[11px] font-semibold text-brand">Default</span>
          )}
        </div>
        {resume.fileSize != null && <p className="text-[13px] text-gray-400">{formatFileSize(resume.fileSize)}</p>}
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <button
          type="button"
          onClick={() => onAutofill(resume)}
          aria-label={`Autofill profile from ${resume.fileName}`}
          className="cursor-pointer border border-gray-200 p-1.5 hover:border-brand"
        >
          <SparklesIcon className="w-4 h-4 text-brand" />
        </button>
        <button
          type="button"
          onClick={handleSetDefault}
          disabled={resume.isDefault || setDefaultResume.isPending}
          aria-label={resume.isDefault ? `${resume.fileName} is your default resume` : `Set ${resume.fileName} as default`}
          className="cursor-pointer border border-gray-200 p-1.5 hover:border-brand disabled:cursor-not-allowed disabled:opacity-50"
        >
          {resume.isDefault ? <StarIconSolid className="w-4 h-4 text-brand" /> : <StarIcon className="w-4 h-4 text-brand" />}
        </button>
        {resume.fileUrl && (
          <a
            href={resume.fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Download ${resume.fileName}`}
            className="cursor-pointer border border-gray-200 p-1.5 hover:border-brand"
          >
            <ArrowDownTrayIcon className="w-4 h-4 text-brand" />
          </a>
        )}
        <button
          type="button"
          onClick={() => onDelete(resume)}
          aria-label={`Delete ${resume.fileName}`}
          className="cursor-pointer border border-gray-200 p-1.5 hover:border-red-300"
        >
          <TrashIcon className="w-4 h-4 text-[#FF6550]" />
        </button>
      </div>
    </div>
  );
}
