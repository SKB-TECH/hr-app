"use client";

import toast from "react-hot-toast";
import ConfirmDeleteDialog from "../shared/ConfirmDeleteDialog";
import { useRemoveCandidateCertification } from "@/core/hooks/candidate/use-remove-candidate-certification";
import type { CandidateCertification } from "@/core/types/candidate-certification";
import { ApiError } from "@/core/types/api";

interface DeleteCertificationDialogProps {
  certification: CandidateCertification | null;
  onOpenChange: (open: boolean) => void;
}

export default function DeleteCertificationDialog({ certification, onOpenChange }: DeleteCertificationDialogProps) {
  const removeCertification = useRemoveCandidateCertification();

  const handleDelete = async () => {
    if (!certification || removeCertification.isPending) return;
    try {
      await removeCertification.mutateAsync(certification.id);
      toast.success("Certification deleted successfully.");
      onOpenChange(false);
    } catch (error) {
      const message = error instanceof ApiError ? error.message : "Failed to delete certification. Please try again.";
      toast.error(message);
    }
  };

  return (
    <ConfirmDeleteDialog
      open={Boolean(certification)}
      onOpenChange={onOpenChange}
      isPending={removeCertification.isPending}
      onConfirm={handleDelete}
      title="Delete Certification?"
      description={
        <>
          Are you sure you want to delete
          {certification ? <span className="font-medium text-[#202430]"> &ldquo;{certification.name}&rdquo;</span> : " this certification"}? This
          action cannot be undone.
        </>
      }
    />
  );
}
