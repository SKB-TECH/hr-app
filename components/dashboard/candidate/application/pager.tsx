"use client"
import { ChevronLeft, ChevronRight } from "lucide-react";

 
export default function Pager({
  currentPage,
  totalPages,
  onChange,
}: {
  currentPage: number;
  totalPages: number;
  onChange: (p: number) => void;
}) {
  const pages = [];
  for (let i = 1; i <= totalPages; i++) pages.push(i);
  return (
    <div className="flex items-center justify-center gap-2 mt-6">
      <button
        disabled={currentPage === 1}
        onClick={() => onChange(Math.max(1, currentPage - 1))}
        className="px-3 py-1 "
      >
        <ChevronLeft />
      </button>
      {pages.slice(0, 7).map((p) => (
        <button
          key={p}
          onClick={() => onChange(p)}
          className={`px-3 py-1 rounded ${p === currentPage ? "bg-indigo-600 text-white" : ""}`}
        >
          {p}
        </button>
      ))}
      <button
        disabled={currentPage === totalPages}
        onClick={() => onChange(Math.min(totalPages, currentPage + 1))}
        className="px-3 py-1 flex"
      >
        <ChevronRight/>
      </button>
    </div>
  );
}
