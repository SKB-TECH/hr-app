// components/PaginationWrapper.tsx
"use client";

import { useState } from "react";
import Pagination from "./ReusablePagination";

export default function PaginationWrapper() {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="flex flex-col md:flex-row items-center justify-center mt-8">
      <Pagination
        currentPage={currentPage}
        totalPages={5}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
