import { LucideIcon } from "lucide-react";
import { Link } from "@/i18n/routing";
import { IconType } from "react-icons";

interface SocialMedisListProps {
  icon: LucideIcon | IconType;
  title: string;
  content: string;
  isLink: boolean;
  className?: string;
}

function SocialMediaList({
  icon: Icon,
  title,
  content,
  isLink,
  className,
}: SocialMedisListProps) {
  return (
    <div className="flex items-center gap-4  overflow-hidden pb-4 text-[15px]">
      {/* icon */}
      <div className="self-start ">
        <Icon size={22} className="text-neutral-60" />
      </div>
      {/* media channel & link */}
      <div className="flex flex-col overflow-hidden">
        <p className="text-neutral-60">{title}</p>
        {isLink ? (
          <Link
            href={content}
            className={`inline-block ${className} text-brand hover:underline hover:text-indigo-800 text-ellipsis overflow-hidden`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {content}
          </Link>
        ) : (
          <p className="text-neutral-100 text-ellipsis">{content}</p>
        )}
      </div>
    </div>
  );
}

export default SocialMediaList;
