"use client";

import { format, parseISO } from "date-fns";
import { PencilSquareIcon, TrashIcon, LinkIcon, PaperClipIcon } from "@heroicons/react/24/outline";
import type { CandidateEducation } from "@/core/types/candidate-education";

interface EducationItemProps {
  education: CandidateEducation;
  isLast: boolean;
  onEdit: (education: CandidateEducation) => void;
  onDelete: (education: CandidateEducation) => void;
}

function formatEducationDate(value: string) {
  try {
    return format(parseISO(value), "MMM yyyy");
  } catch {
    return value;
  }
}

export default function EducationItem({ education, isLast, onEdit, onDelete }: EducationItemProps) {
  const startLabel = formatEducationDate(education.startDate);
  const endLabel = education.isCurrent ? "Present" : education.endDate ? formatEducationDate(education.endDate) : "";

  return (
    <div className={`sm:flex gap-4 ${!isLast ? "pb-6 mb-6 border-b border-gray-100" : ""}`}>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-[18px] font-bold text-[#202430]">{education.institution}</h3>
          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={() => onEdit(education)}
              aria-label={`Edit ${education.institution}`}
              className="cursor-pointer border border-gray-200 p-1.5 hover:border-brand"
            >
              <PencilSquareIcon className="w-4 h-4 text-brand" />
            </button>
            <button
              type="button"
              onClick={() => onDelete(education)}
              aria-label={`Delete ${education.institution}`}
              className="cursor-pointer border border-gray-200 p-1.5 hover:border-red-300"
            >
              <TrashIcon className="w-4 h-4 text-[#FF6550]" />
            </button>
          </div>
        </div>

        <p className="text-[16px] text-gray-500 mt-1">
          {education.degree}
          {education.fieldOfStudy && <span>, {education.fieldOfStudy}</span>}
        </p>
        <p className="text-[16px] text-gray-400 mt-1">
          {startLabel} - {endLabel}
        </p>
        {education.grade && <p className="text-[14px] text-gray-400 mt-1">Grade: {education.grade}</p>}

        {education.description && (
          <p className="text-[16px] text-gray-500 leading-relaxed mt-3">{education.description}</p>
        )}

        {(education.educationUrl || education.documentFileUrl) && (
          <div className="mt-3 flex flex-wrap items-center gap-4">
            {education.educationUrl && (
              <a
                href={education.educationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[14px] font-medium text-brand hover:underline"
              >
                <LinkIcon className="h-4 w-4" />
                View institution
              </a>
            )}
            {education.documentFileUrl && (
              <a
                href={education.documentFileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[14px] font-medium text-brand hover:underline"
              >
                <PaperClipIcon className="h-4 w-4" />
                Document attached
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
