"use client";

import toast from "react-hot-toast";
import ConfirmDeleteDialog from "../shared/ConfirmDeleteDialog";
import { useRemoveCandidateEducation } from "@/core/hooks/candidate/use-remove-candidate-education";
import type { CandidateEducation } from "@/core/types/candidate-education";
import { ApiError } from "@/core/types/api";

interface DeleteEducationDialogProps {
  education: CandidateEducation | null;
  onOpenChange: (open: boolean) => void;
}

export default function DeleteEducationDialog({ education, onOpenChange }: DeleteEducationDialogProps) {
  const removeEducation = useRemoveCandidateEducation();

  const handleDelete = async () => {
    if (!education || removeEducation.isPending) return;
    try {
      await removeEducation.mutateAsync(education.id);
      toast.success("Education removed successfully.");
      onOpenChange(false);
    } catch (error) {
      const message = error instanceof ApiError ? error.message : "Failed to remove education. Please try again.";
      toast.error(message);
    }
  };

  return (
    <ConfirmDeleteDialog
      open={Boolean(education)}
      onOpenChange={onOpenChange}
      isPending={removeEducation.isPending}
      onConfirm={handleDelete}
      title="Delete education?"
      description={
        <>
          Are you sure you want to remove
          {education ? <span className="font-medium text-[#202430]"> &ldquo;{education.institution}&rdquo;</span> : " this education record"}?
          This action cannot be undone.
        </>
      }
    />
  );
}
