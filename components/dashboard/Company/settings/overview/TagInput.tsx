"use client";

import { useState, KeyboardEvent } from "react";
import { ChevronDown, X } from "lucide-react";

interface TagInputProps {
  label: string;
  tags: string[];
  onTagsChange: (tags: string[]) => void;
  options: string[];
  placeholder?: string;
}

function TagInput({
  label,
  tags,
  onTagsChange,
  options,
  placeholder,
}: TagInputProps) {
  const [inputValue, setInputValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const trimmed = inputValue.trim();
      if (trimmed && !tags.includes(trimmed)) {
        onTagsChange([...tags, trimmed]);
      }
      setInputValue("");
      setIsOpen(false);
    }
    if (e.key === "Backspace" && inputValue === "" && tags.length > 0) {
      onTagsChange(tags.slice(0, -1));
    }
  };

  const removeTag = (indexToRemove: number) => {
    onTagsChange(tags.filter((_, i) => i !== indexToRemove));
  };

  const addTag = (tag: string) => {
    if (!tags.includes(tag)) {
      onTagsChange([...tags, tag]);
    }
    setInputValue("");
  };

  const normalizedQuery = inputValue.trim().toLowerCase();
  const visibleOptions = options.filter(
    (option) =>
      !tags.includes(option) &&
      option.toLowerCase().includes(normalizedQuery),
  );

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="flex min-h-[50px] w-full flex-wrap items-center gap-2 border border-gray-200 px-2 py-1.5 focus-within:outline-1 focus-within:outline-brand">
        {tags.map((tag, index) => (
          <span
            key={`${tag}-${index}`}
            className="inline-flex items-center gap-1.5 bg-[#F8F8FD] text-brand text-sm font-medium px-3 py-1 rounded-sm"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(index)}
              className="text-brand hover:text-brand/70 transition-colors cursor-pointer"
              aria-label={`Remove ${tag}`}
            >
              <X size={14} />
            </button>
          </span>
        ))}
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsOpen(true)}
          placeholder={tags.length === 0 ? placeholder : ""}
          className="min-w-[80px] flex-1 py-0.5 text-sm outline-none placeholder:text-gray-400"
        />
        <button
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          className="flex shrink-0 cursor-pointer p-1 text-neutral-100"
          aria-label={`Toggle ${label} options`}
          aria-expanded={isOpen}
        >
          <ChevronDown
            className={`size-5 transition-transform ${isOpen ? "rotate-180" : ""}`}
            aria-hidden="true"
          />
        </button>
      </div>
      {isOpen && (
        <div className="absolute z-20 mt-1 max-h-48 w-full overflow-y-auto border border-gray-200 bg-white py-1 shadow-md">
          {visibleOptions.length > 0 ? (
            visibleOptions.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => addTag(option)}
                className="w-full cursor-pointer px-3 py-2 text-left text-sm text-neutral-100 hover:bg-[#F8F8FD]"
              >
                {option}
              </button>
            ))
          ) : (
            <p className="px-3 py-2 text-sm text-neutral-60">No options found</p>
          )}
        </div>
      )}
    </div>
  );
}

export default TagInput;
