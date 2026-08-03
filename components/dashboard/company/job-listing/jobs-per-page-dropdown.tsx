"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenu,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { JobListingTable } from "./data-table-client";

const perPageOptions = [10, 15, 20, 25, 30];

function JobsPerPageDropDown({ jobsPerPage, onPerPageChange }: JobListingTable) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        className="border border-brand-light-neutral  flex gap-2 cursor-pointer"
      >
        <Button className="text-neutral-100 text-[16px] bg-transparent hover:bg-transparent">
          <ChevronDown className="scale-110" />
          {jobsPerPage}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {perPageOptions.map((option) => (
          <DropdownMenuItem
            onClick={() => onPerPageChange(option)}
            key={option}
          >
            {option}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default JobsPerPageDropDown;
