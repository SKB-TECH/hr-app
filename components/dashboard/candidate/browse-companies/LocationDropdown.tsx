"use client";

import { MapPin } from "lucide-react";
import CountrySelect from "@/components/ui/CountrySelect";

interface Props {
  selectedLocation: string;
  onLocationChange: (location: string) => void;
  placeholder?: string;
}

export default function LocationDropdown({
  selectedLocation,
  onLocationChange,
  placeholder,
}: Props) {
  return (
    <div className="flex w-full items-center gap-3 px-2 py-2 lg:px-4 lg:py-0">
      <MapPin size={20} className="shrink-0 text-[#25324B] md:size-[25px]" />
      <CountrySelect
        value={selectedLocation}
        onChange={onLocationChange}
        placeholder={placeholder}
        className="rounded-none border-0 border-b border-[#D6DDEB] px-0 text-[16px] lg:text-base"
      />
    </div>
  );
}
