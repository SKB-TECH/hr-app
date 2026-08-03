"use client";

import { useRef, useState } from "react";
import { Attachment } from "@/data/messages";
import { FaPaperclip } from "react-icons/fa6";
import { SendHorizontal, Smile } from "lucide-react";

interface ChatMessageInputProps {
  input: string;
  pendingAttachment: Attachment | null;
  onInputChange: (value: string) => void;
  onSend: () => void;
  onAttachmentChange: (attachment: Attachment | null) => void;
}

const EMOJIS = [
  "😀",
  "😁",
  "😂",
  "🤣",
  "😊",
  "😍",
  "😎",
  "🤗",
  "🤔",
  "😉",
  "😅",
  "😇",
  "🥳",
  "😢",
  "😭",
  "😡",
  "👍",
  "👏",
  "🙌",
  "🙏",
  "🔥",
  "❤️",
  "💯",
  "✅",
  "⭐",
  "🎉",
  "🚀",
  "💼",
  "📎",
  "👀",
];

export default function ChatMessageInput({
  input,
  pendingAttachment,
  onInputChange,
  onSend,
  onAttachmentChange,
}: ChatMessageInputProps) {
  const [showEmoji, setShowEmoji] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    onAttachmentChange({
      name: file.name,
      url: URL.createObjectURL(file),
      isImage: file.type.startsWith("image/"),
    });

    e.target.value = "";
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className="flex-shrink-0 bg-white px-3 py-2 sm:px-5 sm:py-3">
      {/* Pending attachment */}
      {pendingAttachment && (
        <div className="mb-2 flex w-fit max-w-full items-center gap-2 border border-[#D6DDEB] bg-[#F8F8FD] px-3 py-1.5">
          <span className="max-w-[180px] truncate text-xs text-[#515B6F]">
            {pendingAttachment.name}
          </span>

          <button
            onClick={() => onAttachmentChange(null)}
            className="flex cursor-pointer border-none bg-transparent p-0 text-[#9CA3AF]"
          >
            ×
          </button>
        </div>
      )}

      <div className="flex items-stretch border border-[#D6DDEB]">
        <div className="flex min-w-0 flex-1 items-center gap-1 px-2 sm:gap-2 sm:px-2">
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFile}
            className="hidden"
          />

          {/* Attachment */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            aria-label="Attach"
            className="flex flex-shrink-0 cursor-pointer border-none bg-transparent p-0 text-[#9CA3AF]"
          >
            <FaPaperclip />
          </button>

          {/* Input */}
          <input
            type="text"
            value={input}
            onChange={(e) => onInputChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Reply message"
            className="min-w-0 flex-1 bg-transparent py-2 text-xs text-[#25324B] outline-none placeholder:text-[#A8ADB7] sm:text-sm"
          />

          {/* Emoji */}
          <div className="relative flex-shrink-0">
            <button
              type="button"
              onClick={() => setShowEmoji((value) => !value)}
              aria-label="Emoji"
              className="flex cursor-pointer border-none bg-transparent p-0 text-[#9CA3AF]"
            >
              <Smile size={18} />
            </button>

            {showEmoji && (
              <div className="absolute bottom-full right-0 z-20 mb-2 grid w-[200px] grid-cols-6 gap-1 border border-[#D6DDEB] bg-white p-2 shadow-lg sm:w-[228px]">
                {EMOJIS.map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => {
                      onInputChange(input + emoji);
                    }}
                    className="cursor-pointer border-none bg-transparent p-1 text-base leading-none hover:bg-[#F8F8FD] sm:text-lg"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Send */}
          <button
            onClick={onSend}
            aria-label="Send"
            className="text-white cursor-pointer items-center justify-center border-none bg-[#4640DE] px-3 py-1 hover:bg-[#3730c4] sm:px-3"
          >
            <SendHorizontal size={18}/>
          </button>
        </div>
      </div>
    </div>
  );
}
