import SettingsNotificationsUI from "./SettingsNotificationsUI";
import { notificationItems } from "@/data/data";
import useSettingsForm from "@/hooks/useSettingsForm";
import { NotificationKey, NotificationsFormValues } from "@/types/types";

export default function SettingsNotifications() {
  const { watch, setValue, handleSubmit, onSubmit } =
    useSettingsForm<NotificationsFormValues>({
      defaults: {
        applications: true,
        jobs: false,
        recommendations: false,
      },
    });

  const notifications = watch();

  const toggle = (key: NotificationKey) => {
    setValue(key, !notifications[key]);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <SettingsNotificationsUI
        notifications={notifications}
        toggle={toggle}
        items={notificationItems}
      />
    </form>
  );
}
