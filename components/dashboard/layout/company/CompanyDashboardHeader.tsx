import Image from "next/image";
import Link from "next/link";
import MenuBar from "../MenuBar";

import { Button } from "@/components/ui/button";
import { NotificationBell } from "../candidate/NotificationBell";
import { ChevronDown, Plus } from "lucide-react";
import { CandidateMobileSidebarProps } from "../candidate/DashBoardHeaderWrapper";
import { useMyCompany } from "@/core/hooks/company/use-my-company";

const HAS_NOTIFICATIONS = true;
const NOTIFICATION_COUNT = 4;

export default function CompanyDashboardHeader({
  toggleMobileMenu,
}: CandidateMobileSidebarProps) {
  const { data: company } = useMyCompany();
  return (
    <header className="flex w-full items-center justify-between border-b border-brand-light-neutral px-2 py-2 sm:px-4  lg:px-6">
      {/* Menu bar */}
      <div className="lg:hidden">
        <MenuBar toggleMobileMenu={toggleMobileMenu} />
      </div>

      {/* Left section */}
      <div className="flex items-center  gap-3">
        <div className="flex  cursor-pointer items-center gap-2 rounded-md  py-1 transition-colors hover:bg-gray-50">
          <Image
            className="h-10 w-10 shrink-0 object-cover"
            src={company?.logo || "/logo/lgo.png"}
            alt={company?.name || "Company logo"}
            width={40}
            height={40}
          />

          <div className="font-epilogue">
            <p className="text-xs text-neutral-80">Company</p>

            <div className="flex items-center gap-1 font-medium text-neutral-100">
              <p>{company?.name || "My company"}</p>
              <ChevronDown size={22} />
            </div>
          </div>
        </div>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-4">
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
