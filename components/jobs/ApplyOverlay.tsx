"use client";

import "./ApplyOverlay.css";
import { ApplyOverlayProps } from "../../types/form-types";
import { DEFAULT_JOB } from "../../data/form-data";
import OverlayHeader from "./OverlayHeader";
import OverlayForm from "./OverlayForm";
import OverlayFooter from "./OverlayFooter";

export default function ApplyOverlay({
  isOpen,
  onClose,
  job = DEFAULT_JOB,
}: ApplyOverlayProps) {
  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className="apply-overlay__backdrop" onClick={handleBackdropClick}>
      <div
        className="apply-overlay__modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="apply-modal-title"
      >
        <OverlayHeader job={job} onClose={onClose} />
        <OverlayForm company={job.company} />
        <OverlayFooter />
      </div>
    </div>
  );
}