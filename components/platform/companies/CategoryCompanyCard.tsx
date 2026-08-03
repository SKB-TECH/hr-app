import type { CategoryCompany } from "@/data/companies";
import CompanyLogo from "./CompanyLogo";
import Link from "next/link";

type CategoryCompanyCardProps = {
  company: CategoryCompany;
};

export default function CategoryCompanyCard({
  company,
}: CategoryCompanyCardProps) {
  return (
    <article className="flex  flex-col items-center gap-3 p-6 border border-gray-200 bg-white text-center">
      <CompanyLogo
        name={company.name}
        src={company.logo}
        size={56}
        className="mx-auto"
      />
      <h3 className="font-clash cursor-pointer hover:text-brand text-base font-semibold text-[#202430]">
        <Link href={`/en/companies/${company.id}`}>{company.name}</Link>
      </h3>
      <p className="text-[14px] text-gray-500">{company.jobs} Jobs</p>
    </article>
  );
}
