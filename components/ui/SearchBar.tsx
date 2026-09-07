
"use client";

import { useState } from "react";
import { MagnifyingGlassIcon, MapPinIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";
import CountrySelect from "@/components/ui/CountrySelect";

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
  defaultLocation = "",
  searchLabel = "Search my job",
  popularLabel = "Popular :",
  popularTags = ["UI Designer", "UX Researcher", "Android", "Admin"],
}: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState(defaultLocation);

  return (
    <div className="w-full max-w-[700px]">

      {/* Search bar */}
      <div className="flex flex-col sm:flex-row items-stretch bg-white mb-5 px-4
                      shadow-[0_2px_20px_rgba(0,0,0,0.07)]
                      focus-within:shadow-[0_4px_28px_rgba(70,64,222,0.15)]
                      transition-all">

        {/* Job title input */}
        <div className="flex items-center flex-1 px-3 py-2">
          <MagnifyingGlassIcon className="w-5 h-5 text-[#7C8493] shrink-0 mr-3" />
          <input
            type="text"
            placeholder={placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 min-w-0 outline-none text-[14px] text-[#202430] placeholder:text-[#7C8493] bg-transparent py-4 border-b border-b-[#D6DDEB]"
          />
        </div>

        <div className="h-px sm:h-auto sm:w-px bg-[#D6DDEB] sm:my-4" />

        {/* Location select */}
        <div className="flex items-center gap-2 px-3 py-2">
          <MapPinIcon className="w-5 h-5 text-[#7C8493] shrink-0" />
          <CountrySelect
            value={location}
            onChange={setLocation}
            placeholder="Sélectionner un pays"
            className="min-w-[190px] rounded-none border-0 border-b border-b-[#D6DDEB] px-0 py-4 text-[14px]"
          />
        </div>

        <Button  variant="ghost" className="w-full sm:w-auto  text-white font-bold text-[15px] px-10 py-5 border-none cursor-pointer whitespace-nowrap transition-all">
          {searchLabel}
        </Button>
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
