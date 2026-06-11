import Image from "next/image";
import { JobInfo } from "../../../../../types/form-types";

interface OverlayHeaderProps {
  job: JobInfo;
  onClose: () => void;
}

export default function OverlayHeader({ job, onClose }: OverlayHeaderProps) {
  return (
    <div className="apply-overlay__header">
      <div className="apply-overlay__job-info">
        <div className="apply-overlay__logo">
          {job.logo ? (
            <Image src={job.logo} alt={job.company} width={42} height={42} />
          ) : (
            <span>{job.company[0]}</span>
          )}
        </div>
        <div>
          <p className="apply-overlay__job-title" id="apply-modal-title">
            {job.title}
          </p>
          <p className="apply-overlay__job-meta">
            {job.company}
            <span className="apply-overlay__dot" />
            {job.location}
            <span className="apply-overlay__dot" />
            {job.type}
          </p>
        </div>
      </div>
      <button
        className="apply-overlay__close"
        onClick={onClose}
        aria-label="Close"
      >
        ✕
      </button>
    </div>
  );
}
