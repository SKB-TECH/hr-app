import { useState } from "react";
import Image from "next/image";
import { NotificationItem } from "./types";
import { NotificationBadge } from "./NotificationBadge";
import { InterviewCard } from "./InterviewCard";

interface Props {
  notification: NotificationItem;
  isLast: boolean;
}

export function NotificationRow({ notification, isLast }: Props) {
  const { senderAvatar, senderName, message, badge, timestamp, interviewCard } =
    notification;

  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      onClick={() => {
        if (interviewCard) setIsExpanded((prev) => !prev);
      }}
      onMouseLeave={() => {
        if (interviewCard) setIsExpanded(false);
      }}
      className={`flex gap-3 px-5 py-4 transition-colors hover:bg-gray-50 ${
        isLast ? "" : "border-b border-brand-light-neutral"
      } ${interviewCard ? "cursor-pointer" : ""}`}
    >
      <div className="shrink-0">
        <Image
          src={senderAvatar}
          alt={`${senderName} avatar`}
          width={42}
          height={42}
          className="rounded-full object-cover"
        />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-sm leading-snug text-neutral-80">
          <span className="font-semibold text-neutral-100">{senderName}</span>{" "}
          {message}
        </p>

        {badge && (
          <div className="mt-2">
            <NotificationBadge badge={badge} />
          </div>
        )}

        {interviewCard && (
          <InterviewCard card={interviewCard} isExpanded={isExpanded} />
        )}

        <p className="mt-2 text-sm text-neutral-60">{timestamp}</p>
      </div>
    </div>
  );
}
