import React from "react";
import { cn } from "@/lib/utils";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  required?: boolean;
}

function InputField({ label, required, className, ...props }: InputFieldProps) {
  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-neutral-100 mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <input
        {...props}
        className={cn(
          "w-full border border-gray-200 placeholder:text-neutral-80 px-4 py-3 text-sm focus:outline-brand",
          className,
        )}
      />
    </div>
  );
}
export default InputField;
