import type { ReactNode } from "react";

type SectionHeaderProps = {
  id: string;
  title: string;
  subtitle?: string;
  action?: ReactNode;
};

export default function SectionHeader({
  id,
  title,
  subtitle,
  action,
}: SectionHeaderProps) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
      <div>
        <h2
          id={id}
          className="font-clash text-[clamp(1.5rem,3vw,2rem)] font-semibold text-[#202430] leading-tight"
        >
          {title}
        </h2>
        {subtitle && (
          <p className="mt-2 max-w-[36rem] text-[15px] text-gray-500 leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}