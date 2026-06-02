// components/SectionTitle.tsx
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
    <div className="flex flex-row justify-between items-end mb-8">
      <h2 className="font-bold text-3xl flex flex-row gap-2">
        <span className="text-foreground">{title}</span>
        <span className="text-primary">{highlight}</span>
      </h2>
      {isExpanded && showAllLink && (
        <Link
          href={showAllLink}
          className="flex flex-row text-indigo-700 text-sm font-semibold items-center gap-1"
        >
          <span>{showAllText}</span>
          <ArrowRight size={14} />
        </Link>
      )}
    </div>
  );
}