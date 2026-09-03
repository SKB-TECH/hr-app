"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRequestPasswordReset } from "@/core/hooks/auth/use-request-password-reset";
import { useResendPasswordResetOtp } from "@/core/hooks/auth/use-resend-password-reset-otp";
import { useConfirmPasswordResetOtp } from "@/core/hooks/auth/use-confirm-password-reset-otp";
import { useSetNewPassword } from "@/core/hooks/auth/use-set-new-password";
import { ApiError } from "@/core/types/api";
import { Link, useRouter } from "@/i18n/routing";
import { FormEvent, ReactNode, useState } from "react";
import toast from "react-hot-toast";

type Step = "email" | "otp" | "password";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const request = useRequestPasswordReset();
  const confirm = useConfirmPasswordResetOtp();
  const resend = useResendPasswordResetOtp();
  const setNewPassword = useSetNewPassword();
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [requestId, setRequestId] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const fail = (error: unknown) => toast.error(error instanceof ApiError ? error.message : "Something went wrong. Please try again.");

  async function submitEmail(event: FormEvent) {
    event.preventDefault();
    try {
      const result = await request.mutateAsync({ email: email.trim() });
      setRequestId(result.requestId);
      setStep("otp");
      toast.success("Code sent to your email");
    } catch (error) { fail(error); }
  }

  async function submitOtp(event: FormEvent) {
    event.preventDefault();
    try {
      const result = await confirm.mutateAsync({ requestId, otp });
      setResetToken(result.resetToken);
      setStep("password");
      toast.success("Code verified");
    } catch (error) { fail(error); }
  }

  async function submitPassword(event: FormEvent) {
    event.preventDefault();
    if (password !== confirmPassword) return toast.error("Passwords do not match.");
    try {
      const user = await setNewPassword.mutateAsync({
        resetToken,
        newPassword: password,
        confirmPassword,
      });
      toast.success("Password reset successfully");
      router.replace(user.activeProfile === "COMPANY" ? "/company" : "/candidate");
    } catch (error) { fail(error); }
  }

  return (
    <main className="flex w-full flex-1 items-center justify-center">
      <div className="w-full max-w-xl space-y-5">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-indigo-600">Step {step === "email" ? 1 : step === "otp" ? 2 : 3} of 3</p>
          <h1 className="mt-2 text-3xl font-extrabold text-slate-900">Reset your password</h1>
        </div>
        {step === "email" && (
          <form onSubmit={submitEmail} className="space-y-5">
            <p className="text-center text-sm text-slate-500">Enter the email address linked to your account and we&apos;ll send you a verification code.</p>
            <Field label="Email Address" id="email"><Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="h-14 rounded-none" /></Field>
            <Submit pending={request.isPending}>Send code</Submit>
          </form>
        )}
        {step === "otp" && (
          <form onSubmit={submitOtp} className="space-y-5">
            <p className="text-center text-sm text-slate-500">Enter the 6-digit code sent to <strong>{email}</strong>.</p>
            <Field label="Verification code" id="otp"><Input id="otp" inputMode="numeric" autoComplete="one-time-code" required minLength={6} maxLength={6} value={otp} onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))} className="h-14 rounded-none text-center text-xl tracking-[.5em]" /></Field>
            <Submit pending={confirm.isPending}>Verify code</Submit>
            <button type="button" disabled={resend.isPending} onClick={() => resend.mutate(requestId, { onSuccess: () => toast.success("Code resent"), onError: fail })} className="w-full text-sm font-semibold text-indigo-600">Resend code</button>
          </form>
        )}
        {step === "password" && (
          <form onSubmit={submitPassword} className="space-y-5">
            <Field label="New password" id="password"><Input id="password" type="password" autoComplete="new-password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} className="h-14 rounded-none" /></Field>
            <Field label="Confirm password" id="confirmPassword"><Input id="confirmPassword" type="password" autoComplete="new-password" required minLength={8} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="h-14 rounded-none" /></Field>
            <Submit pending={setNewPassword.isPending}>Reset password</Submit>
          </form>
        )}
        <p className="text-center text-sm text-gray-600">Remembered your password? <Link href="/sign-in" className="font-semibold text-indigo-600">Sign In</Link></p>
      </div>
    </main>
  );
}

function Field({ label, id, children }: { label: string; id: string; children: ReactNode }) { return <div><Label htmlFor={id} className="mb-2 block">{label}</Label>{children}</div>; }
function Submit({ pending, children }: { pending: boolean; children: ReactNode }) { return <button disabled={pending} type="submit" className="h-14 w-full bg-indigo-600 font-semibold text-white disabled:opacity-60">{pending ? "Please wait…" : children}</button>; }
