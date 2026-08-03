"use client";

import { useEffect, useRef, useState } from "react";
import { Conversation } from "@/data/messages";
import { HiDotsVertical } from "react-icons/hi";

interface MoreMenuProps {
  conversation: Conversation;
  onToggleMute: (id: string) => void;
  onMarkUnread: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function MoreMenu({
  conversation,
  onToggleMute,
  onMarkUnread,
  onDelete,
}: MoreMenuProps) {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;

      if (menuRef.current && !menuRef.current.contains(target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setShowMenu((value) => !value)}
        aria-label="More"
        className="flex cursor-pointer border-none bg-transparent p-1 text-[#9CA3AF]"
      >
        <HiDotsVertical />
      </button>

      {showMenu && (
        <div className="absolute right-0 top-full z-20 mt-1 min-w-[185px] border border-[#D6DDEB] bg-white py-1 shadow-md">
          <button
            onClick={() => {
              onMarkUnread(conversation.id);
              setShowMenu(false);
            }}
            className="w-full cursor-pointer border-none bg-transparent px-3 py-1.5 text-left text-xs text-[#515B6F] hover:bg-[#F8F8FD]"
          >
            Mark as unread
          </button>

          <button
            onClick={() => {
              onToggleMute(conversation.id);
              setShowMenu(false);
            }}
            className="w-full cursor-pointer border-none bg-transparent px-3 py-1.5 text-left text-xs text-[#515B6F] hover:bg-[#F8F8FD]"
          >
            {conversation.muted ? "Unmute notifications" : "Mute notifications"}
          </button>

          <button
            onClick={() => {
              onDelete(conversation.id);
              setShowMenu(false);
            }}
            className="w-full cursor-pointer border-none bg-transparent px-3 py-1.5 text-left text-xs text-red-500 hover:bg-red-50"
          >
            Delete conversation
          </button>
        </div>
      )}
    </div>
  );
}
