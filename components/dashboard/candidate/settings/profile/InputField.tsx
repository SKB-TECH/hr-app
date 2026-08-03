import React from "react";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  required?: boolean;
}

function InputField({ label, required, ...props }: InputFieldProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-neutral-100 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <input
        {...props}
        className="w-full border border-gray-200 placeholder:text-neutral-80  px-4 py-3 text-sm  focus:outline-brand"
      />
    </div>
  );
}
export default InputField;
