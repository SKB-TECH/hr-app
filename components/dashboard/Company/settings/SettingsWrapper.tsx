"use client";
import { useState } from "react";
import ReusableHeaders from "../../candidate/settings/ReusableHeaders";
import SocialLinks from "./SocialLinks";
import Teams from "./Teams";
import OverviewWrapper from "./overview/OverviewWrapper";

const navigationHeaders = [
  { id: 1, title: "Overview" },
  { id: 2, title: "Social Links" },
  { id: 3, title: "Team" },
];

function SettingsWrapper() {
  const [currentTab, setCurrentTab] = useState("Overview");
  return (
    <div className="flex w-full max-w-[1104px] flex-1 min-h-0 flex-col">
      <ReusableHeaders
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        navigations={navigationHeaders}
      />
      <div className="mt-4 min-h-0 flex-1 overflow-y-auto overscroll-contain">
        {currentTab === "Overview" && <OverviewWrapper />}
        {currentTab === "Social Links" && <SocialLinks />}
        {currentTab === "Team" && <Teams />}
      </div>
    </div>
  );
}

export default SettingsWrapper;
