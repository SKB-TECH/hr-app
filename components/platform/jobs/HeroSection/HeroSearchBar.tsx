"use client";
import React, { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import DropDownSelector from "./DropDownSelector";

const locations = [
  "Florence, Italy",
  "New York, USA",
  "London, UK",
  "Paris, France",
];

interface HeroSearchBarProps {
  popularTags?: string[];
}

const HeroSearchBar = ({ popularTags }: HeroSearchBarProps) => {
  const [location, setLocation] = useState(locations[0]);
  const [keyword, setKeyword] = useState("");

  return (
    <>
      {/* Search bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-center gap-4 md:gap-5 px-4 md:px-5 py-4 md:py-0 w-full min-h-[104px] bg-white shadow-md mt-10 mx-auto">
        {/* Search Input */}
        <div className="flex flex-1 items-center md:ml-3">
          <MagnifyingGlassIcon className="mr-3 h-5 w-5 shrink-0 text-neutral-100" />

          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Job title or keyword"
            className="w-full py-2 placeholder:text-neutral-60 border-b-2 border-brand-light-neutral focus:outline-none"
          />
        </div>

        {/* Divider */}
        <div className="hidden md:block h-10 border-l border-brand-light-neutral" />

        {/* Location */}
        <div className="flex flex-1 items-center">
          <DropDownSelector
            items={locations}
            value={location}
            onChange={setLocation}
          />
        </div>

        {/* Search Button */}
        <button
          
          className="w-full md:w-auto bg-brand px-5 py-2 text-white transition hover:bg-brand-dark"
        >
          Search
        </button>
      </div>
      {popularTags && popularTags.length > 0 && (
        <p className="mt-4 text-[16px] text-neutral-80 font-epilogue pb-20">
          Popular:{" "}
          {popularTags.map((tag, index) => (
            <span key={index} className="inline-block mr-2">
              {tag}
            </span>
          ))}
        </p>
      )}
    </>
  );
};

export default React.memo(HeroSearchBar);
