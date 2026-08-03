"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useState } from "react";

interface ActionDropDownProps {
  selected: string;
  menuItems?: string[];
  children: React.ReactNode;
  hasDropDown?: boolean;
  className?: string;
}

function ActionDropDown({
  selected,
  menuItems,
  children,
  hasDropDown = true,
  className,
}: ActionDropDownProps) {
  const [selectedItem, setSelectedItem] = useState(selected);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='custom-primary'
          className={`max-sm:hidden hover:bg-brand-light-neutral/30 cursor-pointer group flex items-center font-semibold  gap-2 font-epilogue py-5 
                 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:border-brand/80 border ${!className && "text-brand border-brand-light-neutral"} ${className}`}
        >
          {children}
          <p>{selectedItem}</p>
        </Button>
      </DropdownMenuTrigger>
      {hasDropDown && (
        <DropdownMenuContent>
          {menuItems?.map((item, index) => (
            <DropdownMenuItem
              key={index}
              onSelect={() => setSelectedItem(item)}
            >
              {item}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  );
}

export default ActionDropDown;
