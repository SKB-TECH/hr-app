import Image from "next/image";
import Link from "next/link";

interface NotificationBellProps {
  hasNotifications: boolean;
  notificationCount: number;
}

export function NotificationBell({
  hasNotifications,
  notificationCount,
}: NotificationBellProps) {
  return (
    <Link
      href="/dashboard/notifications"
      aria-label={`Notifications${
        hasNotifications ? `, ${notificationCount} new` : ""
      }`}
      className="relative rounded-full p-2 transition-colors duration-200 hover:bg-brand-light-neutral/20 group"
    >
      <Image
        src="/notificationIcon.png"
        alt="Notifications"
        width={16}
        height={16}
        className="transition-transform duration-200 group-hover:scale-110"
      />

      {hasNotifications && (
        <span className="absolute right-1 top-1 flex h-2 w-2 items-center justify-center rounded-full bg-orange-500 border border-white" />
      )}
    </Link>
  );
}
