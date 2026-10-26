"use client";

import { useState } from "react";
import { Check } from "lucide-react";

interface FilterTickProps {
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
}

export function FilterTick({
  defaultChecked = false,
  onChange,
}: FilterTickProps) {
  const [checked, setChecked] = useState(defaultChecked);

  const toggle = () => {
    setChecked((prev) => {
      const next = !prev;
      onChange?.(next);
      return next;
    });
  };

  return (
    <div
      onClick={toggle}
      className={`
        w-5 h-5 rounded-none flex items-center justify-center cursor-pointer transition-all border
        ${
          checked
            ? "bg-[#4640DE] border-[#4640DE] shadow-sm text-white"
            : "bg-white border-[#D6DDEB] hover:border-[#4640DE]"
        }
      `}
    >
      {checked && <Check size={14} className="text-white stroke-[3px]" />}
    </div>
  );
}
