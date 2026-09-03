"use client";

import toast from "react-hot-toast";
import ConfirmDeleteDialog from "../shared/ConfirmDeleteDialog";
import { useRemoveCandidateResume } from "@/core/hooks/candidate/use-remove-candidate-resume";
import type { CandidateResume } from "@/core/types/candidate-resume";
import { ApiError } from "@/core/types/api";

interface DeleteResumeDialogProps {
  resume: CandidateResume | null;
  onOpenChange: (open: boolean) => void;
}

export default function DeleteResumeDialog({ resume, onOpenChange }: DeleteResumeDialogProps) {
  const removeResume = useRemoveCandidateResume();

  const handleDelete = async () => {
    if (!resume || removeResume.isPending) return;
    try {
      await removeResume.mutateAsync(resume.id);
      toast.success("Resume removed successfully.");
      onOpenChange(false);
    } catch (error) {
      const message = error instanceof ApiError ? error.message : "Failed to remove resume. Please try again.";
      toast.error(message);
    }
  };

  return (
    <ConfirmDeleteDialog
      open={Boolean(resume)}
      onOpenChange={onOpenChange}
      isPending={removeResume.isPending}
      onConfirm={handleDelete}
      title="Delete resume?"
      description={
        <>
          Are you sure you want to remove
          {resume ? <span className="font-medium text-[#202430]"> &ldquo;{resume.fileName}&rdquo;</span> : " this resume"}? This action cannot
          be undone.
        </>
      }
    />
  );
}
