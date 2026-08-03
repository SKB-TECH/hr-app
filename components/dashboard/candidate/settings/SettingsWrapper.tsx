"use client";

import { useState } from "react";
import ReusableHeaders, { NavigationItem } from "./ReusableHeaders";
import ProfileWrapper from "./profile/ProfileWrapper";
import SettingsLoginDetails from "./LoginDetails/SettingsLoginDetails";
import SettingsNotifications from "./notifications/SettingsNotificationsLogic";

export type Tabs = "my profile" | "login details" | "notifications";
const settingsNavigations = [
  { id: 1, title: "my profile" },
  { id: 2, title: "login details" },
  { id: 3, title: "notifications" },
] satisfies NavigationItem<Tabs>[];

function SettingsWrapper() {
  const [currentTab, setCurrentTab] = useState<Tabs>("my profile");

  return (
    <div className="flex h-full min-h-0 flex-col px-4 py-6 lg:px-8">
      <ReusableHeaders
        navigations={settingsNavigations}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
      />
      <div className="mt-12 min-h-0 flex-1 overflow-y-auto overscroll-contain">
        {currentTab === "my profile" && <ProfileWrapper />}
        {currentTab === "login details" && <SettingsLoginDetails />}
        {currentTab === "notifications" && <SettingsNotifications />}
      </div>
    </div>
  );
}

export default SettingsWrapper;
