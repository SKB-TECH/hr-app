"use client";
import { companies, sortOptions } from "@/data/companyPageData";
import { SharedListingHeader } from "@/components/shared/listing/SharedListingHeader";
import { CompanyCard } from "./CompanyCard";
import { useState } from "react";

function CompanyList() {
  const [viewGrid, setViewGrid] = useState(true);

  return (
    <main className="flex-1">
      <SharedListingHeader
        totalResults={companies.length}
        sortOptions={sortOptions}
        viewGrid={viewGrid}
        setViewGrid={setViewGrid}
        header="All Companies"
      />

      <div
        className={
          viewGrid === true
            ? "grid grid-cols-1 md:grid-cols-2 gap-6 transition-all duration-300 ease-in-out"
            : "flex flex-col gap-6 transition-all duration-300 ease-in-out"
        }
      >
        {companies.map((company) => (
          <CompanyCard key={company.id} company={company} />
        ))}
      </div>
    </main>
  );
}

export default CompanyList;
