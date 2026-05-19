"use client";
import { useEffect, useState } from "react";

const useSearchQuery = (delay: number = 300) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(searchQuery);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery.trim() === "") {
        setDebouncedSearchQuery("");
      } else {
        setDebouncedSearchQuery(searchQuery);
      }
    }, delay);
    return () => clearTimeout(timer);
  }, [searchQuery, delay]);

  return { debouncedSearchQuery, setSearchQuery };
};

export default useSearchQuery;
