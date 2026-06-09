import {
  companiesPageCopy,
  recommendedCompanies,
} from "@/data/companies";
import RecommendedSection from "./_components/RecommendedSection";
import PostJobsCta from "./_components/PostJobsCta";
import CategorySection from "./_components/CategorySection";
import "./companies.css";

export default function CompaniesPage() {
  return (
    <main className="companies-page">
      <RecommendedSection
        copy={companiesPageCopy.recommended}
        companies={recommendedCompanies}
      />
      <PostJobsCta copy={companiesPageCopy.cta} />
      <CategorySection copy={companiesPageCopy.category} />
    </main>
  );
}
