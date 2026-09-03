"use client";

import { useState } from "react";
import { PlusIcon, XMarkIcon, SparklesIcon } from "@heroicons/react/24/outline";
import toast from "react-hot-toast";

import { useCandidateSkills } from "@/core/hooks/candidate/use-candidate-skills";
import { useRemoveCandidateSkill } from "@/core/hooks/candidate/use-remove-candidate-skill";
import SkillsModal from "./Skills/SkillsModal";
import { SectionSkeleton } from "./shared/Skeleton";
import { ApiError } from "@/core/types/api";

export default function SkillsSection() {
  const { data: skills = [], isLoading, isError } = useCandidateSkills();
  const removeSkill = useRemoveCandidateSkill();
  const [modalOpen, setModalOpen] = useState(false);

  const handleDetach = async (skillId: string, name: string) => {
    try {
      await removeSkill.mutateAsync(skillId);
      toast.success(`Removed ${name} from your skills.`);
    } catch (error) {
      toast.error(error instanceof ApiError ? error.message : "Failed to remove skill. Please try again.");
    }
  };

  return (
    <div className="bg-white border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-[18px] font-bold text-[#202430]">Skills</h2>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            aria-label="Add skills"
            className="cursor-pointer border border-gray-200 p-1.5"
          >
            <PlusIcon className="w-4 h-4 text-brand" />
          </button>
        </div>
      </div>

      {isLoading && <SectionSkeleton rows={1} />}

      {!isLoading && isError && (
        <p className="text-[14px] text-gray-500">
          We couldn&apos;t load your skills right now. Please refresh the page to try again.
        </p>
      )}

      {!isLoading && !isError && skills.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-2 py-6 text-center">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-50 text-brand">
            <SparklesIcon className="h-5 w-5" />
          </span>
          <p className="text-[15px] font-medium text-[#202430]">No skills added yet</p>
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="mt-1 cursor-pointer text-[14px] font-semibold text-brand hover:text-indigo-800 transition-colors"
          >
            Add Skills
          </button>
        </div>
      )}

      {!isLoading && !isError && skills.length > 0 && (
        <div className="flex flex-wrap gap-3">
          {skills.map((skill) => (
            <span
              key={skill.id}
              className="flex items-center gap-1.5 text-[13px] font-medium text-brand bg-indigo-50 px-4 py-2"
            >
              {skill.name}
              <button
                type="button"
                onClick={() => handleDetach(skill.skillId, skill.name)}
                aria-label={`Remove ${skill.name}`}
                className="cursor-pointer text-brand/70 hover:text-brand"
              >
                <XMarkIcon className="h-3.5 w-3.5" />
              </button>
            </span>
          ))}
        </div>
      )}

      <SkillsModal open={modalOpen} onOpenChange={setModalOpen} currentSkills={skills} />
    </div>
  );
}
