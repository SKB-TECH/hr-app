import { Link } from "@/i18n/routing";
import { ArrowRight } from "lucide-react";
import { categoriesData, type CategoryProp } from "@/data/category";
import { SectionTitle } from "@/components/ui/Title";
import { getTranslations } from "next-intl/server";
import CategorySelectionPills from "./CategorySelectionPills";

export default async function SectionComponent() {
  const t = await getTranslations("common");
  return (
    <div className="px-4 sm:px-6 md:px-8 lg:px-12 w-full max-w-7xl mx-auto py-12 md:py-16">
      <section>
        <SectionTitle
          title={t("section.titlePrefix")}
          highlight={t("section.titleHighlight")}
          showAllText={t("section.showAllJobs")}
          showAllLink="/jobs"
          isExpanded
        />

        {/* Isolated Client Component for Category Selection Pills */}
        <CategorySelectionPills />

        <div className="mt-8 pb-5 md:pb-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {categoriesData.map((category: CategoryProp) => (
            <Link
              href={`/jobs?category=${encodeURIComponent(category.name.toLowerCase())}`}
              key={`category-card-${category.id}`}
              className="group relative bg-white border border-gray-200/90 rounded-none p-5 md:p-6 cursor-pointer
                         hover:border-[#4640DE] hover:shadow-[0_12px_30px_rgba(70,64,222,0.08)]
                         hover:-translate-y-1 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4640DE] transition-all duration-300
                         flex flex-row md:flex-col
                         items-center md:items-start
                         gap-4 md:gap-4
                         justify-between"
            >
              {/* Category Icon Container */}
              <div className="w-14 h-14 rounded-none bg-[#EEF2FF] flex items-center justify-center shrink-0 group-hover:bg-[#4640DE] transition-colors duration-300">
                <category.logo
                  width={30}
                  height={30}
                  aria-hidden="true"
                  className="transition-all duration-300 group-hover:brightness-0 group-hover:invert text-[#4640DE]"
                />
              </div>

              {/* Title & Jobs Count */}
              <div className="flex-1 flex flex-col gap-1 w-full">
                <h3 className="font-bold text-[#132745] group-hover:text-[#4640DE] text-lg md:text-xl transition-colors">
                  {category.name}
                </h3>
                <div className="flex flex-row items-center justify-between mt-1">
                  <span className="text-sm text-[#7C8493] font-medium">
                    {t("section.jobsAvailable", { count: category.availableJobs })}
                  </span>
                  <div className="w-8 h-8 rounded-none bg-gray-50 flex items-center justify-center text-[#132745] group-hover:bg-[#4640DE] group-hover:text-white transition-all duration-300 shrink-0">
                    <ArrowRight size={16} aria-hidden="true" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Show all jobs — mobile only */}
        <div className="md:hidden mt-4 text-center">
          <Link
            href="/jobs"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#4640DE] hover:text-[#3730C9] active:text-[#2A24A3] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4640DE]"
          >
            <span>{t("section.showAllJobs")}</span>
            <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}
