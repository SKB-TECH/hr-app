"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useTranslations } from "next-intl";

import SearchFilters from "./SearchFilters";

interface SearchHeaderProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
}

export default function SearchHeader({ value, onChange, placeholder }: SearchHeaderProps) {
  const t = useTranslations("findJobs");
  const isControlled = value !== undefined && onChange !== undefined;

  return (
    <div className="bg-white  p-6 border border-brand-light-neutral ">
      <div className="flex flex-col items-center justify-center gap-4 md:flex-row md:items-center md:gap-5">
        <div className="flex w-full items-center md:ml-3 ">
          <MagnifyingGlassIcon className="mr-3 h-7 w-7 shrink-0 text-[#25324B]" />
          <input
            type="text"
            {...(isControlled
              ? { value, onChange: (event: React.ChangeEvent<HTMLInputElement>) => onChange(event.target.value) }
              : {})}
            placeholder={placeholder ?? t("searchHeader.placeholder")}
            className="w-full border-b border-brand-light-neutral py-2 focus:outline-none"
          />
        </div>

        <div className="hidden h-10 border-l border-brand-light-neutral md:block  " />

        <SearchFilters />
      </div>
    </div>
  );
}
