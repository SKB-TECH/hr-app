import React from "react";
import { NotificationBadge as BadgeType } from "./types";
interface Props {
  badge: BadgeType;
}
export function NotificationBadge({ badge }: Props) {
  // Pick the right color classes based on the badge type
  const colorClasses =
    badge.type === "new"
      ? "border-accent-yellow text-accent-yellow"
      : "border-accent-green text-accent-green";
  return (
    <span
      className={`inline-block rounded-full border px-4 py-1 text-xs font-medium ${colorClasses}`}
    >
      {badge.label}
    </span>
  );
}
