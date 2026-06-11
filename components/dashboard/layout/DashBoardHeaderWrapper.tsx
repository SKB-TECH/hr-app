"use client";

import { usePathname } from "next/navigation";

import DashboardHeader from "./DashboardHeader";

function DashBoardHeaderWrapper() {
  const pathname = usePathname();
  return (
    <>
      <DashboardHeader pathname={pathname} />
    </>
  );
}

export default DashBoardHeaderWrapper;
