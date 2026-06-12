import Link from "next/link";
import { ArrowRight } from "lucide-react";

type SectionTitleProps = {
  title: string;
  highlight: string;
  showAllLink?: string;
  showAllText?: string;
  isExpanded?: boolean;
};

export function SectionTitle({
  title,
  highlight,
  showAllLink = "",
  showAllText,
  isExpanded = false,
}: SectionTitleProps) {
  return (
    <div className="flex flex-row justify-between items-center mb-8 lg:px-0  ">
      <h2 className="font-bold text-[32px] md:text-[48px] flex flex-row gap-2">
        <span className="text-neutral-100">{title}</span>
        <span className="text-primary">{highlight}</span>
      </h2>
      {isExpanded && showAllLink && (
        <Link
          href={showAllLink}
          className="hidden md:flex flex-row text-brand text-sm font-semibold items-center gap-1"
        >
          {" "}
          {/* ↑ hidden on mobile, shows on md+ */}
          <span>{showAllText}</span>
          <ArrowRight size={14} />
        </Link>
      )}
    </div>
  );
}
