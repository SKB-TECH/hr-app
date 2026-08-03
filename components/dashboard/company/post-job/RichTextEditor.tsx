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
    <div>
      <div className="overflow-hidden border border-neutral-200 bg-white">
        {/* Textarea */}
        <textarea
          value={value}
          onChange={(e) => {
            if (e.target.value.length <= maxLength) {
              onChange(e.target.value);
            }
          }}
          placeholder={placeholder}
          className="h-52 w-full resize-none border-none p-4 outline-none"
        />

        {/* Toolbar */}
        <div className="flex items-center justify-between border-t border-neutral-200 px-4 py-2">
          <div className="flex items-center gap-4 text-neutral-500">
            <button type="button">
              <Smile size={18} />
            </button>

            <button type="button">
              <Bold size={18} />
            </button>

            <button type="button">
              <Italic size={18} />
            </button>

            <button type="button">
              <List size={18} />
            </button>

            <button type="button">
              <Link2 size={18} />
            </button>
          </div>
        </div>
      </div>{" "}
      <div className="flex justify-between items-center">
        <h1 className=" font-epilogue text-neutral-60">
          Maximum 500 characters
        </h1>
        <span className="text-xs text-neutral-500">
          {value.length} / {maxLength}
        </span>
      </div>
    </div>
  );
}
