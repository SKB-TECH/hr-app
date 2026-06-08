import { LayoutGrid, StretchHorizontal } from "lucide-react";

interface SearchHeaderProps {
  totalResults: number;
  sortOptions: string[];
  viewGrid: boolean;
  setViewGrid: React.Dispatch<React.SetStateAction<boolean>>;
  header: string;
}

export function SharedListingHeader({
  totalResults,
  sortOptions,
  viewGrid,
  setViewGrid,
  header,
}: SearchHeaderProps) {
  return (
    <div className="flex flex-col  ">
      <h1 className="text-[32px] font-semibold font-clash text-neutral-100">
        {header}
      </h1>
      <div className="flex  flex-row sm:items-center justify-between mb-8">
        <p className="text-slate-500 text-[16px] ">
          Showing {totalResults} results
        </p>

        <div className="flex items-center gap-4 ">
          <div className="  flex items-center gap-2">
            <span className="text-[16px] text-slate-500 max-sm:hidden">
              Sort by:
            </span>
            <select className="text-[16px] font-medium text-neutral-100 bg-transparent outline-none border-none focus:ring-0 cursor-pointer pr-8 py-0">
              {sortOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="h-8 w-2px bg-slate-200 mx-1 hidden md:block" />
          <div className="hidden md:flex items-center gap-1 p-1 rounded-lg">
            <button
              className={`p-1.5 rounded-md transition ${
                viewGrid
                  ? "bg-brand/6 text-brand"
                  : "text-slate-400 hover:text-slate-600"
              }`}
              aria-label="Grid view"
              onClick={() => setViewGrid(true)}
            >
              <LayoutGrid
                fill={viewGrid ? "#4640DE" : "transparent"}
                size={20}
              />
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
              <StretchHorizontal
                fill={viewGrid ? "transparent" : "#4640DE"}
                size={20}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
