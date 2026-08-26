import Image from "next/image";
import { Link } from "@/i18n/routing";
import MenuBar from "../MenuBar";

import { Button } from "@/components/ui/button";
import { NotificationBell } from "../candidate/NotificationBell";
import { ChevronDown, Plus } from "lucide-react";
import { CandidateMobileSidebarProps } from "../candidate/DashBoardHeaderWrapper";
import { useMyCompany } from "@/core/hooks/company/use-my-company";
import LanguageSwitcher from "@/components/common/LanguageSwitcher";
import { mediaUrl } from "@/core/lib/media-url";
import { useMyCompanies } from "@/core/hooks/company/use-my-companies";
import { useSwitchActiveCompany } from "@/core/hooks/company/use-switch-active-company";
import { Check, Building2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

const HAS_NOTIFICATIONS = true;
const NOTIFICATION_COUNT = 4;

export default function CompanyDashboardHeader({
  toggleMobileMenu,
}: CandidateMobileSidebarProps) {
  const { data: company } = useMyCompany();
  const companies = useMyCompanies();
  const switchCompany = useSwitchActiveCompany();
  const [open, setOpen] = useState(false);
  const selectCompany = (companyId: string) => {
    if (companyId === company?.id) return setOpen(false);
    switchCompany.mutate(companyId, { onSuccess: () => { setOpen(false); toast.success("Entreprise active modifiée"); }, onError: () => toast.error("Impossible de changer d’entreprise") });
  };
  return (
    <header className="flex w-full items-center justify-between border-b border-brand-light-neutral px-2 py-2 sm:px-4  lg:px-6">
      {/* Menu bar */}
      <div className="lg:hidden">
        <MenuBar toggleMobileMenu={toggleMobileMenu} />
      </div>

      {/* Left section */}
      <div className="relative flex items-center gap-3">
        <button type="button" aria-expanded={open} onClick={() => setOpen((value) => !value)} className="flex cursor-pointer items-center gap-2 rounded-md py-1 text-left transition-colors hover:bg-gray-50">
          <Image
            className="h-10 w-10 shrink-0 object-cover"
            src={mediaUrl(company?.logo)}
            alt={company?.name || "Company logo"}
            width={40}
            height={40}
          />

          <div className="hidden min-w-0 font-epilogue sm:block">
            <p className="text-xs text-neutral-80">Company</p>

            <div className="flex items-center gap-1 font-medium text-neutral-100">
              <p className="max-w-40 truncate">{company?.name || "My company"}</p>
              <ChevronDown size={22} />
            </div>
          </div>
        </button>
        {open && <div className="absolute left-0 top-full z-50 mt-2 w-72 overflow-hidden border border-brand-light-neutral bg-white shadow-[0_16px_40px_rgba(37,50,75,.16)]">
          <p className="px-4 pb-2 pt-3 text-[10px] font-bold uppercase tracking-widest text-neutral-60">Mes entreprises</p>
          <div className="max-h-64 overflow-y-auto">{companies.data?.map((membership) => <button key={membership.id} type="button" disabled={switchCompany.isPending} onClick={() => selectCompany(membership.companyId)} className={`flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-[#f8f8fc] ${membership.companyId === company?.id ? "bg-accent-light-brand text-brand" : ""}`}><span className="grid size-9 shrink-0 place-items-center bg-[#f1f1f7]"><Building2 size={17}/></span><span className="min-w-0 flex-1"><b className="block truncate text-sm">{membership.company.name}</b><small className="text-neutral-60">{membership.role.replaceAll("_", " ")}</small></span>{membership.companyId === company?.id && <Check size={16}/>}</button>)}</div>
          <Link href="/company/create" onClick={() => setOpen(false)} className="block w-full border-t px-4 py-3 text-left text-sm font-bold text-brand hover:bg-accent-light-brand">+ Ajouter une entreprise</Link>
        </div>}
      </div>

      {/* Right section */}
      <div className="flex shrink-0 items-center gap-2 sm:gap-4">
        <LanguageSwitcher />

        {/* Notifications */}
        <NotificationBell
          hasNotifications={HAS_NOTIFICATIONS}
          notificationCount={NOTIFICATION_COUNT}
          role="company"
        />

        {/* Desktop button */}
        <Button
          asChild
          className="hidden bg-brand px-5 py-5 text-white hover:bg-indigo-800 md:flex"
        >
          <Link href="/company/post-job">
            <Plus className="mr-1 h-4 w-4" />
            Post a Job
          </Link>
        </Button>
      </div>
    </header>
  );
}
