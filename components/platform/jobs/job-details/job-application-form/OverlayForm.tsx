"use client";

import { BASIC_FIELDS, LINK_FIELDS } from "../../../../../data/form-data";
import type { FormField } from "../../../../../types/form-types";
import type { ApplicationFormValues } from "./ApplyOverlay";
import type { CandidateResume } from "@/core/types/candidate-resume";

interface OverlayFormProps {
  company: string;
  values: ApplicationFormValues;
  onChange: (key: keyof ApplicationFormValues, value: string) => void;
  resumes: CandidateResume[];
  isLoadingResumes: boolean;
  resumeId?: string;
  onResumeChange: (id: string) => void;
  onUploadNewResume: () => void;
}

export default function OverlayForm({
  company,
  values,
  onChange,
  resumes,
  isLoadingResumes,
  resumeId,
  onResumeChange,
  onUploadNewResume,
}: OverlayFormProps) {
  return (
    <div className="apply-overlay__body">
      {/* Intro */}
      <div className="apply-overlay__intro">
        <h2 className="apply-overlay__intro-title">Submit your application</h2>
        <p className="apply-overlay__intro-sub">
          The following is required and will only be shared with {company}.
        </p>
      </div>

      <div className="apply-overlay__fields">
        {/* Basic fields */}
        {BASIC_FIELDS.map((field: FormField) => (
          <div key={field.key} className="apply-overlay__field">
            <label className="apply-overlay__label">{field.label}</label>
            <input
              type={field.type}
              className="apply-overlay__input"
              placeholder={field.placeholder}
              value={values[field.key as keyof ApplicationFormValues]}
              onChange={(e) => onChange(field.key as keyof ApplicationFormValues, e.target.value)}
            />
          </div>
        ))}

        {/* Links */}
        <div className="apply-overlay__section">
          <p className="apply-overlay__section-title">LINKS</p>
          {LINK_FIELDS.map((field: FormField) => (
            <div key={field.key} className="apply-overlay__field">
              <label className="apply-overlay__label">{field.label}</label>
              <input
                type={field.type}
                className="apply-overlay__input"
                placeholder={field.placeholder}
                value={values[field.key as keyof ApplicationFormValues]}
                onChange={(e) => onChange(field.key as keyof ApplicationFormValues, e.target.value)}
              />
            </div>
          ))}
        </div>

        {/* Additional information */}
        <div className="apply-overlay__field">
          <label className="apply-overlay__label">Additional information</label>
          <textarea
            className="apply-overlay__textarea"
            placeholder="Add a cover letter or anything else you want to share"
            maxLength={500}
            value={values.coverLetter}
            onChange={(e) => onChange("coverLetter", e.target.value)}
          />
          <div className="apply-overlay__textarea-footer">
            <div className="apply-overlay__toolbar">
              <button type="button" title="Bold">
                <b>B</b>
              </button>
              <button type="button" title="Italic">
                <i>I</i>
              </button>
              <button type="button" title="Underline">
                <u>U</u>
              </button>
              <button type="button" title="Ordered list">
                ≡
              </button>
              <button type="button" title="Link">
                🔗
              </button>
            </div>
            <span className="apply-overlay__char-count">{values.coverLetter.length} / 500</span>
          </div>
          <p className="apply-overlay__max-chars">Maximum 500 characters</p>
        </div>

        {/* Resume */}
        <div className="apply-overlay__resume">
          {isLoadingResumes ? (
            <span className="apply-overlay__resume-label">Loading resumes…</span>
          ) : resumes.length > 0 ? (
            <select
              className="apply-overlay__input"
              value={resumeId || ""}
              onChange={(e) => onResumeChange(e.target.value)}
            >
              <option value="" disabled>
                Select a resume
              </option>
              {resumes.map((resume) => (
                <option key={resume.id} value={resume.id}>
                  {resume.fileName}
                  {resume.isDefault ? " (Default)" : ""}
                </option>
              ))}
            </select>
          ) : (
            <span className="apply-overlay__resume-label">No resumes uploaded yet</span>
          )}
          <button type="button" className="apply-overlay__resume-btn" onClick={onUploadNewResume}>
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" />
            </svg>
            Attach Resume/CV
          </button>
        </div>
      </div>
    </div>
  );
}
