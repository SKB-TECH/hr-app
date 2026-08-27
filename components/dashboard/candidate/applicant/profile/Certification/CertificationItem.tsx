"use client";

import { format, parseISO } from "date-fns";
import { PencilSquareIcon, TrashIcon, LinkIcon, PaperClipIcon } from "@heroicons/react/24/outline";
import type { CandidateCertification } from "@/core/types/candidate-certification";

interface CertificationItemProps {
  certification: CandidateCertification;
  isLast: boolean;
  onEdit: (certification: CandidateCertification) => void;
  onDelete: (certification: CandidateCertification) => void;
}

export default function CertificationItem({ certification, isLast, onEdit, onDelete }: CertificationItemProps) {
  const issueDate = (() => {
    try {
      return format(parseISO(certification.issueDate), "MMM yyyy");
    } catch {
      return certification.issueDate;
    }
  })();

  return (
    <div className={`sm:flex gap-4 ${!isLast ? "pb-6 mb-6 border-b border-gray-100" : ""}`}>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-[18px] font-bold text-[#202430]">{certification.name}</h3>
          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={() => onEdit(certification)}
              aria-label={`Edit ${certification.name}`}
              className="cursor-pointer border border-gray-200 p-1.5 hover:border-brand"
            >
              <PencilSquareIcon className="w-4 h-4 text-brand" />
            </button>
            <button
              type="button"
              onClick={() => onDelete(certification)}
              aria-label={`Delete ${certification.name}`}
              className="cursor-pointer border border-gray-200 p-1.5 hover:border-red-300"
            >
              <TrashIcon className="w-4 h-4 text-[#FF6550]" />
            </button>
          </div>
        </div>

        <p className="text-[16px] text-gray-500 mt-1">{certification.institution}</p>
        <p className="text-[16px] text-gray-400 mt-1">Issued {issueDate}</p>

        {certification.description && (
          <p className="text-[16px] text-gray-500 leading-relaxed mt-3">{certification.description}</p>
        )}

        {(certification.certificateUrl || certification.certificateFileUrl) && (
          <div className="mt-3 flex flex-wrap items-center gap-4">
            {certification.certificateUrl && (
              <a
                href={certification.certificateUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[14px] font-medium text-brand hover:underline"
              >
                <LinkIcon className="h-4 w-4" />
                View verification
              </a>
            )}
            {certification.certificateFileUrl && (
              <a
                href={certification.certificateFileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[14px] font-medium text-brand hover:underline"
              >
                <PaperClipIcon className="h-4 w-4" />
                Certificate attached
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
