import type { CategoryCompany } from "@/data/companies";
import CompanyLogo from "./CompanyLogo";
import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";

type CategoryCompanyCardProps = {
  company: CategoryCompany;
};

export default async function CategoryCompanyCard({
  company,
}: CategoryCompanyCardProps) {
  const t = await getTranslations("companiesBrowse");
  return (
    <article className="flex  flex-col items-center gap-3 p-6 border border-gray-200 bg-white text-center">
      <CompanyLogo
        name={company.name}
        src={company.logo}
        size={56}
        className="mx-auto"
      />
      <h3 className="font-clash cursor-pointer hover:text-brand text-base font-semibold text-[#202430]">
        <Link href={`/companies/${company.id}`}>{company.name}</Link>
      </h3>
      <p className="text-[14px] text-gray-500">{t("shared.jobsCount", { count: company.jobs })}</p>
    </article>
  );
}
