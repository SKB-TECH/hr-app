"use client";

import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Category, CategoryConfig, CategoryIcon } from "@/data/companies";
import type { LucideIcon } from "lucide-react";

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
  return (
    <div className="companies-category__tabs-wrap">
      <div ref={tabsRef} className="companies-category__tabs">
        {categoryConfig.map(({ id, label, icon }) => {
          const Icon = categoryIconMap[icon];
          const isActive = activeTab === id;

          return (
            <button
              key={id}
              type="button"
              onClick={() => onTabChange(id)}
              className={cn(
                "companies-category__tab",
                isActive && "companies-category__tab--active"
              )}
            >
              <Icon
                size={18}
                className={
                  isActive
                    ? "companies-category__tab-icon--active"
                    : "companies-category__tab-icon"
                }
              />
              {label}
            </button>
          );
        })}
      </div>
      <button
        type="button"
        onClick={onScroll}
        aria-label="Scroll categories"
        className="companies-category__scroll-btn"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
}
