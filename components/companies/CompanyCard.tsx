import Image from "next/image";
import { Company } from "@/types/types";

interface CompanyCardProps {
  company: Company;
}

export function CompanyCard({ company }: CompanyCardProps) {
  return (
    <div className="border border-brand-light-neutral rounded-sm space-y-1 p-5 hover:shadow-sm transition-shadow cursor-pointer bg-white">
      <div className="flex justify-between items-start ">
        <div className="flex flex-col gap-2">
          <Image
            src={company.src}
            alt={company.name}
            width={80}
            height={80}
            className="max-sm:w-[48px] max-sm:h-[48px]"
          />
          <div className="flex flex-col ">
            <h2 className="max-md:text-[20px] text-[24px] font-semibold md:font-bold text-neutral-100 md:my-2 block">
              {company.name}
            </h2>
            <p className="max-md:block hidden text-[16px]  md:font-bold text-neutral-100 mb-2 ">
              {company.location}
            </p>
          </div>
        </div>
        <span className="bg-accent-light-brand text-brand px-3 text-sm py-1 ">
          {company.availableJobs} Jobs
        </span>
      </div>
      <p className="text-neutral-80 text-[16px] mb-3 line-clamp-2 md:line-clamp-4">
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
