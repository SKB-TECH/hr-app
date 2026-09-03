"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Category, CategoryConfig, CategoryIcon } from "@/data/companies";
import type { LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";

type CategoryTabsProps = {
  categoryConfig: CategoryConfig[];
  categoryIconMap: Record<CategoryIcon, LucideIcon>;
  activeTab: Category;
  onTabChange: (tab: Category) => void;
  tabsRef: React.RefObject<HTMLDivElement | null>;
  onScroll: () => void;
};

export default function CategoryTabs({
  categoryConfig,
  categoryIconMap,
  activeTab,
  onTabChange,
  tabsRef,
  onScroll,
}: CategoryTabsProps) {
  const t = useTranslations("companiesBrowse");
  const scrollLeft = () => {
    tabsRef.current?.scrollBy({ left: -200, behavior: "smooth" });
  };

  return (
    <div className="flex items-center gap-3 mb-6">
      {/* Scroll left button */}
      <button
        type="button"
        onClick={scrollLeft}
        aria-label={t("categoryTabs.scrollLeft")}
        className="flex flex-shrink-0 items-center justify-center w-10 h-10 rounded-full bg-brand text-white cursor-pointer"
      >
        <ChevronLeft size={18} />
      </button>

      {/* Tabs scrollable row */}
      <div
        ref={tabsRef}
        className="flex flex-1 gap-3 overflow-x-auto scroll-snap-x [scroll-snap-type:x_mandatory] scrollbar-hide pb-1"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {categoryConfig.map(({ id, label, icon }) => {
          const Icon = categoryIconMap[icon];
          const isActive = activeTab === id;

          return (
            <button
              key={id}
              type="button"
              onClick={() => onTabChange(id)}
              className={cn(
                "inline-flex flex-shrink-0 items-center gap-2 px-12 py-9 border text-base font-semibold cursor-pointer transition-colors duration-200 scroll-snap-align-start",
                isActive
                  ? "bg-brand border-brand text-white"
                  : "bg-white border-gray-200 text-[#202430] hover:bg-indigo-50",
              )}
            >
              <Icon
                size={18}
                className={isActive ? "text-white" : "text-brand"}
              />
              {label}
            </button>
          );
        })}
      </div>

      {/* Scroll right button */}
      <button
        type="button"
        onClick={onScroll}
        aria-label={t("categoryTabs.scrollRight")}
        className="flex flex-shrink-0 items-center justify-center w-10 h-10 rounded-full bg-brand text-white cursor-pointer"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
}
