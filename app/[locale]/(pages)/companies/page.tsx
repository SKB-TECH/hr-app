"use client";

import { companiesPageCopy, recommendedCompanies } from "@/data/companies";
import RecommendedSection from "@/components/pages/companies/RecommendedSection";
import PostJobsCta from "@/components/pages/companies/PostJobsCta";
import CategorySection from "@/components/pages/companies/CategorySection";
import ReusableHeroSection from "@/components/pages/jobs/HeroSection/ReusableHeroSection";
import "./companies.css";

export default function CompaniesPage() {
  return (
    <main className="companies-page ">
      <ReusableHeroSection
        title="Find your  "
        highlight=" dream company"
        subtitle="Find your next career at companies like HubSpot, Nike, and Dropbox"
        searchEnabled={true}
        popularTags={["UI Designer", "UX Researcher", "Android", "Admin"]}
      />
      <RecommendedSection
        copy={companiesPageCopy.recommended}
        companies={recommendedCompanies}
      />
      <PostJobsCta copy={companiesPageCopy.cta} />
      <CategorySection copy={companiesPageCopy.category} />
    </main>
  );
}
