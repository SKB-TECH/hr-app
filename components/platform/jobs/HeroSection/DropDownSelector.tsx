"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, MapPinIcon } from "lucide-react";

interface DropDownSelectorProps {
  items: string[];
  value: string;
  onChange: (value: string) => void;
}

export default function DropDownSelector({
  items,
  value,
  onChange,
}: DropDownSelectorProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="w-full">
        <Button
          variant="ghost"
          className="group h-auto w-full justify-start rounded-none border-0 border-b-2 border-brand-light-neutral bg-white px-0 py-2 hover:bg-white focus:bg-white"
        >
          <MapPinIcon className="mr-3 h-5 w-5 text-neutral-100" />
          <span className="text-[16px] font-normal text-neutral-60">
            {value}
          </span>
          <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]:rotate-180" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        {items.map((item) => (
          <DropdownMenuItem key={item} onClick={() => onChange(item)}>
            {item}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
