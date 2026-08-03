"use client";

import { usePathname } from "next/navigation";

import { UserRoles } from "@/data/SidebarNavigations";
import { getActivePathname, getNavItems } from "@/lib/utils";
import MainMobileNav from "./MainMobileNav";
import SettingsMobileaNav from "./SettingsMobileaNav";
import FooterMobilesSidebar from "./FooterMobilesSidebar";
import MobileSidebarHeader from "./MobileSidebarHeader";
import { CandidateMobileSidebarProps } from "../DashBoardHeaderWrapper";

export default function MobileSidebar({
  toggleMobileMenu,
  isMobileMenuOpen,
}: CandidateMobileSidebarProps) {
  const role: UserRoles = "company"; // later from context
  const pathname = getActivePathname(usePathname());

  const [navItems, settingItems] = getNavItems(role);

  return (
    <aside
      className={`hidden fixed inset-y-0 left-0 w-70 bg-[#F8F8FD] border-r max-sm:w-full max-lg:flex flex-col z-50   transform transition-transform duration-300 ease-in-out

    ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
    >
      {/* HEADER */}
      <MobileSidebarHeader toggleMobileMenu={toggleMobileMenu} />
      {/* NAV CONTENT */}
      <div className="flex-1 overflow-y-auto py-4">
        {/* MAIN NAV */}
        <MainMobileNav
          toggleMobileMenu={toggleMobileMenu!}
          navItems={navItems}
          pathname={pathname}
          role={role}
        />
        <hr className="my-4 border border-brand-light-neutral" />
        {/* SETTINGS */}
        <SettingsMobileaNav
          navItems={settingItems}
          pathname={pathname}
          role={role}
          toggleMobileMenu={toggleMobileMenu!}
        />
      </div>
      {/* FOOTER */}
      <FooterMobilesSidebar />
    </aside>
  );
}
