"use client";

import toast from "react-hot-toast";
import { useTranslations } from "next-intl";
import ConfirmDeleteDialog from "../shared/ConfirmDeleteDialog";
import { useRemoveCandidateResume } from "@/core/hooks/candidate/use-remove-candidate-resume";
import type { CandidateResume } from "@/core/types/candidate-resume";
import { ApiError } from "@/core/types/api";

interface DeleteResumeDialogProps {
  resume: CandidateResume | null;
  onOpenChange: (open: boolean) => void;
}

export default function DeleteResumeDialog({ resume, onOpenChange }: DeleteResumeDialogProps) {
  const t = useTranslations("candidateProfileSections");
  const removeResume = useRemoveCandidateResume();

  const handleDelete = async () => {
    if (!resume || removeResume.isPending) return;
    try {
      await removeResume.mutateAsync(resume.id);
      toast.success(t("resume.toasts.removed"));
      onOpenChange(false);
    } catch (error) {
      const message = error instanceof ApiError ? error.message : t("resume.toasts.removeError");
      toast.error(message);
    }
  };

  return (
    <ConfirmDeleteDialog
      open={Boolean(resume)}
      onOpenChange={onOpenChange}
      isPending={removeResume.isPending}
      onConfirm={handleDelete}
      title={t("resume.deleteDialog.title")}
      description={
        resume ? (
          t.rich("resume.deleteDialog.descriptionWithName", {
            fileName: resume.fileName,
            bold: (chunks) => <span className="font-medium text-[#202430]">{chunks}</span>,
          })
        ) : (
          t("resume.deleteDialog.descriptionFallback")
        )
      }
    />
  );
}
