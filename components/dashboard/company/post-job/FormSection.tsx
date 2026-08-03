import { ReactNode } from "react";

interface FormSectionProps {
  title: string;
  description: string;
  children: ReactNode;
  className?: string;
}

export default function FormSection({
  title,
  description,
  children,
  className = "",
}: FormSectionProps) {
  return (
    <div
      className={`grid grid-cols-1 gap-4 md:gap-20 border-b border-gray-200 py-8 lg:grid-cols-12 ${className}`}
    >
      {/* Left Side */}
      <div className="lg:col-span-4 w-full">
        <h3 className="text-base font-semibold text-neutral-100 text-[16px]">
          {title}
        </h3>

        <p className="mt-2 leading-6 text-gray-500">{description}</p>
      </div>

      {/* Right Side */}
      <div className="lg:col-span-8">{children}</div>
    </div>
  );
}
