import CompanyList from "@/components/platform/companies/search/CompanyList";
import SharedDisplayMobileFilter from "@/components/platform/companies/search/SharedDisplayMobileFilter";
import { SidebarFilters } from "@/components/platform/companies/search/SidebarFilters";
import ReusableHeroSection from "@/components/platform/jobs/HeroSection/ReusableHeroSection";
import { mockSidebarCompanyFilters } from "@/data/companyPageData";
import { getTranslations } from "next-intl/server";

async function SearchCompaniesPage() {
  const t = await getTranslations("companiesBrowse");

  return (
    <section className="min-h-screen relative">
      <ReusableHeroSection
        title={t("searchHero.title")}
        highlight={t("searchHero.highlight")}
        subtitle={t("searchHero.subtitle")}
        searchEnabled={true}
        popularTags={t.raw("searchHero.popularTags")}
        underlineSize="lg"
      />
      <SharedDisplayMobileFilter DataToFilter={mockSidebarCompanyFilters} />
      <div className="py-16 pt-4 px-4 md:px-12   w-full max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="hidden md:block">
            <SidebarFilters
              isCollapsible={false}
              sidebarFilterData={mockSidebarCompanyFilters}
            />
          </div>

          <CompanyList search="" />
        </div>
      </div>
    </section>
  );
}
export default SearchCompaniesPage;
