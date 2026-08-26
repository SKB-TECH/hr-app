"use client";

import Separator from "@/components/common/auth/Separetor";
import TabsUserLevel, { type UserLevel } from "@/components/common/auth/TabsUserLevel";
import { FilterTick } from "@/components/ui/FilterTick";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLogin } from "@/core/hooks/auth/use-login";
import { getGoogleAuthUrl } from "@/core/services/auth/get-google-auth-url.service";
import { ApiError } from "@/core/types/api";
import { Link, useRouter } from "@/i18n/routing";
import Image from "next/image";
import { useLocale } from "next-intl";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";

export default function SignInPage() {
  const router = useRouter();
  const locale = useLocale();
  const login = useLogin();
  const [rememberMe, setRememberMe] = useState(false);
  const [userLevel, setUserLevel] = useState<UserLevel>("job-seeker");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      await login.mutateAsync({
        email: email.trim(),
        password,
        rememberMe,
        portal: userLevel === "company" ? "COMPANY" : "CANDIDATE",
      });
      toast.success("Connexion réussie");
      router.replace(userLevel === "company" ? "/company" : "/candidate");
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) {
        toast.error(
          locale === "fr"
            ? "Adresse e-mail ou mot de passe incorrect."
            : "Incorrect email address or password.",
        );
        return;
      }
      if (error instanceof ApiError && error.status === 403) {
        toast.error(
          error.message.toLowerCase().includes("portal")
            ? locale === "fr"
              ? userLevel === "company"
                ? "Ce compte candidat ne peut pas accéder à l’espace entreprise."
                : "Ce compte entreprise ne peut pas accéder à l’espace candidat."
              : userLevel === "company"
                ? "This candidate account cannot access the company portal."
                : "This company account cannot access the candidate portal."
            : error.message,
        );
        return;
      }
      toast.error(error instanceof ApiError ? error.message : "Connexion impossible.");
    }
  }

  return (
    <main className="flex w-full flex-1 items-center justify-center">
      <form onSubmit={submit} className="w-full max-w-xl space-y-5">
        <TabsUserLevel value={userLevel} onChange={setUserLevel} />
        <div className="space-y-2 text-center">
          <h1 className="font-epilogue text-3xl font-extrabold text-slate-900">Welcome Back</h1>
          <p className="text-sm text-slate-500">{userLevel === "job-seeker" ? "Sign in to continue your job search and manage your applications." : "Sign in to manage your jobs, candidates and recruitment process."}</p>
        </div>
        <button type="button" onClick={() => window.location.assign(getGoogleAuthUrl(userLevel === "company" ? "COMPANY" : "CANDIDATE"))} className="flex h-14 w-full items-center justify-center gap-3 border border-gray-300 bg-white font-semibold text-indigo-600 hover:bg-gray-50">
          <Image width={24} height={24} src="/images/google.svg" alt="Google" /> Sign in with Google
        </button>
        <Separator text="Or login with email" />
        <div><Label htmlFor="email" className="mb-2 block">Email Address</Label><Input id="email" type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Enter email address" className="h-14 rounded-none" /></div>
        <div><Label htmlFor="password" className="mb-2 block">Password</Label><Input id="password" type="password" autoComplete="current-password" required minLength={6} value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Enter your password" className="h-14 rounded-none" /></div>
        <div className="flex items-center justify-between gap-3 text-sm">
          <button type="button" onClick={() => setRememberMe((value) => !value)} className="flex items-center gap-3 text-slate-600"><FilterTick key={String(rememberMe)} defaultChecked={rememberMe} onChange={setRememberMe} /> Remember me</button>
          <span className="text-indigo-600">Forgot password?</span>
        </div>
        <button disabled={login.isPending} type="submit" className="h-14 w-full bg-indigo-600 font-semibold text-white disabled:opacity-60">{login.isPending ? "Signing in…" : "Sign In"}</button>
        <p className="text-sm text-gray-600">Don&apos;t have an account? <Link href="/sign-up" className="font-semibold text-indigo-600">Sign Up</Link></p>
      </form>
    </main>
  );
}
