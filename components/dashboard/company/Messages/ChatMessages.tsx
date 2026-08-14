"use client";

import { useState } from "react";
import Image from "next/image";
import { Conversation } from "@/data/messages";
import ChatMessageBubble from "./ChatMessageBubble";
import { LucideChevronDown } from "lucide-react";

interface ChatMessagesProps {
  conversation: Conversation;
  messagesContainerRef: React.RefObject<HTMLDivElement | null>;
  onCloseOtherMenus?: () => void;
}

const DATE_OPTIONS = ["Today", "Yesterday", "Last 7 days", "Last 30 days"];

export default function ChatMessages({
  conversation,
  messagesContainerRef,
  onCloseOtherMenus,
}: ChatMessagesProps) {
  const [dateLabel, setDateLabel] = useState("Today");
  const [showDateMenu, setShowDateMenu] = useState(false);

  return (
    <div
      ref={messagesContainerRef}
      className="flex min-h-0 flex-1 flex-col overflow-y-auto px-3 py-4 hide-scrollbar sm:px-5"
    >
      {/* Intro */}
      <div className="mb-6 flex flex-col items-center text-center">
        <Image
          src={conversation.avatar}
          alt={conversation.name}
          width={64}
          height={64}
          className="h-14 w-14 rounded-full object-cover sm:h-16 sm:w-16"
        />

        <h3 className="mb-0.5 mt-3 text-sm font-bold text-[#25324B] sm:text-[15px]">
          {conversation.name}
        </h3>

        <p className="m-0 mb-1 text-xs text-neutral-80 sm:text-[13px]">
          {conversation.role} </p>
         
      </div>

      {/* Date divider */}
      <div className="mb-4 flex items-center">
        <hr className="flex-1 bg-[#D6DDEB]" />

        <div className="relative">
          <button
            onClick={() => {
              setShowDateMenu((value) => !value);
              onCloseOtherMenus?.();
            }}
            className="flex cursor-pointer items-center gap-1 border border-[#D6DDEB] bg-white px-1 py-2 text-xs text-neutral-100 hover:bg-[#F8F8FD] sm:px-3"
          >
            <LucideChevronDown size={20} />

            {dateLabel}
          </button>

          {showDateMenu && (
            <div className="absolute left-1/2 top-full z-10 mt-1 min-w-[130px] -translate-x-1/2 border border-[#D6DDEB] bg-white py-1 shadow-md">
              {DATE_OPTIONS.map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    setDateLabel(option);
                    setShowDateMenu(false);
                  }}
                  className={`w-full cursor-pointer border-none bg-transparent px-3 py-1.5 text-left text-xs hover:bg-[#F8F8FD] ${
                    dateLabel === option
                      ? "font-medium text-[#4640DE]"
                      : "text-[#515B6F]"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>

        <hr className="flex-1 bg-[#D6DDEB]" />
      </div>

      {/* Messages */}
      <div className="flex flex-col gap-2.5">
        {conversation.messages.map((msg, index) => {
          const previousMessage = conversation.messages[index - 1];

          const nextMessage = conversation.messages[index + 1];

          const showAvatar =
            !msg.isOwn && (index === 0 || previousMessage?.isOwn);

          const showOwnAvatar =
            msg.isOwn &&
            (index === conversation.messages.length - 1 ||
              nextMessage?.isOwn === false);

          const showTimestamp =
            index === conversation.messages.length - 1 ||
            nextMessage?.isOwn !== msg.isOwn;

          return (
            <ChatMessageBubble
              key={msg.id}
              message={msg}
              conversation={conversation}
              showAvatar={showAvatar}
              showOwnAvatar={showOwnAvatar}
              showTimestamp={showTimestamp}
            />
          );
        })}
      </div>
    </div>
  );
}
