"use client";

import React, {
  Suspense,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useTransition,
  type ReactNode,
} from "react";
import { useRouter, useSearchParams } from "next/navigation";

export interface JobSearchFilters {
  keyword: string;
  location: string;
  category: string;
}

export interface SavedJobInput {
  id: string;
  title?: string;
  companyName?: string | null;
  location?: string | null;
  category?: string | null;
}

export interface JobContextType {
  keyword: string;
  location: string;
  category: string;
  filters: JobSearchFilters;
  isPending: boolean;
  setKeyword: (keyword: string) => void;
  setLocation: (location: string) => void;
  setCategory: (category: string) => void;
  setFilters: React.Dispatch<React.SetStateAction<JobSearchFilters>>;
  resetFilters: () => void;
  handleSearch: (overrideFilters?: Partial<JobSearchFilters>) => void;
  savedJobs: string[];
  bookmarkedJobIds: string[];
  toggleSaveJob: (job: string | SavedJobInput) => void;
  toggleBookmark: (job: string | SavedJobInput) => void;
  isJobSaved: (jobId: string) => boolean;
  isBookmarked: (jobId: string) => boolean;
  clearSavedJobs: () => void;
}

const STORAGE_KEY = "fast2hire_saved_jobs";

const JobContext = createContext<JobContextType | undefined>(undefined);

function SearchParamsSynchronizer({
  onSync,
}: {
  onSync: (params: URLSearchParams) => void;
}) {
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams) {
      onSync(new URLSearchParams(searchParams.toString()));
    }
  }, [searchParams, onSync]);

  return null;
}

export function JobProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [filters, setFilters] = useState<JobSearchFilters>({
    keyword: "",
    location: "",
    category: "",
  });

  const [savedJobs, setSavedJobs] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          return parsed.map(String);
        }
      }
    } catch {
      // Ignore storage errors
    }
    return [];
  });

  const syncFromSearchParams = useCallback((params: URLSearchParams) => {
    const q = params.get("q") ?? params.get("keyword") ?? "";
    const loc = params.get("location") ?? "";
    const cat = params.get("category") ?? "";
    setFilters((prev) => {
      if (prev.keyword === q && prev.location === loc && prev.category === cat) {
        return prev;
      }
      return { keyword: q, location: loc, category: cat };
    });
  }, []);

  const setKeyword = useCallback((keyword: string) => {
    setFilters((prev) => ({ ...prev, keyword }));
  }, []);

  const setLocation = useCallback((location: string) => {
    setFilters((prev) => ({ ...prev, location }));
  }, []);

  const setCategory = useCallback((category: string) => {
    setFilters((prev) => ({ ...prev, category }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({ keyword: "", location: "", category: "" });
    startTransition(() => {
      router.push("/jobs");
    });
  }, [router]);

  const handleSearch = useCallback(
    (overrideFilters?: Partial<JobSearchFilters>) => {
      const nextKeyword = (overrideFilters?.keyword ?? filters.keyword).trim();
      const nextLocation = (overrideFilters?.location ?? filters.location).trim();
      const nextCategory = (overrideFilters?.category ?? filters.category).trim();

      setFilters({
        keyword: nextKeyword,
        location: nextLocation,
        category: nextCategory,
      });

      const params = new URLSearchParams();
      if (nextKeyword) params.set("q", nextKeyword);
      if (nextLocation) params.set("location", nextLocation);
      if (nextCategory) params.set("category", nextCategory);

      const queryString = params.toString();
      const targetUrl = `/jobs${queryString ? `?${queryString}` : ""}`;

      startTransition(() => {
        router.push(targetUrl);
      });
    },
    [filters.keyword, filters.location, filters.category, router],
  );

  const toggleSaveJob = useCallback((job: string | SavedJobInput) => {
    const normalizedId = String(typeof job === "string" ? job : job.id);
    setSavedJobs((prev) => {
      const exists = prev.includes(normalizedId);
      const updated = exists
        ? prev.filter((id) => id !== normalizedId)
        : [...prev, normalizedId];
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // Ignore storage write errors
      }
      return updated;
    });
  }, []);

  const isJobSaved = useCallback(
    (jobId: string) => savedJobs.includes(String(jobId)),
    [savedJobs],
  );

  const clearSavedJobs = useCallback(() => {
    setSavedJobs([]);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore storage errors
    }
  }, []);

  const value = useMemo<JobContextType>(
    () => ({
      keyword: filters.keyword,
      location: filters.location,
      category: filters.category,
      filters,
      isPending,
      setKeyword,
      setLocation,
      setCategory,
      setFilters,
      resetFilters,
      handleSearch,
      savedJobs,
      bookmarkedJobIds: savedJobs,
      toggleSaveJob,
      toggleBookmark: toggleSaveJob,
      isJobSaved,
      isBookmarked: isJobSaved,
      clearSavedJobs,
    }),
    [
      filters,
      isPending,
      setKeyword,
      setLocation,
      setCategory,
      resetFilters,
      handleSearch,
      savedJobs,
      toggleSaveJob,
      isJobSaved,
      clearSavedJobs,
    ],
  );

  return (
    <JobContext.Provider value={value}>
      <Suspense fallback={null}>
        <SearchParamsSynchronizer onSync={syncFromSearchParams} />
      </Suspense>
      {children}
    </JobContext.Provider>
  );
}

export function useJobContext(): JobContextType {
  const context = useContext(JobContext);
  if (!context) {
    throw new Error("useJobContext must be used within a JobProvider");
  }
  return context;
}
