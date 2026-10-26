"use client";

import { useTranslations } from "next-intl";

type Label = {
  id: string | number;
  name: string;
};

type Props = {
  labels: Label[];
  className?: string;
};

export default function JobCategories({ labels, className = "" }: Props) {
  const t = useTranslations("findJobs");

  if (!labels || labels.length === 0) return null;

  return (
    <div className={`border border-[#D6DDEB] bg-white p-6 rounded-none shadow-[0_4px_20px_rgba(0,0,0,0.03)] mt-6 ${className}`}>
      <h3 className="pb-3 text-lg text-[#132745] font-bold font-clash tracking-tight">
        {t("detail.categories.title")}
      </h3>
      <div className="flex items-center gap-2 flex-wrap">
        {labels.map((label) => (
          <span
            key={label.name}
            className="inline-block px-3 py-1.5 text-xs font-semibold rounded-none bg-[#F8F9FC] text-[#4640DE] border border-[#D6DDEB]"
          >
            {label.name}
          </span>
        ))}
      </div>
    </div>
  );
}

