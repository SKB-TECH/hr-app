"use client";

import React, { useState, useEffect } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import CountrySelect from "@/components/ui/CountrySelect";
import { useRouter, usePathname } from "@/i18n/routing";
import { useSearchParams } from "next/navigation";
import { ArrowRight, Sparkles } from "lucide-react";

interface HeroSearchBarProps {
  popularTags?: string[];
}

const HeroSearchBar = ({ popularTags }: HeroSearchBarProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [keyword, setKeyword] = useState(searchParams.get("q") || "");
  const [location, setLocation] = useState(searchParams.get("location") || "");

  useEffect(() => {
    setKeyword(searchParams.get("q") || "");
    setLocation(searchParams.get("location") || "");
  }, [searchParams]);

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (keyword.trim()) {
      params.set("q", keyword.trim());
    } else {
      params.delete("q");
    }
    if (location.trim()) {
      params.set("location", location.trim());
    } else {
      params.delete("location");
    }
    params.delete("page");

    router.push(`${pathname}?${params.toString()}`);
  };

  const handleTagClick = (tag: string) => {
    setKeyword(tag);
    const params = new URLSearchParams(searchParams.toString());
    params.set("q", tag);
    params.delete("page");
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="w-full">
      {/* Search Bar Form with rounded-none */}
      <form
        onSubmit={handleSearch}
        className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 p-3 md:p-3.5 bg-white rounded-none shadow-[0_20px_50px_rgba(19,39,69,0.15)] border border-[#D6DDEB] mt-8 w-full transition-all"
      >
        {/* Keyword Search Input */}
        <div className="flex flex-1 items-center px-3 py-2">
          <MagnifyingGlassIcon className="mr-3 h-5 w-5 shrink-0 text-[#4640DE]" />
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Role, executive title, or skill..."
            className="w-full text-sm sm:text-base text-[#132745] placeholder:text-[#7C8493] outline-none bg-transparent font-medium"
          />
        </div>

        {/* Divider */}
        <div className="hidden md:block h-8 w-px bg-gray-200" />

        {/* Location Dropdown */}
        <div className="flex flex-1 items-center px-3 py-1">
          <CountrySelect
            value={location}
            onChange={(val) => {
              setLocation(val);
            }}
            placeholder="Select location or remote"
            className="h-auto rounded-none border-0 px-0 py-1 text-sm sm:text-base text-[#132745] w-full"
          />
        </div>

        {/* Search Submit Button */}
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#4640DE] hover:bg-[#3730C9] text-white font-bold text-sm rounded-none shadow-sm transition-all duration-300 cursor-pointer shrink-0"
        >
          <span>Search Roles</span>
          <ArrowRight size={16} />
        </button>
      </form>

      {/* Popular Role Tags */}
      {popularTags && popularTags.length > 0 && (
        <div className="mt-5 pb-8 flex flex-wrap items-center gap-2 text-xs sm:text-sm">
          <span className="text-white/70 font-medium mr-1 flex items-center gap-1.5">
            <Sparkles size={13} className="text-[#FFB836]" />
            <span>Popular:</span>
          </span>
          {popularTags.map((tag, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleTagClick(tag)}
              className={`px-3 py-1 rounded-none text-xs font-semibold transition-all cursor-pointer border ${
                keyword === tag
                  ? "bg-[#4640DE] text-white border-[#4640DE]"
                  : "bg-white/10 hover:bg-white/20 text-white/90 border-white/10"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default React.memo(HeroSearchBar);
