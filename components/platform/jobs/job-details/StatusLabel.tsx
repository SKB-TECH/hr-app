"use client";

import { useTranslations } from "next-intl";

type Props = {
  label?: string;
  style?: React.CSSProperties;
  className?: string;
};

function StatusLabel({ label, style, className }: Props) {
  const t = useTranslations("findJobs");
  const resolvedLabel = label ?? t("detail.statusLabel.defaultLabel");

  return (
    <div
      role="status"
      className={
        "flex items-center justify-center   w-fit  rounded-full px-4 py-1.5 text-sm " +
        className
      }
      style={style}
    >
      <span>{resolvedLabel}</span>
    </div>
  );
}

export default StatusLabel;
