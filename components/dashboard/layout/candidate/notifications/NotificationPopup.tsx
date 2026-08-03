"use client";
import { useState } from "react";
import { UserRoles } from "@/data/SidebarNavigations";
import { NotificationItem } from "./types";
import { NotificationRow } from "./NotificationRow";
import { MOCK_NOTIFICATIONS, MOCK_COMPANY_NOTIFICATIONS } from "./data";

export function NotificationPopup({ role = "candidate" }: { role?: UserRoles }) {
  const initialData = role === "company" ? MOCK_COMPANY_NOTIFICATIONS : MOCK_NOTIFICATIONS;
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialData);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  function handleMarkAllAsRead() {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  }
  return (
    <div className="w-full sm:w-[380px] overflow-hidden bg-white shadow-sm border border-brand-light-neutral">
      <div className="flex items-center justify-between border-b border-brand-light-neutral px-5 py-5">
        <div className="flex items-center gap-2">
          <h2 className="text-base font-semibold text-neutral-100">
            Notifications
          </h2>
          {unreadCount > 0 && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand text-[11px] font-semibold text-white">
              {unreadCount}
            </span>
          )}
        </div>
        <button
          onClick={handleMarkAllAsRead}
          className="text-sm font-medium text-brand transition-opacity hover:text-indigo-800 cursor-pointer"
        >
          Mark all as read
        </button>
      </div>
      <div className="max-h-[520px] overflow-y-auto custom-scrollbar">
        {notifications.map((notification, index) => (
          <NotificationRow
            key={notification.id}
            notification={notification}
            isLast={index === notifications.length - 1}
          />
        ))}
      </div>
    </div>
  );
}
