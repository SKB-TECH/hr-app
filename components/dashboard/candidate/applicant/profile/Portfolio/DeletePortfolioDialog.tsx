"use client";

import toast from "react-hot-toast";
import ConfirmDeleteDialog from "../shared/ConfirmDeleteDialog";
import { useRemoveCandidatePortfolio } from "@/core/hooks/candidate/use-remove-candidate-portfolio";
import type { CandidatePortfolio } from "@/core/types/candidate-portfolio";
import { ApiError } from "@/core/types/api";

interface DeletePortfolioDialogProps {
  portfolio: CandidatePortfolio | null;
  onOpenChange: (open: boolean) => void;
}

export default function DeletePortfolioDialog({ portfolio, onOpenChange }: DeletePortfolioDialogProps) {
  const removePortfolio = useRemoveCandidatePortfolio();

  const handleDelete = async () => {
    if (!portfolio || removePortfolio.isPending) return;
    try {
      await removePortfolio.mutateAsync(portfolio.id);
      toast.success("Project removed successfully.");
      onOpenChange(false);
    } catch (error) {
      const message = error instanceof ApiError ? error.message : "Failed to remove project. Please try again.";
      toast.error(message);
    }
  };

  return (
    <ConfirmDeleteDialog
      open={Boolean(portfolio)}
      onOpenChange={onOpenChange}
      isPending={removePortfolio.isPending}
      onConfirm={handleDelete}
      title="Delete project?"
      description={
        <>
          Are you sure you want to remove
          {portfolio ? <span className="font-medium text-[#202430]"> &ldquo;{portfolio.title}&rdquo;</span> : " this project"}? This action
          cannot be undone.
        </>
      }
    />
  );
}
