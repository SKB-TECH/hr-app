import { companiesPageCopy, recommendedCompanies } from "@/data/companies";
import CategorySection from "@/components/platform/companies/CategorySection";
import PostJobsCta from "@/components/platform/companies/PostJobsCta";
import RecommendedSection from "@/components/platform/companies/RecommendedSection";
import ReusableHeroSection from "@/components/platform/jobs/HeroSection/ReusableHeroSection";

export default function CompaniesPage() {
  return (
    <main className="w-full mx-auto p-0">
      {/* Hero — full width */}
      <ReusableHeroSection
        title="Find your  "
        highlight=" dream company"
        subtitle="Find your next career at companies like HubSpot, Nike, and Dropbox"
        searchEnabled={true}
        popularTags={["UI Designer", "UX Researcher", "Android", "Admin"]}
        underlineSize="md"
      />

      {/* Constrained content sections */}
      <div className=" w-full max-w-7xl mx-auto px-4 md:px-12 pt-12">
        <RecommendedSection
          copy={companiesPageCopy.recommended}
          companies={recommendedCompanies}
        />
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 md:px-12  pt-12">
        <PostJobsCta copy={companiesPageCopy.cta} />
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 md:px-12  pt-12">
        <CategorySection copy={companiesPageCopy.category} />
      </div>
    </main>
  );
}