"use client";

import { useState, useRef } from "react";
import { BASIC_FIELDS, LINK_FIELDS } from "../../../../../data/form-data";
import { FormField } from "../../../../../types/form-types";

interface OverlayFormProps {
  company: string;
}

export default function OverlayForm({ company }: OverlayFormProps) {
  const [charCount, setCharCount] = useState(0);
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setFileName(file.name);
  };

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
          <div key={field.label} className="apply-overlay__field">
            <label className="apply-overlay__label">{field.label}</label>
            <input
              type={field.type}
              className="apply-overlay__input"
              placeholder={field.placeholder}
            />
          </div>
        ))}

        {/* Links */}
        <div className="apply-overlay__section">
          <p className="apply-overlay__section-title">LINKS</p>
          {LINK_FIELDS.map((field: FormField) => (
            <div key={field.label} className="apply-overlay__field">
              <label className="apply-overlay__label">{field.label}</label>
              <input
                type={field.type}
                className="apply-overlay__input"
                placeholder={field.placeholder}
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
            onChange={(e) => setCharCount(e.target.value.length)}
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
            <span className="apply-overlay__char-count">{charCount} / 500</span>
          </div>
          <p className="apply-overlay__max-chars">Maximum 500 characters</p>
        </div>

        {/* Resume */}
        <div className="apply-overlay__resume">
          <span className="apply-overlay__resume-label">
            {fileName ?? "Attach your resume"}
          </span>
          <button
            type="button"
            className="apply-overlay__resume-btn"
            onClick={() => fileInputRef.current?.click()}
          >
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
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.doc,.docx"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </div>
      </div>
    </div>
  );
}
