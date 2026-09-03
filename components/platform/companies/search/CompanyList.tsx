"use client";
import { sortOptions } from "@/data/companyPageData";
import { CompanyCard } from "./CompanyCard";
import { useRef, useState } from "react";
import Pagination from "../../jobs/ReusablePagination/ReusablePagination";
import { SharedListingHeader } from "./SharedListingHeader";
import { SectionSkeleton } from "@/components/dashboard/candidate/applicant/profile/shared/Skeleton";
import { useCompanies } from "@/core/hooks/company/use-companies";

interface CompanyListProps {
  search: string;
}

function CompanyList({ search }: CompanyListProps) {
  const listRef = useRef<HTMLDivElement>(null);
  const [viewGrid, setViewGrid] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastSearch, setLastSearch] = useState(search);
  const pageSize = 6;

  // Reset to page 1 whenever the search term changes, without a setState-in-effect
  // cascade: https://react.dev/learn/you-might-not-need-an-effect#adjusting-some-state-when-a-prop-changes
  if (search !== lastSearch) {
    setLastSearch(search);
    setCurrentPage(1);
  }

  const { data: companiesPage, isLoading, isError } = useCompanies({ search, page: currentPage, limit: pageSize });
  const companies = companiesPage?.data ?? [];
  const totalResults = companiesPage?.meta?.totalItems ?? companies.length;
  const totalPages = companiesPage?.meta?.totalPages ?? 1;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    listRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main className="flex-1 ">
      <SharedListingHeader
        totalResults={totalResults}
        sortOptions={sortOptions}
        viewGrid={viewGrid}
        setViewGrid={setViewGrid}
        header="All Companies"
      />

      {isLoading && <SectionSkeleton rows={4} />}

      {!isLoading && isError && (
        <p className="text-[14px] text-gray-500">
          We couldn&apos;t load companies right now. Please refresh the page to try again.
        </p>
      )}

      {!isLoading && !isError && companies.length === 0 && (
        <p className="text-[14px] text-gray-500">No companies match your search right now.</p>
      )}

      {!isLoading && !isError && companies.length > 0 && (
        <div
          ref={listRef}
          key={currentPage}
          className={
            viewGrid === true
              ? "grid grid-cols-1 md:grid-cols-2 gap-6 transition-all duration-300 ease-in-out animate-in fade-in slide-in-from-bottom-2"
              : "flex flex-col gap-6 transition-all duration-300 ease-in-out animate-in fade-in slide-in-from-bottom-2"
          }
        >
          {companies.map((company) => (
            <CompanyCard key={company.id} company={company} />
          ))}
        </div>
      )}

      {!isLoading && !isError && totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
      )}
    </main>
  );
}

export default CompanyList;
