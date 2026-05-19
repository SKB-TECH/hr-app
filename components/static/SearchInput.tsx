"use client";

import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import useSearchQuery from "../../hooks/useSearchQuery";
import { fetchJob } from "../../services/job.service";

function SearchInput() {
  const { debouncedSearchQuery, setSearchQuery } = useSearchQuery();
  const [results, setResults] = useState([]);

  useEffect(() => {
    const performSearch = async () => {
      if (debouncedSearchQuery.trim()) {
        try {
          const jobs = await fetchJob(debouncedSearchQuery);
          console.log("Search Results:", jobs);
          setResults(jobs);
        } catch (error) {
          console.error("Search failed:", error);
        }
      }
    };

    performSearch();
  }, [debouncedSearchQuery]);

  return (
    <div className="flex mb-12 border border-gray-200">
      <input
        type="text"
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search for job titles..."
        className="flex-1 px-5 py-4 text-gray-500 placeholder-gray-400 outline-none text-sm"
      />
      <button
        className="flex items-center justify-center px-5 py-4 text-white"
        style={{ backgroundColor: "#00c896" }}
        aria-label="Search"
      >
        <Search size={20} />
      </button>
    </div>
  );
}

export default SearchInput;
