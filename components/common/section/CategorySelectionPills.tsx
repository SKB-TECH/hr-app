"use client";

import { useJobContext } from "@/context/JobContext";

const CATEGORY_PILLS = [
  "All",
  "Technology",
  "Engineering",
  "Design",
  "Business",
  "Marketing",
  "Human Resources",
];

export default function CategorySelectionPills() {
  const { category, handleSearch } = useJobContext();

  return (
    <div
      className="mt-6 flex flex-wrap items-center gap-2.5"
      role="group"
      aria-label="Filter jobs by category"
    >
      {CATEGORY_PILLS.map((pill) => {
        const isAll = pill === "All";
        const isActive = isAll
          ? !category
          : category.toLowerCase() === pill.toLowerCase();

        return (
          <button
            key={pill}
            type="button"
            aria-pressed={isActive}
            onClick={() =>
              handleSearch({ category: isAll ? "" : pill.toLowerCase() })
            }
            className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-none border transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4640DE] focus-visible:ring-offset-1 active:scale-95 ${
              isActive
                ? "bg-[#4640DE] text-white border-[#4640DE] shadow-sm"
                : "bg-white text-[#25324B] border-gray-200 hover:border-[#4640DE] hover:text-[#4640DE] active:bg-[#EEF2FF]"
            }`}
          >
            {pill}
          </button>
        );
      })}
    </div>
  );
}

