"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  PlusIcon,
  BriefcaseIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";

import { useMyCandidateProfile } from "@/core/hooks/candidate/use-my-candidate-profile";
import { useCandidateExperiences } from "@/core/hooks/candidate/use-candidate-experiences";
import { SectionSkeleton } from "./shared/Skeleton";
import ExperienceItem from "./Experience/ExperienceItem";
import ExperienceModal from "./Experience/ExperienceModal";
import DeleteExperienceDialog from "./Experience/DeleteExperienceDialog";
import EditWorkPreferencesModal from "./Profile/EditWorkPreferencesModal";
import {
  WORK_TYPE_OPTIONS,
  AVAILABILITY_OPTIONS,
  optionLabel,
} from "./Profile/candidate-profile-options";
import type { CandidateExperience } from "@/core/types/candidate-experience";

export default function ExperiencesSection() {
  const t = useTranslations("candidateProfileSections");
  const { data: profile } = useMyCandidateProfile();
  const {
    data: experiences = [],
    isLoading,
    isError,
  } = useCandidateExperiences();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingExperience, setEditingExperience] =
    useState<CandidateExperience | null>(null);
  const [deletingExperience, setDeletingExperience] =
    useState<CandidateExperience | null>(null);
  const [preferencesOpen, setPreferencesOpen] = useState(false);

  const openAddModal = () => {
    setEditingExperience(null);
    setModalOpen(true);
  };

  const openEditModal = (experience: CandidateExperience) => {
    setEditingExperience(experience);
    setModalOpen(true);
  };

  const details = profile?.candidateProfile;
  const workTypeLabel = optionLabel(
    WORK_TYPE_OPTIONS,
    details?.workType ?? null,
  );
  const availabilityLabel = optionLabel(
    AVAILABILITY_OPTIONS,
    details?.availability ?? null,
  );

  const preferenceChips = [
    details?.yearsExperience != null
      ? t("experience.yearsExperience", { count: details.yearsExperience })
      : null,
    workTypeLabel,
    availabilityLabel,
  ].filter(Boolean) as string[];

  return (
    <div className='bg-white border border-gray-200 p-6'>
      <div className='flex items-center justify-between mb-3'>
        <h2 className='text-[20px] font-bold text-[#25324B]'>{t("experience.sectionTitle")}</h2>
        <button
          type='button'
          onClick={openAddModal}
          aria-label={t("experience.addAriaLabel")}
          className='cursor-pointer border border-gray-200 p-1.5 hover:border-brand'
        >
          <PlusIcon className='w-4 h-4 text-brand' />
        </button>
      </div>

      {profile && (
        <div className='mb-6 flex flex-wrap items-center gap-2'>
          {preferenceChips.map((chip) => (
            <span
              key={chip}
              className='rounded-full bg-indigo-50 px-3 py-1 text-[12px] font-medium text-brand'
            >
              {chip}
            </span>
          ))}
          <button
            type='button'
            onClick={() => setPreferencesOpen(true)}
            aria-label={t("experience.editWorkPreferencesAriaLabel")}
            className='inline-flex cursor-pointer items-center gap-1 text-[12px] font-medium text-gray-400 hover:text-brand'
          >
            <PencilSquareIcon className='h-3.5 w-3.5' />
            {preferenceChips.length > 0
              ? t("experience.editPreferences")
              : t("experience.addWorkPreferences")}
          </button>
        </div>
      )}

      {isLoading && <SectionSkeleton rows={2} />}

      {!isLoading && isError && (
        <p className='text-[14px] text-gray-500'>
          {t("experience.loadError")}
        </p>
      )}

      {!isLoading && !isError && experiences.length === 0 && (
        <div className='flex flex-col items-center justify-center gap-2 py-8 text-center'>
          <span className='flex h-10 w-10 items-center justify-center rounded-full bg-indigo-50 text-brand'>
            <BriefcaseIcon className='h-5 w-5' />
          </span>
          <p className='text-[15px] font-medium text-[#202430]'>
            {t("experience.emptyTitle")}
          </p>
          <p className='text-[14px] text-gray-500'>
            {t("experience.emptyDescription")}
          </p>
          <button
            type='button'
            onClick={openAddModal}
            className='mt-2 cursor-pointer text-[14px] font-semibold text-brand hover:text-indigo-800 transition-colors'
          >
            {t("experience.addButton")}
          </button>
        </div>
      )}

      {!isLoading && !isError && experiences.length === 0 && (
        <button
          type='button'
          onClick={openAddModal}
          className='mt-2 cursor-pointer text-[14px] font-semibold text-brand hover:text-indigo-800 transition-colors'
        >
          {t("experience.addButton")}
        </button>
      )}

      {!isLoading && !isError && experiences.length > 0 && (
        <div>
          {experiences.map((experience, index) => (
            <ExperienceItem
              key={experience.id}
              experience={experience}
              isLast={index === experiences.length - 1}
              onEdit={openEditModal}
              onDelete={setDeletingExperience}
            />
          ))}
        </div>
      )}

      <ExperienceModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        experience={editingExperience}
      />

      <DeleteExperienceDialog
        experience={deletingExperience}
        onOpenChange={(open) => !open && setDeletingExperience(null)}
      />

      {profile && (
        <EditWorkPreferencesModal
          open={preferencesOpen}
          onOpenChange={setPreferencesOpen}
          profile={profile}
        />
      )}
    </div>
  );
}
