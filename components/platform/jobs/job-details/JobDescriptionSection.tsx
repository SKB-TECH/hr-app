"use client";

import { useTranslations } from "next-intl";
import JobDetailsSection from "./JobDetailsSection";

type Props = {
  description: string;
  className?: string;
};

export default function JobDescriptionSection({
  description,
  className = "",
}: Props) {
  const t = useTranslations("findJobs");

  return (
    <JobDetailsSection title={t("detail.description.title")} className={className}>
      <p className="text-neutral-80 ml-1 text-[16px] leading-[1.6] tracking-normal font-epilogue md:pb-6">
        {description}
      </p>
    </JobDetailsSection>
  );
}
