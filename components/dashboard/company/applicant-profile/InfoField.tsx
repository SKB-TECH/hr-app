import React from "react";

interface InfoFieldProps {
  label: string;
  value?: string | string[];
  subValue?: string;
  isFullWidth?: boolean;
  children?: React.ReactNode;
  className?: string;
}

function InfoField({
  label,
  value,
  subValue,
  isFullWidth,
  children,
  className,
}: InfoFieldProps) {
  return (
    <div className={isFullWidth ? "md:col-span-2" : "" + className}>
      <p className="max-md:text-[14px] text-[16px] text-[#7C8493] mb-1 ">
        {label}
      </p>

      {children ? (
        children
      ) : (
        <p className="font-medium text-neutral-100 ">
          {Array.isArray(value)
            ? value.map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  {i !== value.length - 1 && <br />}
                </React.Fragment>
              ))
            : value}
          {/* Render optional sub-value (like age) */}
          {subValue && (
            <span className="text-[#7C8493] font-normal ml-1">{subValue}</span>
          )}
        </p>
      )}
    </div>
  );
}
export default InfoField;
