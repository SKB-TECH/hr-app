import type { RecommendedCompany } from "@/data/companies";
import CompanyLogo from "./CompanyLogo";
import Link from "next/link";

type RecommendedCardProps = {
  company: RecommendedCompany;
};

const tagVariantStyles: Record<string, string> = {
  business:  "bg-[#fcf6ee] text-[#efa609]",
  tech:      "bg-green-50 text-green-600",
  design:    "bg-yellow-50 text-yellow-600",
  education: "bg-red-50 text-red-500",
};

export default function RecommendedCard({ company }: RecommendedCardProps) {
  return (
    <article className="flex flex-col gap-4 p-6 border border-gray-200 bg-white min-h-full">
      {/* Top: logo + jobs count */}
      <div className="flex items-start justify-between gap-3">
        <CompanyLogo name={company.name} src={company.logo} size={48} />
        <span className="text-[14px] font-semibold text-indigo-600 whitespace-nowrap rounded-full bg-indigo-50 px-2 py-0.5">
          {company.jobs} Jobs
        </span>
      </div>

      {/* Body */}
      <div>
        <h3 className="font-clash text-[18px] font-semibold text-[#202430]">
          <Link
            href={`/companies/${company.id}`}
            className="hover:text-indigo-600 transition-colors"
          >
            {company.name}
          </Link>
        </h3>
        <p className="mt-1.5 text-[14px] leading-[1.55] text-gray-500">
          {company.description}
        </p>
      </div>

      {/* Tag */}
      <span
        className={`self-start mt-auto px-3 py-1.5 text-[12px] font-semibold rounded-full
          ${tagVariantStyles[company.tagVariant] ?? "bg-gray-100 text-gray-600"}`}
      >
        {company.tag}
      </span>
    </article>
  );
}