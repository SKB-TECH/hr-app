import type { CategoryCompany } from "@/data/companies";
import CompanyLogo from "./CompanyLogo";

type CategoryCompanyCardProps = {
  company: CategoryCompany;
};

export default function CategoryCompanyCard({ company }: CategoryCompanyCardProps) {
  return (
    <article className="category-company-card">
      <CompanyLogo
        name={company.name}
        src={company.logo}
        size={56}
        className="category-company-card__logo"
      />
      <h3 className="category-company-card__name">{company.name}</h3>
      <p className="category-company-card__jobs">{company.jobs} Jobs</p>
    </article>
  );
}
