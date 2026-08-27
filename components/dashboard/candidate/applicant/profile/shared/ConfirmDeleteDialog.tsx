"use client";

import type { ReactNode } from "react";
import { AlertTriangle, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ConfirmDeleteDialogProps {
  open: boolean;
  title: string;
  description: ReactNode;
  isPending: boolean;
  onConfirm: () => void;
  onOpenChange: (open: boolean) => void;
  confirmLabel?: string;
  pendingLabel?: string;
}

export default function ConfirmDeleteDialog({
  open,
  title,
  description,
  isPending,
  onConfirm,
  onOpenChange,
  confirmLabel = "Delete",
  pendingLabel = "Deleting...",
}: ConfirmDeleteDialogProps) {
  return (
    <Dialog open={open} onOpenChange={(value) => !value && !isPending && onOpenChange(false)}>
      <DialogContent className="max-w-md rounded-lg border border-gray-200 bg-white p-6 shadow-xl">
        <div className="flex flex-col items-center gap-4 text-center sm:items-start sm:text-left">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-full border border-red-100 bg-red-50 text-[#FF6550]">
            <AlertTriangle size={24} />
          </div>

          <DialogHeader className="gap-1.5 p-0">
            <DialogTitle className="text-lg font-bold text-[#25324B]">{title}</DialogTitle>
            <DialogDescription className="text-sm leading-relaxed text-gray-500">{description}</DialogDescription>
          </DialogHeader>
        </div>

        <DialogFooter className="mt-6 flex-col-reverse gap-3 border-t-0 bg-transparent p-0 sm:flex-row sm:justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isPending}
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={onConfirm}
            disabled={isPending}
            className="w-full border-none bg-[#FF6550] text-white hover:bg-[#e0503c] sm:w-auto"
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" />
                {pendingLabel}
              </>
            ) : (
              confirmLabel
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
