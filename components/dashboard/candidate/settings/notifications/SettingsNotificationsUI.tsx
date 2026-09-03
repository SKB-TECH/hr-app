import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import {
  NotificationItem,
  NotificationKey,
  NotificationsState,
} from "@/types/types";

interface SettingsNotificationsUIProps {
  notifications: NotificationsState;
  toggle: (key: NotificationKey) => void;
  items: NotificationItem[];
}

function SettingsNotificationsUI({
  notifications,
  toggle,
  items,
}: SettingsNotificationsUIProps) {
  const t = useTranslations("candidateSettings.notifications");

  return (
    <div>
      {/* Basic Information */}
      <div className="max-md:mb-2 mb-6">
        <h1 className="text-[16px] font-semibold text-neutral-100">
          {t("basicInformation.title")}
        </h1>
        <p className="text-[15px] leading-relaxed font-epilogue text-gray-500 mt-1">
          {t("basicInformation.description")}
        </p>
      </div>

      <hr className="border-gray-200 mb-8" />

      {/* Notifications */}
      <div className="flex max-md:flex-col gap-6 md:gap-16">
        <div className="max-md:w-full w-48 shrink-0">
          <h2 className="text-[16px] font-semibold text-neutral-100">
            {t("section.title")}
          </h2>
          <p className="text-[15px] leading-relaxed font-epilogue text-gray-500 mt-1">
            {t("section.description")}
          </p>
        </div>

        <div className="flex-1 space-y-6">
          {items.map(({ key, label, description }) => (
            <label key={key} className="flex items-start gap-4 cursor-pointer">
              <div className="mt-0.5 shrink-0">
                <div
                  onClick={() => toggle(key)}
                  className={`w-5 h-5 rounded flex items-center justify-center border-2 transition-colors ${
                    notifications[key]
                      ? "bg-[#4640DE] border-[#4640DE]"
                      : "bg-white border-gray-300"
                  }`}
                >
                  {notifications[key] && (
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2 6L5 9L10 3"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-900">{label}</p>
                <p className="text-sm text-gray-500 mt-0.5">{description}</p>
              </div>
            </label>
          ))}

          <Button variant="custom-secondary" className="px-8">
            {t("submit")}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SettingsNotificationsUI;
