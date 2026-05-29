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
    setChecked((prev) => !prev);
  };

  return (
    <div
      onClick={toggle}
      className={`
        w-6 h-6 rounded flex items-center justify-center cursor-pointer transition-all border
        ${
          checked
            ? "bg-indigo-600 border-indigo-600 shadow-sm"
            : "bg-white border-slate-200 hover:border-indigo-300"
        }
      `}
    >
      {checked && <Check size={16} className="text-white stroke-[3px]" />}
    </div>
  );
}
