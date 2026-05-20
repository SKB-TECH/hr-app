"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import useSearchQuery from "../../hooks/useSearchQuery";
import { useEffect } from "react";

function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get("search") || "";
  const { debouncedSearchQuery, setSearchQuery } =
    useSearchQuery(initialSearch);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    const currentSearch = params.get("search") || "";

    if (debouncedSearchQuery === currentSearch) return;

    if (debouncedSearchQuery.trim()) {
      params.set("search", debouncedSearchQuery);
    } else {
      params.delete("search");
    }

    params.delete("page");

    router.push(`?${params.toString()}`, { scroll: false });
  }, [debouncedSearchQuery, router, searchParams]);

  const currentSearch = searchParams.get("search") || "";

  return (
    <div className="flex border border-[#88888] items-stretch">
      <input
        type="text"
        onChange={(e) => setSearchQuery(e.target.value)}
        defaultValue={currentSearch}
        placeholder="Search for job titles..."
        className="flex-1 px-5 py-4 text-gray-500 placeholder-gray-400 outline-none text-md"
      />
      <button
        className="flex items-center justify-center px-5 bg-brand text-[#132745] hover:bg-brand-hover cursor-pointer duration-300"
        aria-label="Search"
      >
        <Search size={20} />
      </button>
    </div>
  );
}

export default SearchInput;
