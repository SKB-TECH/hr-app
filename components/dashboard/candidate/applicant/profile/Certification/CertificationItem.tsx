"use client";

import { format, parseISO } from "date-fns";
import { PencilSquareIcon, TrashIcon, LinkIcon } from "@heroicons/react/24/outline";
import type { CandidateCertification } from "@/core/types/candidate-certification";

interface CertificationItemProps {
  certification: CandidateCertification;
  isLast: boolean;
  onEdit: (certification: CandidateCertification) => void;
  onDelete: (certification: CandidateCertification) => void;
}

function formatCertificationDate(value: string) {
  try {
    return format(parseISO(value), "MMM yyyy");
  } catch {
    return value;
  }
}

export default function CertificationItem({ certification, isLast, onEdit, onDelete }: CertificationItemProps) {
  const issueDate = formatCertificationDate(certification.issueDate);
  const expirationDate = certification.expirationDate ? formatCertificationDate(certification.expirationDate) : null;

  return (
    <div className={`sm:flex gap-4 ${!isLast ? "pb-6 mb-6 border-b border-gray-100" : ""}`}>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-[18px] font-bold text-[#202430]">{certification.title}</h3>
          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={() => onEdit(certification)}
              aria-label={`Edit ${certification.title}`}
              className="cursor-pointer border border-gray-200 p-1.5 hover:border-brand"
            >
              <PencilSquareIcon className="w-4 h-4 text-brand" />
            </button>
            <button
              type="button"
              onClick={() => onDelete(certification)}
              aria-label={`Delete ${certification.title}`}
              className="cursor-pointer border border-gray-200 p-1.5 hover:border-red-300"
            >
              <TrashIcon className="w-4 h-4 text-[#FF6550]" />
            </button>
          </div>
        </div>

        <p className="text-[16px] text-gray-500 mt-1">{certification.organization}</p>
        <p className="text-[16px] text-gray-400 mt-1">
          Issued {issueDate}
          {expirationDate && <span> · Expires {expirationDate}</span>}
        </p>
        {certification.credentialId && (
          <p className="text-[14px] text-gray-400 mt-1">Credential ID: {certification.credentialId}</p>
        )}

        {certification.credentialUrl && (
          <div className="mt-3 flex flex-wrap items-center gap-4">
            <a
              href={certification.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[14px] font-medium text-brand hover:underline"
            >
              <LinkIcon className="h-4 w-4" />
              View credential
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
