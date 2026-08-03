import { Category } from "@/types/schedule";
import { PlusIcon } from "lucide-react";

export function CategoryPanel({
  categories,
  onToggle,
  onAddCategory,
}: {
  categories: Category[];
  onToggle: (id: string) => void;
  onAddCategory: () => void;
}) {
  return (
    <div className="p-4 border-t border-gray-100">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[14px] font-bold text-[#202430]">Categories</span>
        <button
          onClick={onAddCategory}
          className="flex items-center gap-1 text-[12px] font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
        >
          <PlusIcon className="w-3.5 h-3.5" />
          Add Category
        </button>
      </div>
      <div className="flex flex-col gap-3">
        {categories.map(cat => (
          <label key={cat.id} className="flex items-center gap-2.5 cursor-pointer">
            <span
              onClick={() => onToggle(cat.id)}
              className="w-5 h-5 flex-shrink-0 border-2 rounded flex items-center justify-center cursor-pointer transition-colors"
              style={{
                borderColor: cat.checked ? cat.color : "#D6DDEB",
                backgroundColor: cat.checked ? cat.color : "transparent",
              }}
            >
              {cat.checked && (
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                  <path d="M1 4l3 3 5-6" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </span>
            <span className="text-[13px] text-gray-600">{cat.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}