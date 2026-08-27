"use client";

import { AlertTriangle, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
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
    <Dialog open={Boolean(certification)} onOpenChange={(value) => !value && !removeCertification.isPending && onOpenChange(false)}>
      <DialogContent className="max-w-md rounded-lg border border-gray-200 bg-white p-6 shadow-xl">
        <div className="flex flex-col items-center gap-4 text-center sm:items-start sm:text-left">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-full border border-red-100 bg-red-50 text-[#FF6550]">
            <AlertTriangle size={24} />
          </div>

          <DialogHeader className="gap-1.5 p-0">
            <DialogTitle className="text-lg font-bold text-[#25324B]">Delete Certification?</DialogTitle>
            <DialogDescription className="text-sm leading-relaxed text-gray-500">
              Are you sure you want to delete
              {certification ? <span className="font-medium text-[#202430]"> &ldquo;{certification.name}&rdquo;</span> : " this certification"}?
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
        </div>

        <DialogFooter className="mt-6 flex-col-reverse gap-3 border-t-0 bg-transparent p-0 sm:flex-row sm:justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={removeCertification.isPending}
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleDelete}
            disabled={removeCertification.isPending}
            className="w-full border-none bg-[#FF6550] text-white hover:bg-[#e0503c] sm:w-auto"
          >
            {removeCertification.isPending ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" />
                Deleting...
              </>
            ) : (
              "Delete"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
