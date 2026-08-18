"use client";

import { useSession } from "@/core/hooks/auth/use-session";
import { usePathname, useRouter } from "@/i18n/routing";
import { useEffect, type ReactNode } from "react";

const companyRoles = ["COMPANY_OWNER", "HR_MANAGER", "RECRUITER", "ADMIN", "SUPER_ADMIN"];

export function SessionGuard({ children }: { children: ReactNode }) {
  const session = useSession();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (session.isError) router.replace("/sign-in");
    if (!session.data) return;
    if (pathname.startsWith("/company") && !companyRoles.includes(session.data.role)) router.replace("/candidate");
    if (pathname.startsWith("/candidate") && session.data.role !== "CANDIDATE") router.replace("/company");
  }, [pathname, router, session.data, session.isError]);

  if (session.isPending) return <div className="grid min-h-screen place-items-center bg-white text-sm text-neutral-60">Loading your session…</div>;
  if (session.isError || !session.data) return null;
  return children;
}
