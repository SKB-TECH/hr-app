export type ViewMode = "table" | "pipeline";

interface ViewSwitcherProps {
  view: ViewMode;
  onViewChange: (view: ViewMode) => void;
}

export default function ViewSwitcher({ view, onViewChange }: ViewSwitcherProps) {
  return (
    <div className="flex items-center justify-center overflow-hidden border border-neutral-20 bg-[#E9EBFD]">
      <button
        type="button"
        onClick={() => onViewChange("pipeline")}
        aria-pressed={view === "pipeline"}
        className={`flex-1 cursor-pointer px-4 py-3 text-sm font-semibold text-brand transition md:flex-none ${view === "pipeline" ? "bg-white" : "bg-transparent"}`}
      >
        Pipeline View
      </button>
      <button
        type="button"
        onClick={() => onViewChange("table")}
        aria-pressed={view === "table"}
        className={`m-1 flex-1 cursor-pointer px-4 py-2 text-sm font-semibold text-brand transition md:flex-none ${view === "table" ? "bg-white" : "bg-transparent"}`}
      >
        Table View
      </button>
    </div>
  );
}
