import { CompaniesDirectory } from "@/components/platform/companies/CompaniesDirectory";
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

      <CompaniesDirectory />
    </main>
  );
}
