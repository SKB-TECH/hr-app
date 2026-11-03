"use client";

import { FormEvent, Suspense, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { apiRequest } from "@/core/lib/api-client";
import { ApiError } from "@/core/types/api";
import toast from "react-hot-toast";
import { useSearchParams } from "next/navigation";

export default function CompleteOAuthAccountPage() {
  return (
    <Suspense fallback={null}>
      <CompleteOAuthAccountForm />
    </Suspense>
  );
}

function CompleteOAuthAccountForm() {
  const t = useTranslations("auth");
  const searchParams = useSearchParams();
  const [ticket] = useState(searchParams.get("ticket") ?? "");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"email" | "otp">("email");
  const [pending, setPending] = useState(false);

  useEffect(() => {
    if (ticket) {
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [ticket]);

  async function sendCode(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    try {
      await apiRequest("auth/oauth/email", {
        method: "POST",
        body: JSON.stringify({ ticket, email: email.trim() }),
      });
      setStep("otp");
      toast.success(t("oauth.codeSent"));
    } catch (error) {
      toast.error(error instanceof ApiError ? error.message : t("oauth.genericError"));
    } finally {
      setPending(false);
    }
  }

  async function verifyEmail(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    try {
      const result = await apiRequest<{ redirectPath: string }>(
        "auth/oauth/verify-email",
        {
          method: "POST",
          body: JSON.stringify({ ticket, otp }),
        },
      );
      window.location.assign(result.data.redirectPath);
    } catch (error) {
      toast.error(error instanceof ApiError ? error.message : t("oauth.genericError"));
    } finally {
      setPending(false);
    }
  }

  return (
    <main className="flex w-full flex-1 items-center justify-center">
      <div className="w-full max-w-xl space-y-5">
        <div className="space-y-2 text-center">
          <h1 className="font-epilogue text-3xl font-extrabold text-slate-900">
            {t("oauth.title")}
          </h1>
          <p className="text-sm text-slate-500">{t("oauth.instructions")}</p>
        </div>
        {!ticket ? (
          <p role="alert" className="text-center text-sm text-red-600">
            {t("oauth.missingTicket")}
          </p>
        ) : step === "email" ? (
          <form onSubmit={sendCode} className="space-y-5">
            <div>
              <Label htmlFor="oauth-email" className="mb-2 block">
                {t("oauth.emailLabel")}
              </Label>
              <Input
                id="oauth-email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="h-14 rounded-none"
              />
            </div>
            <button
              disabled={pending}
              type="submit"
              className="h-14 w-full bg-indigo-600 font-semibold text-white disabled:opacity-60"
            >
              {pending ? t("shared.pleaseWait") : t("oauth.sendCode")}
            </button>
          </form>
        ) : (
          <form onSubmit={verifyEmail} className="space-y-5">
            <p className="text-center text-sm text-slate-500">{email}</p>
            <div>
              <Label htmlFor="oauth-otp" className="mb-2 block">
                {t("oauth.codeLabel")}
              </Label>
              <Input
                id="oauth-otp"
                inputMode="numeric"
                autoComplete="one-time-code"
                required
                minLength={6}
                maxLength={6}
                value={otp}
                onChange={(event) => setOtp(event.target.value.replace(/\D/g, ""))}
                className="h-14 rounded-none text-center text-xl tracking-[.5em]"
              />
            </div>
            <button
              disabled={pending}
              type="submit"
              className="h-14 w-full bg-indigo-600 font-semibold text-white disabled:opacity-60"
            >
              {pending ? t("shared.pleaseWait") : t("oauth.verifyCode")}
            </button>
          </form>
        )}
        <p className="text-center text-sm text-gray-600">
          <Link href="/sign-in" className="font-semibold text-indigo-600">
            {t("shared.signIn")}
          </Link>
        </p>
      </div>
    </main>
  );
}
