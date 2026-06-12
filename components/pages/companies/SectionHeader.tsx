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
    <div className="companies-section__header">
      <div className="companies-section__header-text">
        <h2 id={id} className="companies-section__title">
          {title}
        </h2>
        {subtitle ? (
          <p className="companies-section__subtitle">{subtitle}</p>
        ) : null}
      </div>
      {action ? <div className="companies-section__action">{action}</div> : null}
    </div>
  );
}
