import Image from "next/image";
import Link from "next/link";

interface NotificationBellProps {
  hasNotifications: boolean;
  notificationCount: number;
}

export function NotificationBell({ hasNotifications }: NotificationBellProps) {
  return (
    <Link
      href="/dashboard/notifications"
      className="relative p-2 rounded-full hover:bg-brand-light-neutral/20 transition-colors duration-200 group"
    >
      <Image
        src="/notificationIcon.png"
        alt="notification icon"
        width={16}
        height={16}
        className="group-hover:scale-110 transition-transform duration-200"
      />

      {hasNotifications && (
        <>
          {/* Notification badge */}
          <span className="absolute top-1 right-1 w-2 h-2 bg-orange-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white"></span>
        </>
      )}
    </Link>
  );
}
