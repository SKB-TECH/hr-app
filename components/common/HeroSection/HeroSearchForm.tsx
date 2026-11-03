"use client";

import { Search, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CountrySelect from "@/components/ui/CountrySelect";
import { useJobContext } from "@/context/JobContext";

interface HeroSearchFormProps {
  searchPlaceholder: string;
  selectLocationOption: string;
  searchButtonLabel: string;
  popularLabel: string;
  popularItems: string[];
}

export default function HeroSearchForm({
  searchPlaceholder,
  selectLocationOption,
  searchButtonLabel,
  popularLabel,
  popularItems,
}: HeroSearchFormProps) {
  const { keyword, location, setKeyword, setLocation, handleSearch, isPending } =
    useJobContext();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch();
  };

  return (
    <div className="w-full max-w-3xl">
      {/* Floating Search Bar with rounded-none */}
      <form
        onSubmit={onSubmit}
        role="search"
        aria-label="Executive job search"
        className="mt-8 w-full bg-white rounded-none p-2 sm:p-2.5 shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/20 transition-all flex flex-col sm:flex-row items-stretch sm:items-center gap-2"
      >
        {/* Keyword Search Input */}
        <div className="flex-1 flex items-center gap-3 px-4 py-2 sm:py-0">
          <Search
            size={20}
            className="shrink-0 text-[#25324B]/60"
            aria-hidden="true"
          />
          <label htmlFor="hero-keyword-search" className="sr-only">
            {searchPlaceholder}
          </label>
          <Input
            id="hero-keyword-search"
            name="q"
            type="search"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder={searchPlaceholder}
            aria-label={searchPlaceholder}
            className="h-10 sm:h-12 border-0 rounded-none bg-transparent text-[#25324B] text-sm sm:text-base placeholder:text-[#7C8493] shadow-none focus-visible:ring-0 px-0"
          />
        </div>

        {/* Divider on Desktop */}
        <div className="hidden sm:block w-px h-8 bg-gray-200" aria-hidden="true" />

        {/* Location Select Input */}
        <div className="flex-1 flex items-center gap-2 px-3 py-2 sm:py-0">
          <MapPin
            size={20}
            className="shrink-0 text-[#25324B]/60"
            aria-hidden="true"
          />
          <div className="w-full">
            <label htmlFor="hero-location-select" className="sr-only">
              {selectLocationOption}
            </label>
            <CountrySelect
              id="hero-location-select"
              value={location}
              onChange={setLocation}
              placeholder={selectLocationOption}
              className="h-10 sm:h-12 border-0 rounded-none bg-transparent text-[#25324B] text-sm sm:text-base shadow-none px-0"
            />
          </div>
        </div>

        {/* Search CTA Button with rounded-none */}
        <Button
          type="submit"
          disabled={isPending}
          className="h-11 sm:h-12 px-7 rounded-none bg-[#4640DE] hover:bg-[#3730C9] active:bg-[#2A24A3] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#26A4FF] focus-visible:ring-offset-2 text-white font-bold text-sm sm:text-base shadow-sm transition-all cursor-pointer shrink-0"
        >
          {searchButtonLabel}
        </Button>
      </form>

      {/* Popular Searches / Category Selection Pills */}
      <div
        className="mt-5 flex flex-wrap items-center gap-2 text-xs sm:text-sm text-white/70"
        role="group"
        aria-label="Popular job searches"
      >
        <span className="font-medium text-white/90">{popularLabel}</span>
        {popularItems.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => handleSearch({ keyword: item })}
            className="px-3 py-1 rounded-none bg-white/10 hover:bg-white/20 active:bg-white/30 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#26A4FF] border border-white/10 text-white/90 hover:text-white transition-all cursor-pointer text-xs"
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}

