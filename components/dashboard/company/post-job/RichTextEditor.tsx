"use client";

import { Smile, Bold, Italic, List, Link2 } from "lucide-react";

interface RichTextareaProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  maxLength?: number;
}

export default function RichTextarea({
  value,
  onChange,
  placeholder = "Enter job responsibilities",
  maxLength = 500,
}: RichTextareaProps) {
  return (
    <div className="space-y-2 max-w-2xl">
      <div className="border border-[#D6DDEB] bg-white rounded-none focus-within:border-[#4640DE] focus-within:ring-1 focus-within:ring-[#4640DE] transition-all">
        {/* Textarea */}
        <textarea
          value={value}
          onChange={(e) => {
            if (e.target.value.length <= maxLength) {
              onChange(e.target.value);
            }
          }}
          placeholder={placeholder}
          className="h-44 w-full resize-none border-none p-4 text-sm sm:text-base text-[#132745] outline-none placeholder:text-[#7C8493]"
        />

        {/* Toolbar */}
        <div className="flex items-center justify-between border-t border-[#F0F2F7] bg-[#F8F9FC] px-4 py-2.5">
          <div className="flex items-center gap-3 text-[#7C8493]">
            <button type="button" className="p-1 hover:text-[#4640DE] transition-colors cursor-pointer" title="Add emoji">
              <Smile size={16} />
            </button>
            <button type="button" className="p-1 hover:text-[#4640DE] transition-colors cursor-pointer" title="Bold">
              <Bold size={16} />
            </button>
            <button type="button" className="p-1 hover:text-[#4640DE] transition-colors cursor-pointer" title="Italic">
              <Italic size={16} />
            </button>
            <button type="button" className="p-1 hover:text-[#4640DE] transition-colors cursor-pointer" title="Bullet List">
              <List size={16} />
            </button>
            <button type="button" className="p-1 hover:text-[#4640DE] transition-colors cursor-pointer" title="Add Link">
              <Link2 size={16} />
            </button>
          </div>
          <span className="text-xs font-semibold text-[#7C8493]">
            {value.length} / {maxLength}
          </span>
        </div>
      </div>
    </div>

  );
}
