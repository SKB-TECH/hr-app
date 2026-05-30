import { LayoutGrid, StretchHorizontal } from "lucide-react";

interface SearchHeaderProps {
  totalResults: number;
  sortOptions: string[];
  viewGrid: boolean;
  setViewGrid: React.Dispatch<React.SetStateAction<boolean>>;
}

export function SearchHeader({
  totalResults,
  sortOptions,
  viewGrid,
  setViewGrid,
}: SearchHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
      <div>
        <h1 className="text-[32px] font-semibold font-clash text-neutral-100">
          All Companies
        </h1>
        <p className="text-slate-500 text-[16px] mt-1">
          Showing {totalResults} results
        </p>
      </div>

      <div className="flex items-center gap-4 mt-4 sm:mt-0">
        <div className="flex items-center gap-2">
          <span className="text-[16px] text-slate-500">Sort by:</span>
          <select className="text-[16px] font-medium text-neutral-100 bg-transparent border-none focus:ring-0 cursor-pointer pr-8 py-0">
            {sortOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="h-8 w-2px bg-slate-200 mx-1 hidden sm:block" />

        <div className="flex items-center gap-1 p-1 rounded-lg">
          <button
            className={`p-1.5 rounded-md transition ${
              viewGrid
                ? "bg-brand/6 text-brand"
                : "text-slate-400 hover:text-slate-600"
            }`}
            aria-label="Grid view"
            onClick={() => setViewGrid(true)}
          >
            <LayoutGrid size={20} />
          </button>
          <button
            className={`p-1.5 rounded-md transition ${
              !viewGrid
                ? "bg-brand/6 text-brand"
                : "text-slate-400 hover:text-slate-600"
            }`}
            aria-label="List view"
            onClick={() => setViewGrid(false)}
          >
            <StretchHorizontal size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
