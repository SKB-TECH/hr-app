import { Link } from "@/i18n/routing";
import { ArrowRight } from "lucide-react";
import { categoriesData } from "@/data/category";
import { CategoryProp } from "@/data/category";
import { SectionTitle } from "@/components/ui/Title";
import { getTranslations } from "next-intl/server";

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

        <div className="mt-8 pb-5 md:pb-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {categoriesData.map((category: CategoryProp) => (
            <Link
              href={`/jobs?category=${category.name.toLowerCase()}`}
              key={category.id}
              className="group relative bg-white border border-gray-200/90 rounded-none p-5 md:p-6 cursor-pointer
                         hover:border-[#4640DE] hover:shadow-[0_12px_30px_rgba(70,64,222,0.08)]
                         hover:-translate-y-1 transition-all duration-300
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
                    <ArrowRight size={16} />
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
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#4640DE] hover:text-[#3730C9]"
          >
            <span>{t("section.showAllJobs")}</span>
            <ArrowRight size={15} />
          </Link>
        </div>
      </section>
    </div>
  );
}
