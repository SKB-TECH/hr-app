"use client";

import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

interface SubmitButtonProps {
  isPending: boolean;
  label: string;
  pendingLabel?: string;
  className?: string;
}

export default function SubmitButton({ isPending, label, pendingLabel, className }: SubmitButtonProps) {
  const t = useTranslations("candidateProfileCore.shared.submitButton");
  const resolvedPendingLabel = pendingLabel ?? t("defaultPendingLabel");
  return (
    <Button type="submit" disabled={isPending} className={className ?? "bg-brand text-white hover:bg-[#3730c4]"}>
      {isPending ? (
        <>
          <Loader2 className="mr-2 size-4 animate-spin" />
          {resolvedPendingLabel}
        </>
      ) : (
        label
      )}
    </Button>
  );
}
