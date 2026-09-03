"use client";

import TabsUserLevel, { type UserLevel } from "@/components/common/auth/TabsUserLevel";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRegister } from "@/core/hooks/auth/use-register";
import { useResendOtp } from "@/core/hooks/auth/use-resend-otp";
import { useSetupPassword } from "@/core/hooks/auth/use-setup-password";
import { useVerifyOtp } from "@/core/hooks/auth/use-verify-otp";
import { ApiError } from "@/core/types/api";
import { Link, useRouter } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { FormEvent, ReactNode, useState } from "react";
import toast from "react-hot-toast";

type Step = "account" | "otp" | "password";

export default function SignUpPage() {
  const router = useRouter();
  const t = useTranslations("auth");
  const register = useRegister();
  const verify = useVerifyOtp();
  const resend = useResendOtp();
  const setupPassword = useSetupPassword();
  const [step, setStep] = useState<Step>("account");
  const [userLevel, setUserLevel] = useState<UserLevel>("job-seeker");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [requestId, setRequestId] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const fail = (error: unknown) => toast.error(error instanceof ApiError ? error.message : t("signUp.genericError"));
  async function submitAccount(event: FormEvent) { event.preventDefault(); try { const result = await register.mutateAsync({ fullName: fullName.trim(), email: email.trim(), acceptTerms, role: userLevel === "company" ? "COMPANY_OWNER" : "CANDIDATE" }); setRequestId(result.requestId); setStep("otp"); toast.success(t("signUp.codeSentByEmail")); } catch (error) { fail(error); } }
  async function submitOtp(event: FormEvent) { event.preventDefault(); try { await verify.mutateAsync({ requestId, otp }); setStep("password"); toast.success(t("signUp.emailVerified")); } catch (error) { fail(error); } }
  async function submitPassword(event: FormEvent) { event.preventDefault(); if (password !== confirmPassword) return toast.error(t("shared.passwordsDoNotMatch")); try { const user = await setupPassword.mutateAsync({ password, confirmPassword }); toast.success(t("signUp.accountCreated")); router.replace(userLevel === "company" || user.role === "COMPANY_OWNER" ? "/company" : "/candidate"); } catch (error) { fail(error); } }

  return (
    <main className="flex w-full flex-1 items-center justify-center">
      <div className="w-full max-w-xl space-y-5">
        <div className="text-center"><p className="text-xs font-semibold uppercase tracking-widest text-indigo-600">{t("shared.stepOf", { current: step === "account" ? 1 : step === "otp" ? 2 : 3, total: 3 })}</p><h1 className="mt-2 text-3xl font-extrabold text-slate-900">{t("signUp.createAccount")}</h1></div>
        {step === "account" && <form onSubmit={submitAccount} className="space-y-5">
          <TabsUserLevel value={userLevel} onChange={setUserLevel} />
          <Field label={t("signUp.fullName")} id="fullName"><Input id="fullName" required minLength={2} value={fullName} onChange={(e) => setFullName(e.target.value)} className="h-14 rounded-none" /></Field>
          <Field label={t("shared.emailAddress")} id="email"><Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="h-14 rounded-none" /></Field>
          <label className="flex items-start gap-3 text-sm text-slate-600"><input type="checkbox" checked={acceptTerms} onChange={(e) => setAcceptTerms(e.target.checked)} required className="mt-1" />{t("signUp.acceptTerms")}</label>
          <Submit pending={register.isPending}>{t("signUp.continue")}</Submit>
        </form>}
        {step === "otp" && <form onSubmit={submitOtp} className="space-y-5">
          <p className="text-center text-sm text-slate-500">{t("shared.otpSentToPrefix")} <strong>{email}</strong>{t("shared.otpSentToSuffix")}</p>
          <Field label={t("shared.verificationCode")} id="otp"><Input id="otp" inputMode="numeric" autoComplete="one-time-code" required minLength={6} maxLength={6} value={otp} onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))} className="h-14 rounded-none text-center text-xl tracking-[.5em]" /></Field>
          <Submit pending={verify.isPending}>{t("signUp.verifyEmail")}</Submit>
          <button type="button" disabled={resend.isPending} onClick={() => resend.mutate(requestId, { onSuccess: () => toast.success(t("shared.codeResent")), onError: fail })} className="w-full text-sm font-semibold text-indigo-600">{t("shared.resendCode")}</button>
        </form>}
        {step === "password" && <form onSubmit={submitPassword} className="space-y-5">
          <Field label={t("shared.password")} id="password"><Input id="password" type="password" autoComplete="new-password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} className="h-14 rounded-none" /></Field>
          <Field label={t("shared.confirmPassword")} id="confirmPassword"><Input id="confirmPassword" type="password" autoComplete="new-password" required minLength={8} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="h-14 rounded-none" /></Field>
          <Submit pending={setupPassword.isPending}>{t("signUp.finishRegistration")}</Submit>
        </form>}
        <p className="text-center text-sm text-gray-600">{t("signUp.alreadyRegistered")} <Link href="/sign-in" className="font-semibold text-indigo-600">{t("shared.signIn")}</Link></p>
      </div>
    </main>
  );
}

function Field({ label, id, children }: { label: string; id: string; children: ReactNode }) { return <div><Label htmlFor={id} className="mb-2 block">{label}</Label>{children}</div>; }
function Submit({ pending, children }: { pending: boolean; children: ReactNode }) { const t = useTranslations("auth"); return <button disabled={pending} type="submit" className="h-14 w-full bg-indigo-600 font-semibold text-white disabled:opacity-60">{pending ? t("shared.pleaseWait") : children}</button>; }
