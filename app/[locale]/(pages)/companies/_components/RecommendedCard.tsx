import type { RecommendedCompany } from "@/data/companies";
import CompanyLogo from "./CompanyLogo";

type RecommendedCardProps = {
  company: RecommendedCompany;
};

export default function RecommendedCard({ company }: RecommendedCardProps) {
  return (
    <article className="company-card">
      <div className="company-card__top">
        <CompanyLogo name={company.name} src={company.logo} size={48} />
        <span className="company-card__jobs">{company.jobs} Jobs</span>
      </div>

      <div className="company-card__body">
        <h3 className="company-card__name">{company.name}</h3>
        <p className="company-card__desc">{company.description}</p>
      </div>

      <span
        className={`company-card__tag company-card__tag--${company.tagVariant}`}
      >
        {company.tag}
      </span>
    </article>
  );
}
