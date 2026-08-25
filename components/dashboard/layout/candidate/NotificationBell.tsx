"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { NotificationPopup } from "./notifications/NotificationPopup";
import { UserRoles } from "@/data/SidebarNavigations";

interface NotificationBellProps {
  hasNotifications: boolean;
  notificationCount: number;
  role?: UserRoles;
}
export function NotificationBell({
  hasNotifications,
  notificationCount,
  role = "candidate",
}: NotificationBellProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  // Close the popup when the user clicks anywhere outside this component
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={
          hasNotifications
            ? `Notifications, ${notificationCount} new`
            : "Notifications"
        }
        aria-expanded={isOpen}
        className="group relative rounded-full p-2 transition-colors duration-200 hover:bg-brand-light-neutral/20"
      >
        <Image
          src="/notificationIcon.png"
          alt="Notifications"
          width={16}
          height={16}
          className="transition-transform duration-200 group-hover:scale-110"
          style={{ width: "auto" }}
        />
        {hasNotifications && (
          <span className="absolute right-1 top-1 flex h-2 w-2 items-center justify-center rounded-full border border-white bg-orange-500" />
        )}
      </button>
      {isOpen && (
        <div
          className="
  fixed left-0 right-0 top-16 z-50 px-3
  sm:absolute sm:left-auto sm:right-0 sm:top-[calc(100%+10px)] sm:px-0
"
        >
          <NotificationPopup role={role} />
        </div>
      )}
    </div>
  );
}
