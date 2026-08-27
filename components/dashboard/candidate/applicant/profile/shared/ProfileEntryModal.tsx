"use client";

import type { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface ProfileEntryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  icon: ReactNode;
  title: string;
  description: string;
  isPending: boolean;
  children: ReactNode;
}

export default function ProfileEntryModal({
  open,
  onOpenChange,
  icon,
  title,
  description,
  isPending,
  children,
}: ProfileEntryModalProps) {
  return (
    <Dialog open={open} onOpenChange={(value) => !value && !isPending && onOpenChange(false)}>
      <DialogContent className="max-w-lg gap-0 rounded-xl p-0 sm:max-w-lg">
        <div className="max-h-[85vh] overflow-y-auto p-6">
          <DialogHeader className="mb-1 gap-1.5">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-brand">
                {icon}
              </span>
              <DialogTitle className="text-[20px] font-bold text-[#25324B]">{title}</DialogTitle>
            </div>
            <DialogDescription className="text-[14px] text-gray-500">{description}</DialogDescription>
          </DialogHeader>

          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
}
