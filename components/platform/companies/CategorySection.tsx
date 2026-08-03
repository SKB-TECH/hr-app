"use client";

import { useCallback, useRef, useState } from "react";
import {
  Briefcase,
  Code2,
  Landmark,
  LayoutGrid,
  Palette,
  Server,
  Book,
  Heart,
  Film,
  Map,
  Coffee,
} from "lucide-react";
import {
  categoryConfig,
  categoryResultCounts,
  companiesByCategory,
  type Category,
  type CategoryIcon,
} from "@/data/companies";
import CategoryTabs from "./CategoryTabs";
import CategoryCompanyCard from "./CategoryCompanyCard";
import SectionHeader from "./SectionHeader";

const categoryIconMap: Record<CategoryIcon, typeof Palette> = {
  palette: Palette,
  landmark: Landmark,
  server: Server,
  briefcase: Briefcase,
  code: Code2,
  book: Book,
  heart: Heart,
  film: Film,
  map: Map,
  coffee: Coffee,
};

const VISIBLE_LIMIT = 8;

type CategorySectionProps = {
  copy: {
    title: string;
    resultsSuffix: string;
    viewMorePrefix: string;
    viewMoreSuffix: string;
  };
};

export default function CategorySection({ copy }: CategorySectionProps) {
  const [activeTab, setActiveTab] = useState<Category>("Design");
  const [showAll, setShowAll] = useState(false);
  const tabsRef = useRef<HTMLDivElement>(null);

  const companies = companiesByCategory[activeTab];
  const resultCount = categoryResultCounts[activeTab];
  const activeLabel =
    categoryConfig.find((c) => c.id === activeTab)?.label ?? activeTab;

  function handleTabChange(tab: Category) {
    setActiveTab(tab);
    setShowAll(false);
  }

  const scrollTabs = useCallback(() => {
    tabsRef.current?.scrollBy({ left: 200, behavior: "smooth" });
  }, []);

  const hasMore = companies.length > VISIBLE_LIMIT;
  const visibleCompanies = showAll
    ? companies
    : companies.slice(0, VISIBLE_LIMIT);

  return (
    <section aria-labelledby="category-heading" className="mb-14">
      <SectionHeader id="category-heading" title={copy.title} />

      <CategoryTabs
        categoryConfig={categoryConfig}
        categoryIconMap={categoryIconMap}
        activeTab={activeTab}
        onTabChange={handleTabChange}
        tabsRef={tabsRef}
        onScroll={scrollTabs}
      />

      {/* Results count */}
      <div className="flex items-center gap-2 mb-5 text-[14px] font-semibold text-gray-500">
        <LayoutGrid size={18} className="text-brand" />
        <span>
          {resultCount} {copy.resultsSuffix}
        </span>
      </div>

      {/* Company grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {visibleCompanies.map((company) => (
          <CategoryCompanyCard key={company.id} company={company} />
        ))}
      </div>

      {hasMore && (
        <button
          type="button"
          onClick={() => setShowAll((prev) => !prev)}
          className="inline-flex cursor-pointer items-center gap-1.5 mt-6 text-[15px] font-semibold text-brand hover:underline"
        >
          {showAll
            ? `Show less ${activeLabel}`
            : `${copy.viewMorePrefix} ${activeLabel} ${copy.viewMoreSuffix}`}
          <span aria-hidden>{showAll ? "↑" : "→"}</span>
        </button>
      )}
    </section>
  );
}
