"use client";

import { Plus, LayoutGrid, List } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TeamHeaderProps {
  memberCount: number;
  viewMode: "grid" | "list";
  onViewModeChange: (mode: "grid" | "list") => void;
}

function TeamHeader({
  memberCount,
  viewMode,
  onViewModeChange,
}: TeamHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <h3 className="text-lg font-semibold text-neutral-100">
        {memberCount} Members
      </h3>

      <div className="hidden md:flex items-center gap-3">
        <Button
          type="button"
          variant="custom-secondary"
          className="gap-2 py-5 px-4 text-sm font-medium"
        >
          <Plus size={16} />
          Add Members
        </Button>

        {/* View toggle */}
        <div className="flex">
          <button
            type="button"
            onClick={() => onViewModeChange("grid")}
            className={`p-3 transition-colors duration-400 cursor-pointer ${
              viewMode === "grid"
                ? " text-brand bg-brand/7"
                : "text-gray-400 hover:text-brand hover:bg-brand/7"
            }`}
            aria-label="Grid view"
          >
            <LayoutGrid
              fill={viewMode === "grid" ? "var(--brand)" : "transparent"}
              size={18}
            />
          </button>
          <button
            type="button"
            onClick={() => onViewModeChange("list")}
            className={`p-3 transition-colors duration-400 cursor-pointer ${
              viewMode === "list"
                ? "text-brand bg-brand/7"
                : "text-gray-400 hover:text-neutral-100"
            }`}
            aria-label="List view"
          >
            <List size={18} />
          </button>
        </div>
      </div>
      <button className="w-10 h-10 text-brand border border-brand-light-neutral  items-center justify-center font-medium hidden max-md:flex">
        <Plus size={22} />
      </button>
    </div>
  );
}

export default TeamHeader;
