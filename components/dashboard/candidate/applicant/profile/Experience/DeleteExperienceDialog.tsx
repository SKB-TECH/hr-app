"use client";

import toast from "react-hot-toast";
import ConfirmDeleteDialog from "../shared/ConfirmDeleteDialog";
import { useRemoveCandidateExperience } from "@/core/hooks/candidate/use-remove-candidate-experience";
import type { CandidateExperience } from "@/core/types/candidate-experience";
import { ApiError } from "@/core/types/api";

interface DeleteExperienceDialogProps {
  experience: CandidateExperience | null;
  onOpenChange: (open: boolean) => void;
}

export default function DeleteExperienceDialog({ experience, onOpenChange }: DeleteExperienceDialogProps) {
  const removeExperience = useRemoveCandidateExperience();

  const handleDelete = async () => {
    if (!experience || removeExperience.isPending) return;
    try {
      await removeExperience.mutateAsync(experience.id);
      toast.success("Experience removed successfully.");
      onOpenChange(false);
    } catch (error) {
      const message = error instanceof ApiError ? error.message : "Failed to remove experience. Please try again.";
      toast.error(message);
    }
  };

  return (
    <ConfirmDeleteDialog
      open={Boolean(experience)}
      onOpenChange={onOpenChange}
      isPending={removeExperience.isPending}
      onConfirm={handleDelete}
      title="Delete experience?"
      description={
        <>
          Are you sure you want to remove
          {experience ? <span className="font-medium text-[#202430]"> &ldquo;{experience.position}&rdquo;</span> : " this experience"} at{" "}
          {experience?.companyName}? This action cannot be undone.
        </>
      }
    />
  );
}
