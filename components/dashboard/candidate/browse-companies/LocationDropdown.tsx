"use client";

import { ChevronDown, MapPin } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Props {
  selectedLocation: string;
  locations: string[];
  onLocationChange: (location: string) => void;
}

export default function LocationDropdown({
  selectedLocation,
  locations,
  onLocationChange,
}: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="group flex w-full items-center gap-3 px-2 py-2 text-left outline-none lg:px-4 lg:py-0"
        >
          <MapPin
            size={20}
            className="shrink-0 text-[#25324B] md:size-[25px]"
          />

          <div className="flex-1 truncate border-b border-[#D6DDEB] py-2 max-md:text-[16px]  text-[18px] text-[#25324B] lg:text-base">
            {selectedLocation}
          </div>

          <ChevronDown
            size={16}
            className="shrink-0 text-brand md:size-4 transition-transform duration-300 group-data-[state=open]:rotate-180"
          />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        {locations.map((location) => (
          <DropdownMenuItem
            key={location}
            onSelect={() => onLocationChange(location)}
          >
            {location}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
