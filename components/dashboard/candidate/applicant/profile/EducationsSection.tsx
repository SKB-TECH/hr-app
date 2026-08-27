"use client";

import { useState } from "react";
import { PlusIcon, BookOpenIcon } from "@heroicons/react/24/outline";

import { useCandidateEducations } from "@/core/hooks/candidate/use-candidate-educations";
import EducationItem from "./Education/EducationItem";
import EducationModal from "./Education/EducationModal";
import DeleteEducationDialog from "./Education/DeleteEducationDialog";
import type { CandidateEducation } from "@/core/types/candidate-education";

export default function EducationsSection() {
  const { data: educations = [], isLoading, isError } = useCandidateEducations();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingEducation, setEditingEducation] = useState<CandidateEducation | null>(null);
  const [deletingEducation, setDeletingEducation] = useState<CandidateEducation | null>(null);

  const openAddModal = () => {
    setEditingEducation(null);
    setModalOpen(true);
  };

  const openEditModal = (education: CandidateEducation) => {
    setEditingEducation(education);
    setModalOpen(true);
  };

  return (
    <div className="bg-white border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-[20px] font-bold text-[#25324B]">Educations</h2>
        <button
          type="button"
          onClick={openAddModal}
          aria-label="Add education"
          className="cursor-pointer border border-gray-200 p-1.5 hover:border-brand"
        >
          <PlusIcon className="w-4 h-4 text-brand" />
        </button>
      </div>

      {isLoading && (
        <div className="space-y-4" aria-live="polite" aria-busy="true">
          {[0, 1].map((key) => (
            <div key={key} className="animate-pulse">
              <div className="h-4 w-1/3 rounded bg-gray-100" />
              <div className="mt-2 h-3 w-1/4 rounded bg-gray-100" />
              <div className="mt-2 h-3 w-1/5 rounded bg-gray-100" />
            </div>
          ))}
        </div>
      )}

      {!isLoading && isError && (
        <p className="text-[14px] text-gray-500">
          We couldn&apos;t load your education history right now. Please refresh the page to try again.
        </p>
      )}

      {!isLoading && !isError && educations.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-2 py-8 text-center">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-50 text-brand">
            <BookOpenIcon className="h-5 w-5" />
          </span>
          <p className="text-[15px] font-medium text-[#202430]">Add your education</p>
          <p className="text-[14px] text-gray-500">
            Show employers your academic background and qualifications by adding your education history.
          </p>
          <button
            type="button"
            onClick={openAddModal}
            className="mt-2 cursor-pointer text-[14px] font-semibold text-brand hover:text-indigo-800 transition-colors"
          >
            + Add Education
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

      <EducationModal open={modalOpen} onOpenChange={setModalOpen} education={editingEducation} />
      <DeleteEducationDialog education={deletingEducation} onOpenChange={(open) => !open && setDeletingEducation(null)} />
    </div>
  );
}
