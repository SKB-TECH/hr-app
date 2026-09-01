"use client";

import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SubmitButtonProps {
  isPending: boolean;
  label: string;
  pendingLabel?: string;
  className?: string;
}

export default function SubmitButton({ isPending, label, pendingLabel = "Saving...", className }: SubmitButtonProps) {
  return (
    <Button type="submit" disabled={isPending} className={className ?? "bg-brand text-white hover:bg-[#3730c4]"}>
      {isPending ? (
        <>
          <Loader2 className="mr-2 size-4 animate-spin" />
          {pendingLabel}
        </>
      ) : (
        label
      )}
    </Button>
  );
}
