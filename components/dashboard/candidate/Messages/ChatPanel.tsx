"use client";

import { useEffect, useRef, useState } from "react";

import { Attachment, Conversation, Message } from "@/data/messages";

import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import ChatMessageInput from "./ChatMessageInput";

interface ChatPanelProps {
  conversation: Conversation;
  onUpdateMessages: (convId: string, messages: Message[]) => void;
  onTogglePin: (id: string) => void;
  onToggleFavorite: (id: string) => void;
  onToggleMute: (id: string) => void;
  onMarkUnread: (id: string) => void;
  onDelete: (id: string) => void;
  onBack?: () => void;
}

export default function ChatPanel({
  conversation,
  onUpdateMessages,
  onTogglePin,
  onToggleFavorite,
  onToggleMute,
  onMarkUnread,
  onDelete,
  onBack,
}: ChatPanelProps) {
  const [input, setInput] = useState("");
  const [pendingAttachment, setPendingAttachment] = useState<Attachment | null>(
    null,
  );

  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const shouldScrollAfterSendRef = useRef(false);

  useEffect(() => {
    if (!shouldScrollAfterSendRef.current) {
      return;
    }

    shouldScrollAfterSendRef.current = false;

    const container = messagesContainerRef.current;

    if (!container) return;

    requestAnimationFrame(() => {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: "smooth",
      });
    });
  }, [conversation.messages.length]);

  const handleSend = () => {
    const text = input.trim();

    if (!text && !pendingAttachment) {
      return;
    }

    const newMsg: Message = {
      id: `m${Date.now()}`,
      senderId: "me",
      text,
      timestamp: "Just now",
      isOwn: true,
      ...(pendingAttachment
        ? {
            attachment: pendingAttachment,
          }
        : {}),
    };

    shouldScrollAfterSendRef.current = true;

    onUpdateMessages(conversation.id, [...conversation.messages, newMsg]);

    setInput("");
    setPendingAttachment(null);
  };

  return (
    <div className="flex h-full min-h-0 w-full flex-col overflow-hidden bg-white">
      {/* Header */}
      <ChatHeader
        conversation={conversation}
        onTogglePin={onTogglePin}
        onToggleFavorite={onToggleFavorite}
        onToggleMute={onToggleMute}
        onMarkUnread={onMarkUnread}
        onDelete={onDelete}
        onBack={onBack}
      />

      {/* Messages */}
      <ChatMessages
        conversation={conversation}
        messagesContainerRef={messagesContainerRef}
      />

      {/* Input */}
      <ChatMessageInput
        input={input}
        pendingAttachment={pendingAttachment}
        onInputChange={setInput}
        onSend={handleSend}
        onAttachmentChange={setPendingAttachment}
      />
    </div>
  );
}
