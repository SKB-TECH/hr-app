"use client";

import {
  jobListingStyles,
  TableDataTypes,
  JobListingTypes,
  jobTypeStyles,
} from "@/data/company-job-listing";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";

export const columns: ColumnDef<TableDataTypes>[] = [
  {
    accessorKey: "role",
    header: "Roles",
    cell: ({ row }) => {
      return (
        <Link
          href={`/company/job-listing/${row.original.id}`}
          className="text-neutral-100 text-md"
        >
          {row.original.role}
        </Link>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return (
        <span
          className={
            jobListingStyles[row.original.status as keyof JobListingTypes] +
            " py-2 px-3  rounded-full text-xs tracking-wider font-medium"
          }
        >
          {row.original.status}
        </span>
      );
    },
  },
  {
    accessorKey: "date_posted",
    header: "Date Posted",
    cell: ({ row }) => {
      const readableDate = new Date(
        row.original.date_posted,
      ).toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
      return readableDate;
    },
  },
  {
    accessorKey: "due_date",
    header: "Due Date",
  },
  {
    accessorKey: "job_type",
    header: "Job Type",
    cell: ({ row }) => {
      return (
        <span
          className={
            jobTypeStyles[row.original.job_type as keyof typeof jobTypeStyles] +
            " py-2 px-3  rounded-full text-xs tracking-wider font-medium"
          }
        >
          {row.original.job_type}
        </span>
      );
    },
  },
  {
    accessorKey: "applicants",
    header: "Applicants",
  },
  {
    accessorKey: "current_applicants",
    header: "Needs",
    cell: ({ row }) => {
      return (
        <p>
          <span className="text-neutral-100">
            {row.original.current_applicants}
          </span>
          / <span className="text-gray-400">{row.original.max_applicants}</span>
        </p>
      );
    },
  },
  {
    accessorKey: "action",
    header: "",
    cell: () => {
      return (
        <span className="flex justify-end items-center text-[#25324B] pr-2 hover:text-neutral-10 ">
          <MoreHorizontal />
        </span>
      );
    },
  },
];
