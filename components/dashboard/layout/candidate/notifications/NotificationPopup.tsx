"use client";
import { useEffect, useState } from "react";
import { UserRoles } from "@/data/SidebarNavigations";
import { NotificationItem } from "./types";
import { NotificationRow } from "./NotificationRow";
import { useSession } from "@/core/hooks/auth/use-session";
import { getConversations, markConversationRead } from "@/core/services/messages/messages.service";
import { mediaUrl } from "@/core/lib/media-url";
import type { Conversation } from "@/core/types/message";

function toNotifications(conversations: Conversation[], userId: string, role: UserRoles): NotificationItem[] {
  const items = conversations.flatMap((conversation) => {
    const participant = role === "company"
      ? { name: conversation.candidate.fullName, avatar: conversation.candidate.avatar }
      : { name: conversation.company.name, avatar: conversation.company.logo };
    return conversation.messages
      .filter((message) => message.senderId !== userId)
      .map((message) => ({
        _createdAt: message.createdAt,
        id: message.id,
        conversationId: conversation.id,
        senderName: message.sender?.fullName || participant.name,
        senderAvatar: mediaUrl(message.sender?.avatar || participant.avatar, "/avatar.jpg"),
        message: message.text,
        isRead: Boolean(message.readAt),
        timestamp: new Date(message.createdAt).toLocaleString(),
        badge: message.type === "JOB_PROPOSAL"
          ? { label: "Proposition d’emploi", type: "shortlisted" as const }
          : !message.readAt ? { label: "Nouveau", type: "new" as const } : undefined,
      }));
  }).sort((a, b) => Date.parse(b._createdAt) - Date.parse(a._createdAt)).slice(0, 30);
  return items.map(({ _createdAt: _ignored, ...item }) => item);
}

export function NotificationPopup({ role = "candidate" }: { role?: UserRoles }) {
  const session = useSession();
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = session.data?.id;
    if (!userId) return;
    let active = true;
    const load = async () => {
      try {
        const conversations = await getConversations();
        if (active) setNotifications(toNotifications(conversations, userId, role));
      } finally {
        if (active) setLoading(false);
      }
    };
    void load();
    const refresh = () => void load();
    window.addEventListener("messages:unread", refresh);
    return () => { active = false; window.removeEventListener("messages:unread", refresh); };
  }, [role, session.data?.id]);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  async function handleMarkAllAsRead() {
    const conversationIds = [...new Set(notifications.filter((item) => !item.isRead).map((item) => item.conversationId).filter(Boolean))] as string[];
    await Promise.all(conversationIds.map(markConversationRead));
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    localStorage.setItem("messages:unread", "0");
    window.dispatchEvent(new CustomEvent("messages:unread", { detail: 0 }));
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
        {loading && <p className="p-8 text-center text-sm text-neutral-60">Chargement…</p>}
        {!loading && notifications.length === 0 && <p className="p-8 text-center text-sm text-neutral-60">Aucune nouvelle notification.</p>}
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
