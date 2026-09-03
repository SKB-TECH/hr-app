"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { PlusIcon, BookOpenIcon } from "@heroicons/react/24/outline";

import { useCandidateEducations } from "@/core/hooks/candidate/use-candidate-educations";
import EducationItem from "./Education/EducationItem";
import EducationModal from "./Education/EducationModal";
import DeleteEducationDialog from "./Education/DeleteEducationDialog";
import { SectionSkeleton } from "./shared/Skeleton";
import type { CandidateEducation } from "@/core/types/candidate-education";

export default function EducationsSection() {
  const t = useTranslations("candidateProfileSections");
  const {
    data: educations = [],
    isLoading,
    isError,
  } = useCandidateEducations();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingEducation, setEditingEducation] =
    useState<CandidateEducation | null>(null);
  const [deletingEducation, setDeletingEducation] =
    useState<CandidateEducation | null>(null);

  const openAddModal = () => {
    setEditingEducation(null);
    setModalOpen(true);
  };

  const openEditModal = (education: CandidateEducation) => {
    setEditingEducation(education);
    setModalOpen(true);
  };

  return (
    <div className='bg-white border border-gray-200 p-6'>
      <div className='flex items-center justify-between mb-6'>
        <h2 className='text-[20px] font-bold text-[#25324B]'>{t("education.sectionTitle")}</h2>
        <button
          type='button'
          onClick={openAddModal}
          aria-label={t("education.addAriaLabel")}
          className='cursor-pointer border border-gray-200 p-1.5 hover:border-brand'
        >
          <PlusIcon className='w-4 h-4 text-brand' />
        </button>
      </div>

      {isLoading && <SectionSkeleton rows={2} />}

      {!isLoading && isError && (
        <p className='text-[14px] text-gray-500'>
          {t("education.loadError")}
        </p>
      )}

      {!isLoading && !isError && educations.length === 0 && (
        <div className='flex flex-col items-center justify-center gap-2 py-8 text-center'>
          <span className='flex h-10 w-10 items-center justify-center rounded-full bg-indigo-50 text-brand'>
            <BookOpenIcon className='h-5 w-5' />
          </span>
          <p className='text-[15px] font-medium text-[#202430]'>
            {t("education.emptyTitle")}
          </p>
          <p className='text-[14px] text-gray-500'>
            {t("education.emptyDescription")}
          </p>
          <button
            type='button'
            onClick={openAddModal}
            className='mt-2 cursor-pointer text-[14px] font-semibold text-brand hover:text-indigo-800 transition-colors'
          >
            {t("education.addButton")}
          </button>
        </div>
      )}

      {!isLoading && !isError && educations.length > 0 && (
        <div>
          {educations.map((education, index) => (
            <EducationItem
              key={education.id}
              education={education}
              isLast={index === educations.length - 1}
              onEdit={openEditModal}
              onDelete={setDeletingEducation}
            />
          ))}
        </div>
      )}

      <EducationModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        education={editingEducation}
      />

      <DeleteEducationDialog
        education={deletingEducation}
        onOpenChange={(open) => !open && setDeletingEducation(null)}
      />
    </div>
  );
}
