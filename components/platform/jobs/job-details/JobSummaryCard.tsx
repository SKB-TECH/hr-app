"use client";

import { useTranslations } from "next-intl";
import { ProgressWithLabel } from "@/components/ui/ProgressWithLabel";
import { Calendar, Clock, Briefcase, DollarSign } from "lucide-react";

type Props = {
  applyBefore: string;
  postedOn: string;
  jobType: string;
  salary: string;
  className?: string;
};

function InfoRow({
  icon: Icon,
  label,
  value,
  isHighlight = false,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  isHighlight?: boolean;
}) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-[#F0F2F7] last:border-b-0 text-sm">
      <div className="flex items-center gap-2.5 text-[#7C8493]">
        <Icon size={16} className="text-[#4640DE]" />
        <span>{label}</span>
      </div>
      <span className={`font-semibold ${isHighlight ? "text-[#4640DE] text-base" : "text-[#132745]"}`}>
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
    <div className={`border border-[#D6DDEB] bg-white p-6 rounded-none shadow-[0_4px_20px_rgba(0,0,0,0.03)] ${className}`}>
      <h3 className="text-xl text-[#132745] font-bold font-clash tracking-tight">
        {t("detail.summaryCard.title")}
      </h3>

      <div className="w-full mt-4 p-3 bg-[#F8F9FC] border border-[#E4E7EC] rounded-none flex items-center justify-center">
        <ProgressWithLabel />
      </div>

      <div className="w-full mt-4 divide-y divide-[#F0F2F7]">
        <InfoRow icon={Calendar} label={t("detail.summaryCard.applyBefore")} value={applyBefore} />
        <InfoRow icon={Clock} label={t("detail.summaryCard.jobPostedOn")} value={postedOn} />
        <InfoRow icon={Briefcase} label={t("detail.summaryCard.jobType")} value={jobType} />
        <InfoRow icon={DollarSign} label={t("detail.summaryCard.salary")} value={salary} isHighlight />
      </div>
    </div>
  );
}

