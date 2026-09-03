import Image from "next/image";
import { Building2 } from "lucide-react";
import type { Company } from "@/core/types/company";
import SharedCard from "@/components/common/navbar/SharedCard";
import { Link } from "@/i18n/routing";

export function CompanyCard({ company }: { company: Company }) {
  return (
    <SharedCard>
      <div className="flex justify-between items-start ">
        <div className="flex flex-col gap-2">
          {company.logo ? (
            <Image
              src={company.logo}
              alt={company.name}
              width={80}
              height={80}
              className="max-sm:w-[48px] max-sm:h-[48px] object-contain"
            />
          ) : (
            <span className="flex h-[80px] w-[80px] max-sm:h-[48px] max-sm:w-[48px] items-center justify-center bg-accent-light-brand text-brand">
              <Building2 className="h-8 w-8" />
            </span>
          )}
          <div className="flex flex-col ">
            <Link
              href={`/companies/${company.id}`}
              className="max-md:text-[20px] hover:text-brand text-[24px] font-semibold md:font-bold text-neutral-100 md:my-2 block"
            >
              {company.name}
            </Link>
            <p className="max-md:block hidden text-[16px]  md:font-bold text-neutral-100 mb-2 ">
              {company.location || "Remote"}
            </p>
          </div>
        </div>
        {company.industry && (
          <span className="bg-accent-light-brand text-brand px-3 text-sm py-1 ">
            {company.industry}
          </span>
        )}
      </div>
      <p className="text-neutral-80 text-[16px] mb-3 line-clamp-2 md:line-clamp-4">
        {company.description || "No description available."}
      </p>
      {company.techStack.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {company.techStack.map((tech) => (
            <span
              key={tech}
              className="text-[14px] px-4 py-1.5 rounded-full font-medium border border-indigo-100 bg-indigo-50 text-brand"
            >
              {tech}
            </span>
          ))}
        </div>
      )}
    </SharedCard>
  );
}
