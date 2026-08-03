"use client";

import Image from "next/image";
import { Conversation } from "@/data/messages";

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
        <div className="flex items-center gap-2 border border-[#D6DDEB] px-3 py-2.5">
          <svg
            className="h-4 w-4 shrink-0 text-[#9CA3AF]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>

          <input
            type="text"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Search messages"
            className="min-w-0 flex-1 bg-transparent text-sm text-[#25324B] outline-none placeholder:text-[#A8ADB7]"
          />
        </div>
      </div>

      {/* Conversation List */}
      <div className="hide-scrollbar min-h-0 flex-1 overflow-y-auto p-3 sm:p-4">
        {conversations.length === 0 ? (
          <div className="px-4 py-10 text-center text-sm text-[#A8ADB7]">
            No messages found
          </div>
        ) : (
          <ul className="m-0 list-none p-0">
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
