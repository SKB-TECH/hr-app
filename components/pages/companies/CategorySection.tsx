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
  const tabsRef = useRef<HTMLDivElement>(null);

  const companies = companiesByCategory[activeTab];
  const resultCount = categoryResultCounts[activeTab];
  const activeLabel =
    categoryConfig.find((c) => c.id === activeTab)?.label ?? activeTab;

  const scrollTabs = useCallback(() => {
    tabsRef.current?.scrollBy({ left: 200, behavior: "smooth" });
  }, []);

  return (
    <section aria-labelledby="category-heading" className="companies-section">
      <SectionHeader id="category-heading" title={copy.title} />

      <CategoryTabs
        categoryConfig={categoryConfig}
        categoryIconMap={categoryIconMap}
        activeTab={activeTab}
        onTabChange={(tab) => {
  console.log("clicked:", tab);
  setActiveTab(tab);
}}
        tabsRef={tabsRef}
        onScroll={scrollTabs}
      />

      <div className="companies-category__results">
        <LayoutGrid size={18} className="companies-category__results-icon" />
        <span>
          {resultCount} {copy.resultsSuffix}
        </span>
      </div>

      <div className="companies-category__grid">
        {companies.map((company) => (
          <CategoryCompanyCard key={company.id} company={company} />
        ))}
      </div>

      <a href="#" className="companies-category__view-more">
        {copy.viewMorePrefix} {activeLabel} {copy.viewMoreSuffix}
        <span aria-hidden>→</span>
      </a>
    </section>
  );
}
