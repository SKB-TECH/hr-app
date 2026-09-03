"use client";

import toast from "react-hot-toast";
import { useTranslations } from "next-intl";
import ConfirmDeleteDialog from "../shared/ConfirmDeleteDialog";
import { useRemoveCandidatePortfolio } from "@/core/hooks/candidate/use-remove-candidate-portfolio";
import type { CandidatePortfolio } from "@/core/types/candidate-portfolio";
import { ApiError } from "@/core/types/api";

interface DeletePortfolioDialogProps {
  portfolio: CandidatePortfolio | null;
  onOpenChange: (open: boolean) => void;
}

export default function DeletePortfolioDialog({ portfolio, onOpenChange }: DeletePortfolioDialogProps) {
  const t = useTranslations("candidateProfileSections");
  const removePortfolio = useRemoveCandidatePortfolio();

  const handleDelete = async () => {
    if (!portfolio || removePortfolio.isPending) return;
    try {
      await removePortfolio.mutateAsync(portfolio.id);
      toast.success(t("portfolio.toasts.removed"));
      onOpenChange(false);
    } catch (error) {
      const message = error instanceof ApiError ? error.message : t("portfolio.toasts.removeError");
      toast.error(message);
    }
  };

  return (
    <ConfirmDeleteDialog
      open={Boolean(portfolio)}
      onOpenChange={onOpenChange}
      isPending={removePortfolio.isPending}
      onConfirm={handleDelete}
      title={t("portfolio.deleteDialog.title")}
      description={
        portfolio ? (
          t.rich("portfolio.deleteDialog.descriptionWithName", {
            title: portfolio.title,
            bold: (chunks) => <span className="font-medium text-[#202430]">{chunks}</span>,
          })
        ) : (
          t("portfolio.deleteDialog.descriptionFallback")
        )
      }
    />
  );
}
