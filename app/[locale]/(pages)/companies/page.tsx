import { companiesPageCopy, recommendedCompanies } from "@/data/companies";
import RecommendedSection from "@/components/pages/companies/RecommendedSection";
import PostJobsCta from "@/components/pages/companies/PostJobsCta";
import CategorySection from "@/components/pages/companies/CategorySection";
import "./companies.css";

export default function CompaniesPage() {
  return (
    <main className="companies-page px-4 md:px-12   w-full max-w-7xl mx-auto">
      <RecommendedSection
        copy={companiesPageCopy.recommended}
        companies={recommendedCompanies}
      />
      <PostJobsCta copy={companiesPageCopy.cta} />
      <CategorySection copy={companiesPageCopy.category} />
    </main>
  );
}
