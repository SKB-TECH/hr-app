"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
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
import { useRequestPhoneVerification } from "@/core/hooks/candidate/use-request-phone-verification";
import { useConfirmPhoneVerification } from "@/core/hooks/candidate/use-confirm-phone-verification";
import { ApiError } from "@/core/types/api";

interface PhoneVerificationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  phoneNumber: string;
  onVerified: (phoneNumber: string) => void;
}

type Step = "send" | "confirm";

export default function PhoneVerificationDialog({
  open,
  onOpenChange,
  phoneNumber,
  onVerified,
}: PhoneVerificationDialogProps) {
  const t = useTranslations("candidateSettings.profile.phoneVerification");
  const [step, setStep] = useState<Step>("send");
  const [otp, setOtp] = useState("");
  const requestVerification = useRequestPhoneVerification();
  const confirmVerification = useConfirmPhoneVerification();
  const isPending = requestVerification.isPending || confirmVerification.isPending;

  const reset = () => {
    setStep("send");
    setOtp("");
  };

  const handleOpenChange = (value: boolean) => {
    if (isPending) return;
    if (!value) reset();
    onOpenChange(value);
  };

  const handleSendCode = async () => {
    try {
      await requestVerification.mutateAsync({ phoneNumber });
      setStep("confirm");
      toast.success(t("codeSent"));
    } catch (error) {
      toast.error(error instanceof ApiError ? error.message : t("genericError"));
    }
  };

  const handleConfirm = async () => {
    try {
      await confirmVerification.mutateAsync({ phoneNumber, otp });
      toast.success(t("verified"));
      onVerified(phoneNumber);
      handleOpenChange(false);
    } catch (error) {
      toast.error(error instanceof ApiError ? error.message : t("invalidCode"));
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="rounded-none sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>{t("title")}</DialogTitle>
          <DialogDescription>
            {step === "send"
              ? t("sendDescription", { phone: phoneNumber })
              : t("confirmDescription", { phone: phoneNumber })}
          </DialogDescription>
        </DialogHeader>

        {step === "confirm" && (
          <input
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={6}
            value={otp}
            onChange={(event) => setOtp(event.target.value.replace(/\D/g, ""))}
            placeholder={t("otpPlaceholder")}
            className="w-full rounded-none border border-gray-300 px-4 py-3 text-center text-xl tracking-[.5em] outline-none transition focus:border-brand"
          />
        )}

        <DialogFooter className="rounded-none">
          <Button type="button" variant="outline" className="rounded-none" disabled={isPending} onClick={() => handleOpenChange(false)}>
            {t("cancel")}
          </Button>
          {step === "send" ? (
            <Button
              type="button"
              variant="custom-secondary"
              className="rounded-none"
              disabled={isPending}
              onClick={handleSendCode}
            >
              {requestVerification.isPending ? t("sending") : t("sendCode")}
            </Button>
          ) : (
            <Button
              type="button"
              variant="custom-secondary"
              className="rounded-none"
              disabled={isPending || otp.length < 4}
              onClick={handleConfirm}
            >
              {confirmVerification.isPending ? t("verifying") : t("confirmCode")}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
