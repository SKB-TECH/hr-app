import { X } from "lucide-react";

function ClearFilters({
  onClearFilters,
}: {
  onClearFilters: () => void;
}) {
  return (
    <button
      onClick={onClearFilters}
      className="flex items-center gap-1 text-xs text-neutral-60 hover:text-accent-red transition-colors px-2 py-1"
    >
      <X size={13} />
      Clear
    </button>
  );
}

export default ClearFilters;
