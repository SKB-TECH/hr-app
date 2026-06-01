// components/Searchbar.tsx
"use client";

import { useState } from "react";
import { MagnifyingGlassIcon, MapPinIcon } from "@heroicons/react/24/outline";

export interface SearchBarProps {
  placeholder?: string;
  locations?: string[];
  defaultLocation?: string;
  searchLabel?: string;
  popularLabel?: string;
  popularTags?: string[];
}

export default function SearchBar({
  placeholder = "Job title or keyword",
  locations = [
    "Florence, Italy",
    "Rome, Italy",
    "Milan, Italy",
    "New York, USA",
    "London, UK",
    "Paris, France",
    "Berlin, Germany",
    "Madrid, Spain",
  ],
  defaultLocation = "Florence, Italy",
  searchLabel = "Search my job",
  popularLabel = "Popular :",
  popularTags = ["UI Designer", "UX Researcher", "Android", "Admin"],
}: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState(defaultLocation);

  return (
    <div className="w-full">
      {/* Search box */}
      <div className="flex items-center bg-white  px-5 py-2 w-[660px] mb-4 shadow-[0_2px_16px_rgba(0,0,0,0.06)] focus-within:shadow-[0_4px_24px_rgba(70,64,222,0.14)] focus-within:ring-2 focus-within:ring-[#4640DE]/20 transition-all">

        {/* Magnifier */}
        <MagnifyingGlassIcon className="w-5 h-5 text-[#7C8493] shrink-0 mr-3" />

        {/* Job title input */}
        <input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 min-w-0 border-b border-b-gray-200 outline-none text-[13px] text-[#202430] placeholder:text-[#7C8493] bg-transparent py-3"
        />

        {/* Divider */}
        <div className="w-px h-7 bg-[#D6DDEB] mx-4 shrink-0" />

        {/* Location select */}
        <div className="flex items-center gap-2 shrink-0">
          <MapPinIcon className="w-5 h-5 text-[#7C8493] shrink-0" />
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="text-[13px] py-3 text-[#202430] bg-transparent border-b border-b-gray-200 outline-none cursor-pointer appearance-none pr-5"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none'%3E%3Cpath d='M4 6l4 4 4-4' stroke='%237C8493' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 0px center",
            }}
          >
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        {/* CTA */}
        <button className="ml-4 bg-[#4640DE] text-white font-bold text-[15px] px-8 py-4  border-none cursor-pointer whitespace-nowrap hover:bg-[#3730c4] transition-all">
          {searchLabel}
        </button>
      </div>

      {/* Popular tags */}
      <div className="flex items-center gap-2 flex-wrap text-[14px] text-[#515B6F]">
        <span>{popularLabel}</span>
        {popularTags.map((tag, i) => (
          <button
            key={tag}
            onClick={() => setQuery(tag)}
            className="font-semibold text-[#202430] hover:text-[#4640DE] transition-colors bg-transparent border-none cursor-pointer p-0 text-[14px]"
          >
            {tag}{i < popularTags.length - 1 ? "," : ""}
          </button>
        ))}
      </div>
    </div>
  );
}