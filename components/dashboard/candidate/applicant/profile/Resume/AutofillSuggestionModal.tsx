"use client";

import { useState } from "react";
import { SparklesIcon } from "@heroicons/react/24/outline";
import toast from "react-hot-toast";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useCandidateResumeSuggestion } from "@/core/hooks/ai/use-candidate-resume-suggestion";
import { useExtractCandidateResume } from "@/core/hooks/ai/use-extract-candidate-resume";
import { useDeleteCandidateResumeSuggestion } from "@/core/hooks/ai/use-delete-candidate-resume-suggestion";
import { ApiError } from "@/core/types/api";
import type { CandidateResume } from "@/core/types/candidate-resume";

interface AutofillSuggestionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  resume: CandidateResume | null;
}

function Field({ label, value }: { label: string; value?: string | null }) {
  if (!value) return null;
  return (
    <div>
      <p className="text-[12px] font-semibold uppercase tracking-wide text-gray-400">{label}</p>
      <p className="text-[14px] text-[#25324B]">{value}</p>
    </div>
  );
}

export default function AutofillSuggestionModal({ open, onOpenChange, resume }: AutofillSuggestionModalProps) {
  const [checked, setChecked] = useState(false);
  const resumeId = resume?.id || null;

  const { data: suggestion, isLoading, isError, refetch } = useCandidateResumeSuggestion(resumeId, open && checked);
  const extract = useExtractCandidateResume();
  const discard = useDeleteCandidateResumeSuggestion();

  const handleOpenChange = (value: boolean) => {
    if (!value) setChecked(false);
    onOpenChange(value);
  };

  const handleCheckExisting = () => {
    setChecked(true);
    void refetch();
  };

  const handleGenerate = async () => {
    if (!resumeId) return;
    try {
      await extract.mutateAsync(resumeId);
      setChecked(true);
      toast.success("Suggestions generated from your resume.");
    } catch (error) {
      toast.error(error instanceof ApiError ? error.message : "Couldn't generate suggestions. Please try again.");
    }
  };

  const handleDiscard = async () => {
    if (!resumeId) return;
    try {
      await discard.mutateAsync(resumeId);
      toast.success("Suggestion discarded.");
      onOpenChange(false);
    } catch (error) {
      toast.error(error instanceof ApiError ? error.message : "Couldn't discard the suggestion. Please try again.");
    }
  };

  const hasSuggestion = checked && !isLoading && !isError && suggestion;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-lg gap-0 rounded-xl p-0 sm:max-w-lg">
        <div className="max-h-[85vh] overflow-y-auto p-6">
          <DialogHeader className="mb-1 gap-1.5">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-brand">
                <SparklesIcon className="h-5 w-5" />
              </span>
              <DialogTitle className="text-[20px] font-bold text-[#25324B]">Autofill from CV</DialogTitle>
            </div>
            <DialogDescription className="text-[14px] text-gray-500">
              We&apos;ll read {resume?.fileName || "this resume"} and propose profile details for you to review. Nothing is
              added to your profile automatically.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-5 space-y-4">
            {!checked && (
              <Button type="button" onClick={handleCheckExisting} className="w-full bg-brand text-white hover:bg-[#3730c4]">
                Check for an existing suggestion
              </Button>
            )}

            {checked && isLoading && <p className="text-[14px] text-gray-500">Checking…</p>}

            {checked && !isLoading && isError && (
              <div className="space-y-3">
                <p className="text-[14px] text-gray-500">No suggestion found yet for this resume.</p>
                <Button
                  type="button"
                  onClick={handleGenerate}
                  disabled={extract.isPending}
                  className="w-full bg-brand text-white hover:bg-[#3730c4]"
                >
                  {extract.isPending ? "Generating…" : "Generate Suggestions"}
                </Button>
              </div>
            )}

            {hasSuggestion && (
              <div className="space-y-4">
                <Field label="Headline" value={suggestion.headline} />
                <Field label="Bio" value={suggestion.bio} />

                {suggestion.skills && suggestion.skills.length > 0 && (
                  <div>
                    <p className="mb-1.5 text-[12px] font-semibold uppercase tracking-wide text-gray-400">Skills</p>
                    <div className="flex flex-wrap gap-2">
                      {suggestion.skills.map((skill) => (
                        <span key={skill} className="rounded-full bg-indigo-50 px-3 py-1 text-[13px] font-medium text-brand">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {suggestion.experiences && suggestion.experiences.length > 0 && (
                  <div>
                    <p className="mb-1.5 text-[12px] font-semibold uppercase tracking-wide text-gray-400">Experience</p>
                    <div className="space-y-2">
                      {suggestion.experiences.map((experience, index) => (
                        <div key={index} className="rounded-lg border border-gray-100 p-3">
                          <p className="text-[14px] font-semibold text-[#25324B]">{experience.position || "—"}</p>
                          <p className="text-[13px] text-gray-500">{experience.companyName || "—"}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {suggestion.educations && suggestion.educations.length > 0 && (
                  <div>
                    <p className="mb-1.5 text-[12px] font-semibold uppercase tracking-wide text-gray-400">Education</p>
                    <div className="space-y-2">
                      {suggestion.educations.map((education, index) => (
                        <div key={index} className="rounded-lg border border-gray-100 p-3">
                          <p className="text-[14px] font-semibold text-[#25324B]">{education.schoolName || "—"}</p>
                          <p className="text-[13px] text-gray-500">{education.degree || "—"}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {suggestion.certifications && suggestion.certifications.length > 0 && (
                  <div>
                    <p className="mb-1.5 text-[12px] font-semibold uppercase tracking-wide text-gray-400">Certifications</p>
                    <div className="space-y-2">
                      {suggestion.certifications.map((certification, index) => (
                        <div key={index} className="rounded-lg border border-gray-100 p-3">
                          <p className="text-[14px] font-semibold text-[#25324B]">{certification.name || "—"}</p>
                          <p className="text-[13px] text-gray-500">{certification.issuingOrganization || "—"}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <p className="text-[12px] text-gray-400">
                  Copy the details you want into the matching profile sections yourself, or discard this suggestion.
                </p>
              </div>
            )}
          </div>

          <DialogFooter className="-mx-6 -mb-6 mt-5 rounded-b-xl border-t border-gray-100 bg-gray-50/60 px-6 py-4">
            <Button type="button" variant="outline" onClick={() => handleOpenChange(false)}>
              Close
            </Button>
            {hasSuggestion && (
              <Button
                type="button"
                onClick={handleDiscard}
                disabled={discard.isPending}
                className="border-none bg-[#FF6550] text-white hover:bg-[#e0503c]"
              >
                {discard.isPending ? "Discarding..." : "Discard Suggestion"}
              </Button>
            )}
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
