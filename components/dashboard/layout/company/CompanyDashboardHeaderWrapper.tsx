"use client";

import { useState } from "react";

import CompanyDashboardHeader from "./CompanyDashboardHeader";
import MobileSidebar from "../candidate/mobile-sidebar/MobileSidebar";

function CompanyDashboardHeaderWrapper() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };
  return (
    <>
      <CompanyDashboardHeader
        isMobileMenuOpen={isMobileMenuOpen}
        toggleMobileMenu={toggleMobileMenu}
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

export default CompanyDashboardHeaderWrapper;
