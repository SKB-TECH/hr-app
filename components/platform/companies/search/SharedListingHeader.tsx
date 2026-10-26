"use client";

import { ChevronDown, LayoutGrid, StretchHorizontal } from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTranslations } from "next-intl";

interface SearchHeaderProps {
  totalResults: number;
  sortOptions: string[];
  viewGrid: boolean;
  setViewGrid: React.Dispatch<React.SetStateAction<boolean>>;
  header: string;
}

export function SharedListingHeader({
  totalResults,
  sortOptions,
  viewGrid,
  setViewGrid,
  header,
}: SearchHeaderProps) {
  const t = useTranslations("companiesBrowse");
  const [selectedSort, setSelectedSort] = useState(sortOptions[0] ?? "Sort");

  return (
    <div className="flex flex-col  ">
      <div className="flex  flex-row sm:items-center justify-between mb-8">
        <div>
          <h1 className="text-[28px] font-semibold font-clash text-neutral-100">
            {header}
          </h1>
          <p className="text-slate-500 text-sm mt-0.5">
            {t("listingHeader.showingResults", { count: totalResults })}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-500 max-sm:hidden">
              {t("listingHeader.sortByLabel")}
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#132745] bg-white border border-[#D6DDEB] px-3 py-1.5 rounded-none outline-none cursor-pointer hover:border-[#4640DE] transition"
                >
                  {selectedSort}
                  <ChevronDown size={14} className="text-slate-400" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-44 rounded-none border border-[#D6DDEB] shadow-md bg-white">
                <DropdownMenuRadioGroup
                  value={selectedSort}
                  onValueChange={setSelectedSort}
                >
                  {sortOptions.map((option) => (
                    <DropdownMenuRadioItem key={option} value={option} className="rounded-none cursor-pointer">
                      {option}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="h-6 w-px bg-slate-200 mx-1 hidden md:block" />
          <div className="hidden md:flex items-center border border-[#D6DDEB] bg-white p-0.5 rounded-none">
            <button
              className={`p-1.5 rounded-none transition cursor-pointer ${
                viewGrid
                  ? "bg-[#4640DE] text-white"
                  : "text-slate-400 hover:text-slate-700 bg-transparent"
              }`}
              aria-label={t("listingHeader.gridViewAriaLabel")}
              onClick={() => setViewGrid(true)}
            >
              <LayoutGrid size={18} />
            </button>
            <button
              className={`p-1.5 rounded-none transition cursor-pointer ${
                !viewGrid
                  ? "bg-[#4640DE] text-white"
                  : "text-slate-400 hover:text-slate-700 bg-transparent"
              }`}
              aria-label={t("listingHeader.listViewAriaLabel")}
              onClick={() => setViewGrid(false)}
            >
              <StretchHorizontal size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>

  );
}
