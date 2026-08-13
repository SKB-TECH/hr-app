import Image from "next/image";
import { Message, Conversation, currentUser } from "@/data/messages";

interface ChatMessageBubbleProps {
  message: Message;
  conversation: Conversation;
  showAvatar: boolean;
  showOwnAvatar: boolean;
  showTimestamp: boolean;
}

export default function ChatMessageBubble({
  message,
  conversation,
  showAvatar,
  showOwnAvatar,
  showTimestamp,
}: ChatMessageBubbleProps) {
  const isOwn = message.isOwn;

  return (
    <div className="w-full">
     
          {/* CURRENT USER MESSAGE */}
      {isOwn ? (
        <div className="flex w-full justify-end">
          <div className="flex max-w-[85%] flex-col items-end sm:max-w-[70%] md:max-w-[55%] lg:max-w-[480px]">
            {/* Current user avatar */}
            {showOwnAvatar && (
              <div className="mb-1 flex gap-2 items-center">
                <span className="mb-1 text-[10px] font-semibold text-neutral-100 sm:text-xs">
                  You
                </span>

                <Image
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  width={36}
                  height={36}
                  className="h-8 w-8 rounded-full object-cover sm:h-9 sm:w-9"
                />
              </div>
            )}

            {/* Message bubble */}
            <div
              className="
              mr-8
                w-fit
                max-w-full
                break-words
                rounded-[5px]
                bg-[#F5F5FC]
                px-3
                py-2.5
                text-xs
                leading-relaxed
                text-[#515B6F]
                sm:px-3.5
                sm:py-2.5
                sm:text-[13px]
              "
            >
              {/* Attachment */}
              {message.attachment && (
                <div className={message.text ? "mb-2" : ""}>
                  {message.attachment.isImage ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={message.attachment.url}
                      alt={message.attachment.name}
                      className="max-h-48 max-w-full rounded object-cover"
                    />
                  ) : (
                    <a
                      href={message.attachment.url}
                      download={message.attachment.name}
                      className="
                        flex
                        max-w-full
                        items-center
                        gap-2
                        border
                        border-[#D6DDEB]
                        bg-white
                        px-2.5
                        py-2
                        text-xs
                        text-[#515B6F]
                        no-underline
                      "
                    >
                      <span className="max-w-[180px] truncate">
                        {message.attachment.name}
                      </span>
                    </a>
                  )}
                </div>
              )}

              {/* Message text */}
              {message.text && (
                <p className="m-0 whitespace-pre-wrap break-words">
                  {message.text}
                </p>
              )}
            </div>

            {/* Timestamp */}
            {showTimestamp && (
              <span className="mt-1 mr-8 px-1 text-[10px] text-[#A8ADB7] sm:text-[11px]">
                {message.timestamp}
              </span>
            )}
          </div>
        </div>
      ) : (
        /* =====================================================
            OTHER USER MESSAGE
        ====================================================== */
        <div className="flex w-full justify-start">
          <div className="flex max-w-[85%] flex-col items-start sm:max-w-[70%] md:max-w-[55%] lg:max-w-[480px]">
            {/* Other user avatar */}
            {showAvatar && (
              <div className="mb-1 flex gap-2 items-center">
                <Image
                  src={conversation.avatar}
                  alt={conversation.name}
                  width={36}
                  height={36}
                  className="h-8 w-8 rounded-full object-cover sm:h-9 sm:w-9"
                />

                <span className="mt-1 text-[10px] font-semibold text-[#25324B] sm:text-xs">
                  {conversation.name}
                </span>
              </div>
            )}

            {/* Message bubble */}
            <div
                className="
                ml-8
                w-fit
                max-w-full
                break-words
                border
                border-[#D6DDEB]
                bg-white
                px-3
                py-2.5
                text-xs
                leading-relaxed
                text-[#515B6F]
                sm:px-3.5
                sm:py-2.5
                sm:text-[13px]
              "
            >
              {/* Attachment */}
              {message.attachment && (
                <div className={message.text ? "mb-2" : ""}>
                  {message.attachment.isImage ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={message.attachment.url}
                      alt={message.attachment.name}
                      className="max-h-48 max-w-full rounded object-cover"
                    />
                  ) : (
                    <a
                      href={message.attachment.url}
                      download={message.attachment.name}
                      className="
                        flex
                        max-w-full
                        items-center
                        gap-2
                        border
                        border-[#D6DDEB]
                        bg-white
                        px-2.5
                        py-2
                        text-xs
                        text-[#515B6F]
                        no-underline
                      "
                    >
                      <span className="max-w-[180px] truncate">
                        {message.attachment.name}
                      </span>
                    </a>
                  )}
                </div>
              )}

              {/* Message text */}
              {message.text && (
                <p className="m-0 whitespace-pre-wrap break-words">
                  {message.text}
                </p>
              )}
            </div>

            {/* Timestamp */}
            {showTimestamp && (
              <span className="mt-1 ml-8 px-1 text-[10px] text-[#A8ADB7] sm:text-[11px]">
                {message.timestamp}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
