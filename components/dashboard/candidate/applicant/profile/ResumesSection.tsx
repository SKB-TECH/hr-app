"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { PlusIcon, DocumentPlusIcon } from "@heroicons/react/24/outline";

import { useCandidateResumes } from "@/core/hooks/candidate/use-candidate-resumes";
import { SectionSkeleton } from "./shared/Skeleton";
import ResumeItem from "./Resume/ResumeItem";
import ResumeModal from "./Resume/ResumeModal";
import DeleteResumeDialog from "./Resume/DeleteResumeDialog";
import AutofillSuggestionModal from "./Resume/AutofillSuggestionModal";
import type { CandidateResume } from "@/core/types/candidate-resume";

export default function ResumesSection() {
  const t = useTranslations("candidateProfileSections");
  const { data: resumes = [], isLoading, isError } = useCandidateResumes();

  const [modalOpen, setModalOpen] = useState(false);
  const [deletingResume, setDeletingResume] = useState<CandidateResume | null>(null);
  const [autofillResume, setAutofillResume] = useState<CandidateResume | null>(null);

  return (
    <div className="bg-white border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-[20px] font-bold text-[#25324B]">{t("resume.sectionTitle")}</h2>
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          aria-label={t("resume.uploadAriaLabel")}
          className="cursor-pointer border border-gray-200 p-1.5 hover:border-brand"
        >
          <PlusIcon className="w-4 h-4 text-brand" />
        </button>
      </div>

      {isLoading && <SectionSkeleton rows={2} />}

      {!isLoading && isError && (
        <p className="text-[14px] text-gray-500">
          {t("resume.loadError")}
        </p>
      )}

      {!isLoading && !isError && resumes.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-2 py-8 text-center">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-50 text-brand">
            <DocumentPlusIcon className="h-5 w-5" />
          </span>
          <p className="text-[15px] font-medium text-[#202430]">{t("resume.emptyTitle")}</p>
          <p className="text-[14px] text-gray-500">{t("resume.emptyDescription")}</p>
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="mt-2 cursor-pointer text-[14px] font-semibold text-brand hover:text-indigo-800 transition-colors"
          >
            {t("resume.uploadButton")}
          </button>
        </div>
      )}

      {!isLoading && !isError && resumes.length > 0 && (
        <div>
          {resumes.map((resume, index) => (
            <ResumeItem
              key={resume.id}
              resume={resume}
              isLast={index === resumes.length - 1}
              onDelete={setDeletingResume}
              onAutofill={setAutofillResume}
            />
          ))}
        </div>
      )}

      <ResumeModal open={modalOpen} onOpenChange={setModalOpen} />
      <DeleteResumeDialog resume={deletingResume} onOpenChange={(open) => !open && setDeletingResume(null)} />
      <AutofillSuggestionModal
        open={Boolean(autofillResume)}
        onOpenChange={(open) => !open && setAutofillResume(null)}
        resume={autofillResume}
      />
    </div>
  );
}
