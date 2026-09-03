"use client";

import { useTranslations } from "next-intl";

interface PopularTagsProps {
  tags: string[];
}

export default function PopularTags({ tags }: PopularTagsProps) {
  const t = useTranslations("findJobs");

  if (!tags.length) return null;

  return (
    <p className=" pt-4 font-epilogue text-[15px] text-neutral-60">
      <span className="block sm:inline mr-2">
        {t("search.popularLabel")} <span>:</span>{" "}
      </span>
      {tags.map((tag, index) => (
        <span key={tag} className="mr-2 inline-block">
          {tag}
          {index !== tags.length - 1 && ","}
        </span>
      ))}
    </p>
  );
}
