"use client";

import { useAcceptCompanyInvitation } from "@/core/hooks/company/use-accept-company-invitation";
import { useSession } from "@/core/hooks/auth/use-session";
import { Link, useRouter } from "@/i18n/routing";
import { CheckCircle2, MailWarning } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

export default function AcceptInvitationPage() {
  return <Suspense fallback={<Panel>Loading invitation…</Panel>}><InvitationContent /></Suspense>;
}

function InvitationContent() {
  const token = useSearchParams().get("token") || "";
  const session = useSession();
  const accept = useAcceptCompanyInvitation();
  const router = useRouter();
  const [accepted, setAccepted] = useState(false);
  if (!token) return <Panel><MailWarning className="mx-auto text-accent-red"/><h1 className="mt-4 text-xl font-bold">Invalid invitation link</h1></Panel>;
  if (session.isPending) return <Panel>Checking your session…</Panel>;
  if (!session.data) return <Panel><h1 className="text-xl font-bold">Sign in to accept your invitation</h1><p className="mt-2 text-sm text-neutral-60">Use the same email address that received the invitation, then reopen this link.</p><Link href="/sign-in" className="mt-5 inline-block bg-brand px-5 py-3 font-bold text-white">Sign in</Link></Panel>;
  if (accepted) return <Panel><CheckCircle2 className="mx-auto text-brand"/><h1 className="mt-4 text-xl font-bold">Invitation accepted</h1><button onClick={() => router.replace("/company")} className="mt-5 bg-brand px-5 py-3 font-bold text-white">Open company dashboard</button></Panel>;
  return <Panel><h1 className="text-xl font-bold">Join the company team</h1><p className="mt-2 text-sm text-neutral-60">Signed in as {session.data.email}</p><button disabled={accept.isPending} onClick={() => accept.mutate(token, { onSuccess: () => setAccepted(true) })} className="mt-5 bg-brand px-5 py-3 font-bold text-white disabled:opacity-50">{accept.isPending ? "Accepting…" : "Accept invitation"}</button>{accept.isError && <p className="mt-3 text-sm text-accent-red">The invitation is invalid, expired, or belongs to another email.</p>}</Panel>;
}

function Panel({ children }: { children: React.ReactNode }) { return <main className="grid min-h-[70vh] place-items-center px-4"><div className="w-full max-w-lg border bg-white p-8 text-center shadow-sm">{children}</div></main>; }
