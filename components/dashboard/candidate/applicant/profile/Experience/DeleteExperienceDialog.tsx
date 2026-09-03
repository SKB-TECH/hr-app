"use client";

import toast from "react-hot-toast";
import { useTranslations } from "next-intl";
import ConfirmDeleteDialog from "../shared/ConfirmDeleteDialog";
import { useRemoveCandidateExperience } from "@/core/hooks/candidate/use-remove-candidate-experience";
import type { CandidateExperience } from "@/core/types/candidate-experience";
import { ApiError } from "@/core/types/api";

interface DeleteExperienceDialogProps {
  experience: CandidateExperience | null;
  onOpenChange: (open: boolean) => void;
}

export default function DeleteExperienceDialog({ experience, onOpenChange }: DeleteExperienceDialogProps) {
  const t = useTranslations("candidateProfileSections");
  const removeExperience = useRemoveCandidateExperience();

  const handleDelete = async () => {
    if (!experience || removeExperience.isPending) return;
    try {
      await removeExperience.mutateAsync(experience.id);
      toast.success(t("experience.toasts.removed"));
      onOpenChange(false);
    } catch (error) {
      const message = error instanceof ApiError ? error.message : t("experience.toasts.removeError");
      toast.error(message);
    }
  };

  return (
    <ConfirmDeleteDialog
      open={Boolean(experience)}
      onOpenChange={onOpenChange}
      isPending={removeExperience.isPending}
      onConfirm={handleDelete}
      title={t("experience.deleteDialog.title")}
      description={
        experience ? (
          t.rich("experience.deleteDialog.descriptionWithName", {
            position: experience.position,
            companyName: experience.companyName,
            bold: (chunks) => <span className="font-medium text-[#202430]">{chunks}</span>,
          })
        ) : (
          t("experience.deleteDialog.descriptionFallback")
        )
      }
    />
  );
}
