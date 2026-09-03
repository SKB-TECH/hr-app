"use client";

import toast from "react-hot-toast";
import { useTranslations } from "next-intl";
import ConfirmDeleteDialog from "../shared/ConfirmDeleteDialog";
import { useRemoveCandidateEducation } from "@/core/hooks/candidate/use-remove-candidate-education";
import type { CandidateEducation } from "@/core/types/candidate-education";
import { ApiError } from "@/core/types/api";

interface DeleteEducationDialogProps {
  education: CandidateEducation | null;
  onOpenChange: (open: boolean) => void;
}

export default function DeleteEducationDialog({ education, onOpenChange }: DeleteEducationDialogProps) {
  const t = useTranslations("candidateProfileSections");
  const removeEducation = useRemoveCandidateEducation();

  const handleDelete = async () => {
    if (!education || removeEducation.isPending) return;
    try {
      await removeEducation.mutateAsync(education.id);
      toast.success(t("education.toasts.removed"));
      onOpenChange(false);
    } catch (error) {
      const message = error instanceof ApiError ? error.message : t("education.toasts.removeError");
      toast.error(message);
    }
  };

  return (
    <ConfirmDeleteDialog
      open={Boolean(education)}
      onOpenChange={onOpenChange}
      isPending={removeEducation.isPending}
      onConfirm={handleDelete}
      title={t("education.deleteDialog.title")}
      description={
        education ? (
          t.rich("education.deleteDialog.descriptionWithName", {
            schoolName: education.schoolName,
            bold: (chunks) => <span className="font-medium text-[#202430]">{chunks}</span>,
          })
        ) : (
          t("education.deleteDialog.descriptionFallback")
        )
      }
    />
  );
}
