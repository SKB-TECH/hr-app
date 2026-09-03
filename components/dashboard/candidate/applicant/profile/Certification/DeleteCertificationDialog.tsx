"use client";

import toast from "react-hot-toast";
import { useTranslations } from "next-intl";
import ConfirmDeleteDialog from "../shared/ConfirmDeleteDialog";
import { useRemoveCandidateCertification } from "@/core/hooks/candidate/use-remove-candidate-certification";
import type { CandidateCertification } from "@/core/types/candidate-certification";
import { ApiError } from "@/core/types/api";

interface DeleteCertificationDialogProps {
  certification: CandidateCertification | null;
  onOpenChange: (open: boolean) => void;
}

export default function DeleteCertificationDialog({ certification, onOpenChange }: DeleteCertificationDialogProps) {
  const t = useTranslations("candidateProfileSections");
  const removeCertification = useRemoveCandidateCertification();

  const handleDelete = async () => {
    if (!certification || removeCertification.isPending) return;
    try {
      await removeCertification.mutateAsync(certification.id);
      toast.success(t("certification.toasts.deleted"));
      onOpenChange(false);
    } catch (error) {
      const message = error instanceof ApiError ? error.message : t("certification.toasts.deleteError");
      toast.error(message);
    }
  };

  return (
    <ConfirmDeleteDialog
      open={Boolean(certification)}
      onOpenChange={onOpenChange}
      isPending={removeCertification.isPending}
      onConfirm={handleDelete}
      title={t("certification.deleteDialog.title")}
      description={
        certification ? (
          t.rich("certification.deleteDialog.descriptionWithName", {
            title: certification.title,
            bold: (chunks) => <span className="font-medium text-[#202430]">{chunks}</span>,
          })
        ) : (
          t("certification.deleteDialog.descriptionFallback")
        )
      }
    />
  );
}
