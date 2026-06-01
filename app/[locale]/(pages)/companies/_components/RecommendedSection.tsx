import type { RecommendedCompany } from "@/data/companies";
import RecommendedCard from "./RecommendedCard";
import SectionHeader from "./SectionHeader";

type RecommendedSectionProps = {
  copy: {
    title: string;
    subtitle: string;
    showAllLabel: string;
  };
  companies: RecommendedCompany[];
};

export default function RecommendedSection({
  copy,
  companies,
}: RecommendedSectionProps) {
  return (
    <section aria-labelledby="recommended-heading" className="companies-section">
      <SectionHeader
        id="recommended-heading"
        title={copy.title}
        subtitle={copy.subtitle}
        action={
          <button type="button" className="btn-outline">
            {copy.showAllLabel}
          </button>
        }
      />

      <div className="companies-grid">
        {companies.map((company) => (
          <RecommendedCard key={company.id} company={company} />
        ))}
      </div>
    </section>
  );
}
