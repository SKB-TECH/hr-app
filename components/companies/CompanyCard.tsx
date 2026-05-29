import Image from "next/image";
import { Company } from "@/types/types";

interface CompanyCardProps {
  company: Company;
}

export function CompanyCard({ company }: CompanyCardProps) {
  return (
    <div className="border border-brand-light-neutral space-y-1 p-5 hover:shadow-sm transition-shadow cursor-pointer bg-white">
      <div className="flex justify-between items-start ">
        <div className="flex flex-col gap-2">
          <Image src={company.src} alt={company.name} width={80} height={80} />
          <h2 className="text-[24px] font-bold text-neutral-100 my-2 block">
            {company.name}
          </h2>
        </div>
        <span className="bg-accent-light-brand text-brand px-3 text-sm py-0.5 rounded-full">
          {company.availableJobs} Jobs
        </span>
      </div>
      <p className="text-neutral-80 text-[18px] mb-3 line-clamp-4">
        {company.description}
      </p>
      <div className="flex flex-wrap gap-2">
        {company.industry.map((tag, idx) => (
          <span
            key={idx}
            style={{
              backgroundColor: tag.style.bg,
              borderColor: tag.style.color,
              color: tag.style.color,
            }}
            className="text-[14px] px-4 py-1.5 rounded-full font-medium border"
          >
            {tag.name}
          </span>
        ))}
      </div>
    </div>
  );
}
