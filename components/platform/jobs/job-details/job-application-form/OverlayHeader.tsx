import Image from "next/image";
import type { CompanyJob } from "@/core/types/job";
import { humanizeEmploymentType } from "@/core/lib/format";

interface OverlayHeaderProps {
  job: CompanyJob;
  onClose: () => void;
}

export default function OverlayHeader({ job, onClose }: OverlayHeaderProps) {
  const companyLabel = job.companyName || job.title;

  return (
    <div className="apply-overlay__header">
      <div className="apply-overlay__job-info">
        <div className="apply-overlay__logo">
          {job.companyLogoUrl ? (
            <Image src={job.companyLogoUrl} alt={companyLabel} width={42} height={42} />
          ) : (
            <span>{companyLabel[0]}</span>
          )}
        </div>
        <div>
          <p className="apply-overlay__job-title" id="apply-modal-title">
            {job.title}
          </p>
          <p className="apply-overlay__job-meta">
            {job.companyName || "—"}
            <span className="apply-overlay__dot" />
            {job.location || "Remote"}
            <span className="apply-overlay__dot" />
            {job.employmentTypes[0] ? humanizeEmploymentType(job.employmentTypes[0]) : "—"}
          </p>
        </div>
      </div>
      <button className="apply-overlay__close" onClick={onClose} aria-label="Close">
        ✕
      </button>
    </div>
  );
}
