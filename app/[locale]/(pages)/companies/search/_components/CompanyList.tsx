"use client";
import { companies, sortOptions } from "@/data/companyPageData";
import { SharedListingHeader } from "@/components/shared/listing/SharedListingHeader";
import { CompanyCard } from "./CompanyCard";
import { useRef, useState } from "react";
import Pagination from "../../../jobs/ReusablePagination/ReusablePagination";

function CompanyList() {
  const listRef = useRef<HTMLDivElement>(null);
  const [viewGrid, setViewGrid] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const companiesToRender = 5;
  const totalPages = Math.ceil(companies.length / companiesToRender);
  const startIndex = (currentPage - 1) * companiesToRender;
  const endIndex = startIndex + companiesToRender;
  const paginatedCompanies = companies.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    listRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main className="flex-1 ">
      <SharedListingHeader
        totalResults={companies.length}
        sortOptions={sortOptions}
        viewGrid={viewGrid}
        setViewGrid={setViewGrid}
        header="All Companies"
      />

      <div
        ref={listRef}
        key={currentPage}
        className={
          viewGrid === true
            ? "grid grid-cols-1 md:grid-cols-2 gap-6 transition-all duration-300 ease-in-out animate-in fade-in slide-in-from-bottom-2"
            : "flex flex-col gap-6 transition-all duration-300 ease-in-out animate-in fade-in slide-in-from-bottom-2"
        }
      >
        {paginatedCompanies.map((company) => (
          <CompanyCard key={company.id} company={company} />
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </main>
  );
}

export default CompanyList;
