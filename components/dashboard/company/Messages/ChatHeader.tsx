"use client";

import Image from "next/image";
import { RiPushpinLine } from "react-icons/ri";
import { Conversation } from "@/data/messages";
import MoreMenu from "./MoreMenu";
import { FaRegStar, FaStar } from "react-icons/fa6";
import { IoIosArrowBack } from "react-icons/io";

interface ChatHeaderProps {
  conversation: Conversation;
  onTogglePin: (id: string) => void;
  onToggleFavorite: (id: string) => void;
  onToggleMute: (id: string) => void;
  onMarkUnread: (id: string) => void;
  onDelete: (id: string) => void;
  onBack?: () => void;
}

export default function ChatHeader({
  conversation,
  onTogglePin,
  onToggleFavorite,
  onToggleMute,
  onMarkUnread,
  onDelete,
  onBack,
}: ChatHeaderProps) {
  return (
    <div className="flex flex-shrink-0 items-center justify-between border-b border-[#D6DDEB] px-3 py-5 sm:px-5">
      {/* Left side */}
      <div className="flex items-center gap-2">
        {onBack && (
          <button
            onClick={onBack}
            className="flex-shrink-0 cursor-pointer border-none bg-transparent text-[#4640DE] md:hidden"
            aria-label="Back"
          >
            <IoIosArrowBack className="w-5 h-5" />
          </button>
        )}

        <Image
          src={conversation.avatar}
          alt={conversation.name}
          width={40}
          height={40}
          className="h-8 w-8 flex-shrink-0 rounded-full object-cover sm:h-12 sm:w-12"
        />

        <div>
          <p className="m-0 text-sm font-semibold leading-tight text-[#25324B] sm:text-[16px]">
            {conversation.name}
          </p>

          <p className="m-0 text-[11px] text-neutral-80 sm:text-xs">
            {conversation.role} at {conversation.company}
          </p>
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-1 sm:gap-2">
        <button
          onClick={() => onTogglePin(conversation.id)}
          aria-label="Pin"
          className={`flex cursor-pointer border-none bg-transparent p-1 ${
            conversation.pinned ? "text-yellow-400" : "text-[#9CA3AF]"
          }`}
        >
          <RiPushpinLine size={19} />
        </button>

        <button
          onClick={() => onToggleFavorite(conversation.id)}
          aria-label="Favorite"
          className={`flex cursor-pointer border-none bg-transparent p-1 ${
            conversation.favorite ? "text-yellow-400" : "text-[#9CA3AF]"
          }`}
        >
          {conversation.favorite ? (
            <FaStar className="h-5 w-5" />
          ) : (
            <FaRegStar className="h-5 w-5" />
          )}
        </button>

        <MoreMenu
          conversation={conversation}
          onToggleMute={onToggleMute}
          onMarkUnread={onMarkUnread}
          onDelete={onDelete}
        />

        <a
          href="#"
          className="whitespace-nowrap text-[14px] text-brand font-semibold hover:underline"
        >
          View Profile
        </a>
      </div>
    </div>
  );
}
