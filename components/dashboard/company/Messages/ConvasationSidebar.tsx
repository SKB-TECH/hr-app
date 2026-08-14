"use client";

import Image from "next/image";
import { useState } from "react";
import { Conversation } from "@/data/messages";
import { Search } from "lucide-react";

interface ConversationSidebarProps {
  conversations: Conversation[];
  selectedId: string;
  query: string;
  showChat: boolean;
  onQueryChange: (query: string) => void;
  onSelect: (id: string) => void;
}

export default function ConversationSidebar({
  conversations,
  selectedId,
  query,
  showChat,
  onQueryChange,
  onSelect,
}: ConversationSidebarProps) {
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  return (
    <aside
      className={`
        flex h-full min-h-0 w-full shrink-0 flex-col
        border-r border-[#D6DDEB] bg-white
        md:w-80 lg:w-[350px]
        ${showChat ? "hidden md:flex" : "flex"}
      `}
    >
      {/* Search */}
      <div className="shrink-0 p-3 sm:p-4">
        <div className="hidden md:block">
          <div className="flex items-center gap-2 border border-[#D6DDEB] px-3 py-2.5">
            <span className="text-neutral-60">
              <Search size={18} />
            </span>
            <input
              type="text"
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              placeholder="Search messages"
              className="min-w-0 flex-1 bg-transparent text-sm text-[#25324B] outline-none placeholder:text-[#A8ADB7]"
            />
          </div>
        </div>

        <div className="block md:hidden">
          {showMobileSearch ? (
            <div className="flex items-center gap-2 border border-[#D6DDEB] px-3 py-2.5">
              <Search size={20} />

              <input
                autoFocus
                type="text"
                value={query}
                onChange={(e) => onQueryChange(e.target.value)}
                placeholder="Search messages"
                className="min-w-0 flex-1 bg-transparent text-sm text-[#25324B] outline-none placeholder:text-[#A8ADB7]"
              />

              <button
                type="button"
                onClick={() => setShowMobileSearch(false)}
                className="text-sm text-[#515B6F]"
              >
                Cancel
              </button>
            </div>
          ) : (
            <>
              <div className="flex justify-between py-3 text-neutral-100">
                <h1 className="text-3xl font-bold">Messages</h1>

                <button
                  type="button"
                  onClick={() => setShowMobileSearch(true)}
                  aria-label="Search messages"
                >
                  <Search size={30} className="cursor-pointer" />
                </button>
              </div>

              <hr className="-mx-4 bg-neutral-20" />
            </>
          )}
        </div>
      </div>

      {/* Conversation List */}
      <div className="hide-scrollbar  min-h-0  h-full overflow-y-auto p-3 sm:p-4">
        {conversations.length === 0 ? (
          <div className="px-4 py-10 text-center text-sm text-[#A8ADB7]">
            No messages found
          </div>
        ) : (
          <ul className="m-0 list-none p-0 ">
            {conversations.map((conv) => (
              <li key={conv.id}>
                <button
                  onClick={() => onSelect(conv.id)}
                  className={`
                    flex w-full items-center gap-3
                    border-b border-neutral-20
                    px-4 py-3 text-left
                    transition-colors
                    ${
                      selectedId === conv.id
                        ? "bg-[#E9EBFD] hover:bg-[#E9EBFD]"
                        : "bg-white hover:bg-[#F8F8FD]"
                    }
                  `}
                >
                  {/* Avatar */}
                  <Image
                    src={conv.avatar}
                    alt={conv.name}
                    width={44}
                    height={44}
                    className="h-10 w-10 shrink-0 rounded-full object-cover"
                  />

                  {/* Content */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex min-w-0 items-center gap-1.5">
                        <span
                          className={`
                            truncate text-[14px]
                            ${
                              conv.unread
                                ? "font-bold text-[#25324B]"
                                : "font-semibold text-neutral-100 font-epilogue"
                            }
                          `}
                        >
                          {conv.name}
                        </span>

                        {conv.unread && (
                          <span className="h-2 w-2 shrink-0 rounded-full bg-[#4640DE]" />
                        )}
                      </div>

                      <span className="shrink-0 text-[14px] font-epilogue text-neutral-80">
                        {conv.time}
                      </span>
                    </div>

                    <p
                      className={`
                        mt-1 truncate text-[14px]
                        ${
                          conv.unread
                            ? "font-medium text-[#515B6F]"
                            : "text-neutral-80 font-epilogue"
                        }
                      `}
                    >
                      {conv.lastMessage}
                    </p>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </aside>
  );
}
