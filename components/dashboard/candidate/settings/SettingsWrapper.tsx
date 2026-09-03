"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import ReusableHeaders, { NavigationItem } from "./ReusableHeaders";
import ProfileWrapper from "./profile/ProfileWrapper";
import SettingsLoginDetails from "./LoginDetails/SettingsLoginDetails";
import SettingsNotifications from "./notifications/SettingsNotificationsLogic";

export type Tabs = "my profile" | "login details" | "notifications";

function SettingsWrapper() {
  const t = useTranslations("candidateSettings.tabs");
  const [currentTab, setCurrentTab] = useState<Tabs>("my profile");

  const settingsNavigations = [
    { id: 1, title: "my profile", label: t("myProfile") },
    { id: 2, title: "login details", label: t("loginDetails") },
    { id: 3, title: "notifications", label: t("notifications") },
  ] satisfies NavigationItem<Tabs>[];

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
