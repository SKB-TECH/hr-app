"use client";

import { useRouter, usePathname } from "@/i18n/routing";
import { useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import useSearchQuery from "../../hooks/useSearchQuery";
import { useEffect } from "react";

function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const currentSearchParam = searchParams.get("search") || "";
  const { searchQuery, debouncedSearchQuery, setSearchQuery } =
    useSearchQuery(currentSearchParam);

  useEffect(() => {
    setSearchQuery(currentSearchParam);
  }, [currentSearchParam, setSearchQuery]);

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

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }, [debouncedSearchQuery, pathname, router, searchParams]);

  const handleSearchClick = () => {
    const params = new URLSearchParams(searchParams.toString());

    if (searchQuery.trim()) {
      params.set("search", searchQuery.trim());
    } else {
      params.delete("search");
    }

    params.delete("page");
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex border border-[#88888] items-stretch">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleSearchClick();
          }
        }}
        placeholder="Search for job titles..."
        className="flex-1 px-5 py-4 text-gray-500 placeholder-gray-400 outline-none text-md"
      />
      <button
        type="button"
        onClick={handleSearchClick}
        className="flex items-center justify-center px-5 bg-brand text-[#132745] hover:bg-brand-hover cursor-pointer duration-300"
        aria-label="Search"
      >
        <Search size={20} />
      </button>
    </div>
  );
}

export default SearchInput;
