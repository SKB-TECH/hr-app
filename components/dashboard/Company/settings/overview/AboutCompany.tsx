"use client";

import { useState } from "react";
import {
  Smile,
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Link2,
} from "lucide-react";

interface AboutCompanyProps {
  description: string;
  onDescriptionChange: (value: string) => void;
}

function AboutCompany({ description, onDescriptionChange }: AboutCompanyProps) {
  const [charCount, setCharCount] = useState(description.length);
  const maxChars = 500;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= maxChars) {
      onDescriptionChange(value);
      setCharCount(value.length);
    }
  };

  const toolbarButtons = [
    { icon: <Smile size={18} />, label: "Emoji" },
    { icon: <Bold size={18} />, label: "Bold" },
    { icon: <Italic size={18} />, label: "Italic" },
    { icon: <Underline size={18} />, label: "Underline" },
    { icon: <ListOrdered size={18} />, label: "Ordered List" },
    { icon: <List size={18} />, label: "Unordered List" },
    { icon: <Link2 size={18} />, label: "Link" },
  ];

  return (
    <div className="mb-8 grid gap-6 md:grid-cols-[300px_minmax(0,540px)] md:gap-x-[78px]">
      <div>
        <h2 className="text-[16px]! font-semibold text-neutral-100">
          About Company
        </h2>
        <p className="text-[15px]! leading-relaxed font-epilogue text-gray-500 mt-1">
          Brief description for your company. URLs are hyperlinked.
        </p>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <div className="border border-gray-200 focus-within:outline-brand focus-within:outline-1">
          <textarea
            value={description}
            onChange={handleChange}
            placeholder="Enter a brief description about your company..."
            rows={6}
            className="w-full px-4 py-3 text-sm resize-none outline-none border-none placeholder:text-gray-400"
          />

          {/* Toolbar */}
          <div className="flex items-center gap-1 px-3 py-2 border-t border-gray-200">
            {toolbarButtons.map((btn) => (
              <button
                key={btn.label}
                type="button"
                className="p-1.5 text-gray-400 hover:text-neutral-100 hover:bg-gray-100 rounded transition-colors cursor-pointer"
                aria-label={btn.label}
                title={btn.label}
              >
                {btn.icon}
              </button>
            ))}
          </div>
        </div>

        <p className="text-xs text-gray-400 text-right">
          Maximum 500 characters{" "}
          <span className="ml-4">
            {charCount} / {maxChars}
          </span>
        </p>
      </div>
    </div>
  );
}

export default AboutCompany;
