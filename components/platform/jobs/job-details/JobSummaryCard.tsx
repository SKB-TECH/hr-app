"use client";

import { useTranslations } from "next-intl";
import { ProgressWithLabel } from "@/components/ui/ProgressWithLabel";

type Props = {
  applyBefore: string;
  postedOn: string;
  jobType: string;
  salary: string;
  className?: string;
};

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between font-epilogue">
      <p className="text-neutral-80">{label}</p>
      <span className="font-semibold text-neutral-100 text-[16px]">
        {value}
      </span>
    </div>
  );
}

export default function JobSummaryCard({
  applyBefore,
  postedOn,
  jobType,
  salary,
  className = "",
}: Props) {
  const t = useTranslations("findJobs");

  return (
    <div className={`pb-6 md:py-8 ${className}`}>
      <h1 className=" text-[24px] md:text-[32px] text-neutral-100 font-bold font-clash">
        {t("detail.summaryCard.title")}
      </h1>
      <div className=" w-full mt-6 h-18.5 px-4 bg-[#F8F8FD] flex items-center justify-center">
        <ProgressWithLabel />
      </div>
      <div className="w-full mt-4 space-y-4 p-2">
        <InfoRow label={t("detail.summaryCard.applyBefore")} value={applyBefore} />
        <InfoRow label={t("detail.summaryCard.jobPostedOn")} value={postedOn} />
        <InfoRow label={t("detail.summaryCard.jobType")} value={jobType} />
        <InfoRow label={t("detail.summaryCard.salary")} value={salary} />
      </div>
    </div>
  );
}
