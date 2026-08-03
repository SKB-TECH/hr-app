"use client";

import { usePathname } from "next/navigation";

import DashboardHeader from "./DashboardHeader";
import { useState } from "react";
import MobileSidebar from "./mobile-sidebar/MobileSidebar";

export interface CandidateMobileSidebarProps {
  toggleMobileMenu: () => void;
  isMobileMenuOpen?: boolean;
}

function DashBoardHeaderWrapper() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };
  return (
    <>
      <DashboardHeader
        isMobileMenuOpen={isMobileMenuOpen}
        toggleMobileMenu={toggleMobileMenu}
        pathname={pathname}
      />
      {isMobileMenuOpen && (
        <MobileSidebar
          isMobileMenuOpen={isMobileMenuOpen}
          toggleMobileMenu={toggleMobileMenu}
        />
      )}
    </>
  );
}

export default DashBoardHeaderWrapper;
