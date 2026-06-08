"use client";

import { usePathname } from "next/navigation";

import DashboardHeader from "./DashboardHeader";

function DashBoardHeaderWrapper() {
  const path = usePathname();
  return (
    <>
      <DashboardHeader path={path} />
    </>
  );
}

export default DashBoardHeaderWrapper;
