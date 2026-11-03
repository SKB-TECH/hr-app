"use client";

import React from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import CountrySelect from "@/components/ui/CountrySelect";
import { useJobContext } from "@/context/JobContext";

interface HeroSearchBarProps {
  popularTags?: string[];
}

const HeroSearchBar = ({ popularTags }: HeroSearchBarProps) => {
  const { keyword, location, setKeyword, setLocation, handleSearch, isPending } =
    useJobContext();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch();
  };

  return (
    <>
      {/* Search bar */}
      <form
        onSubmit={onSubmit}
        role="search"
        aria-label="Search jobs by keyword and location"
        className="flex flex-col md:flex-row items-stretch md:items-center justify-center gap-4 md:gap-5 px-4 md:px-5 py-4 md:py-0 w-full min-h-[104px] bg-white shadow-md mt-10 mx-auto"
      >
        {/* Search Input */}
        <div className="flex flex-1 items-center md:ml-3">
          <MagnifyingGlassIcon
            className="mr-3 h-5 w-5 shrink-0 text-neutral-100"
            aria-hidden="true"
          />
          <label htmlFor="jobs-hero-keyword" className="sr-only">
            Job title or keyword
          </label>
          <input
            id="jobs-hero-keyword"
            name="q"
            type="search"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Job title or keyword"
            aria-label="Job title or keyword"
            className="w-full py-2 placeholder:text-neutral-60 border-b-2 border-brand-light-neutral focus:border-brand focus:outline-none transition-colors"
          />
        </div>

        {/* Divider */}
        <div
          className="hidden md:block h-10 border-l border-brand-light-neutral"
          aria-hidden="true"
        />

        {/* Location */}
        <div className="flex flex-1 items-center">
          <label htmlFor="jobs-hero-location" className="sr-only">
            Select location
          </label>
          <CountrySelect
            id="jobs-hero-location"
            value={location}
            onChange={setLocation}
            placeholder="Select location"
            className="h-auto rounded-none border-0 border-b-2 border-brand-light-neutral px-0 py-2"
          />
        </div>

        {/* Search Button */}
        <button
          type="submit"
          disabled={isPending}
          className="w-full md:w-auto bg-brand hover:bg-[#3730C9] active:bg-[#2A24A3] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 px-6 py-2.5 text-white font-semibold transition-all cursor-pointer disabled:opacity-60"
        >
          Search
        </button>
      </form>

      {popularTags && popularTags.length > 0 && (
        <div
          className="mt-4 flex flex-wrap items-center gap-2 text-[15px] text-neutral-80 font-epilogue pb-20"
          role="group"
          aria-label="Popular job tags"
        >
          <span className="font-medium">Popular:</span>
          {popularTags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => handleSearch({ keyword: tag })}
              className="px-2.5 py-0.5 text-sm border border-brand-light-neutral bg-white/80 hover:border-brand hover:text-brand active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand transition-all cursor-pointer"
            >
              {tag}
            </button>
          ))}
        </div>
      )}
    </>
  );
};

export default React.memo(HeroSearchBar);
