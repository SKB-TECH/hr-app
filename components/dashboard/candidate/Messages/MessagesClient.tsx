"use client";

import { useState } from "react";
import {
  conversations as initialConversations,
  Conversation,
  Message,
} from "@/data/messages";
import ChatPanel from "./ChatPanel";
import ConversationSidebar from "./ConvasationSidebar";


export default function MessagesClient() {
  const [convos, setConvos] = useState<Conversation[]>(initialConversations);

  const [selectedId, setSelectedId] = useState("1");
  const [query, setQuery] = useState("");
  const [showChat, setShowChat] = useState(false);

  const selected = convos.find((c) => c.id === selectedId) ?? convos[0];

  const patch = (id: string, fn: (c: Conversation) => Conversation) => {
    setConvos((prev) => prev.map((c) => (c.id === id ? fn(c) : c)));
  };

  const handleUpdateMessages = (convId: string, messages: Message[]) => {
    patch(convId, (c) => ({
      ...c,
      messages,
      lastMessage: messages[messages.length - 1]?.text || c.lastMessage,
    }));
  };

  const handleSelect = (id: string) => {
    setSelectedId(id);

    patch(id, (c) => ({
      ...c,
      unread: false,
    }));

    setShowChat(true);
  };

  const togglePin = (id: string) =>
    patch(id, (c) => ({
      ...c,
      pinned: !c.pinned,
    }));

  const toggleFavorite = (id: string) =>
    patch(id, (c) => ({
      ...c,
      favorite: !c.favorite,
    }));

  const toggleMute = (id: string) =>
    patch(id, (c) => ({
      ...c,
      muted: !c.muted,
    }));

  const markUnread = (id: string) =>
    patch(id, (c) => ({
      ...c,
      unread: true,
    }));

  const deleteConversation = (id: string) => {
    setConvos((prev) => {
      const next = prev.filter((c) => c.id !== id);

      if (id === selectedId && next.length) {
        setSelectedId(next[0].id);
      }

      setShowChat(false);

      return next;
    });
  };

  const ordered = [...convos].sort(
    (a, b) => Number(Boolean(b.pinned)) - Number(Boolean(a.pinned)),
  );

  const q = query.trim().toLowerCase();

  const filtered = q
    ? ordered.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.lastMessage.toLowerCase().includes(q),
      )
    : ordered;

  return (
    <div className="flex h-full min-h-0 w-full flex-col overflow-hidden bg-white">
      {/* Main Chat Area */}
      <div className="flex min-h-0 flex-1 overflow-hidden hide-scrollbar">
        {/* Sidebar */}
        <ConversationSidebar
          conversations={filtered}
          selectedId={selectedId}
          query={query}
          showChat={showChat}
          onQueryChange={setQuery}
          onSelect={handleSelect}
        />

        {/* Chat */}
        <main
          className={`
            min-h-0 min-w-0 flex-1 hide-scrollbar overflow-hidden
            ${showChat ? "flex" : "hidden md:flex"}
          `}
        >
          {selected ? (
            <ChatPanel
              key={selected.id}
              conversation={selected}
              onUpdateMessages={handleUpdateMessages}
              onTogglePin={togglePin}
              onToggleFavorite={toggleFavorite}
              onToggleMute={toggleMute}
              onMarkUnread={markUnread}
              onDelete={deleteConversation}
              onBack={() => setShowChat(false)}
            />
          ) : (
            <div className="flex flex-1 items-center justify-center text-sm text-[#A8ADB7]">
              Select a conversation
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
