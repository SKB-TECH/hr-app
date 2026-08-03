"use client";

import { Search } from "lucide-react";

export default function SearchInput() {
  return (
    <div className="relative">
      <Search
        className="absolute left-4 top-1/2 -translate-y-1/2
        h-6 w-6 text-gray-400"
      />

      <input
        type="text"
        placeholder="Search Applicants"
        className="
        h-12
        w-full
        md:w-72
        border
        border-neutral-20
        pl-12
        pr-4
        outline-none
        transition
        focus:border-neutral-40
        text-neutral-60
        "
      />
    </div>
  );
}
