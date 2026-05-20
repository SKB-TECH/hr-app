// hooks/useSearchQuery.ts
import { useState, useEffect } from "react";

function useSearchQuery(initialValue = "", delay = 500) {
  const [searchQuery, setSearchQuery] = useState(initialValue);
  const [debouncedSearchQuery, setDebouncedSearchQuery] =
    useState(initialValue);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, delay);

    return () => clearTimeout(timer);
  }, [searchQuery, delay]);

  return { debouncedSearchQuery, setSearchQuery };
}
export default useSearchQuery;
