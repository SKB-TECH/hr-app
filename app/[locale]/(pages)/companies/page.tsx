import { CompaniesDirectory } from "@/components/platform/companies/CompaniesDirectory";
import ReusableHeroSection from "@/components/platform/jobs/HeroSection/ReusableHeroSection";
import { getTranslations } from "next-intl/server";

export default async function CompaniesPage() {
  const t = await getTranslations("companiesBrowse");

  return (
    <main className="w-full mx-auto p-0">
      {/* Hero — full width */}
      <ReusableHeroSection
        title={t("hero.title")}
        highlight={t("hero.highlight")}
        subtitle={t("hero.subtitle")}
        searchEnabled={true}
        popularTags={t.raw("hero.popularTags")}
        underlineSize="md"
      />

      <CompaniesDirectory />
    </main>
  );
}
