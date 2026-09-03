"use client";

import {
  jobListingStyles,
  TableDataTypes,
  JobListingTypes,
  jobTypeStyles,
} from "@/data/company-job-listing";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/routing";

export const getColumns = (
  onPublish: (jobId: string) => void,
  publishingId?: string,
): ColumnDef<TableDataTypes>[] => [
  {
    accessorKey: "role",
    header: "Roles",
    cell: ({ row }) => {
      if (row.original.status === "Draft") {
        const id = String(row.original.id);
        return (
          <button
            type="button"
            disabled={publishingId === id}
            onClick={(event) => {
              event.stopPropagation();
              onPublish(id);
            }}
            className="ml-auto bg-brand px-4 py-2 text-xs font-bold text-white disabled:opacity-50"
          >
            {publishingId === id ? "Publishing…" : "Publish"}
          </button>
        );
      }
      return (
        <Link
          href={`/company/job-listing/${row.original.id}`}
          className="group inline-flex flex-col text-neutral-100 text-md"
          onClick={(event) => event.stopPropagation()}
        >
          <span className="font-medium group-hover:text-brand">{row.original.role}</span>
          <span className="mt-1 text-[11px] font-semibold text-brand opacity-0 transition-opacity group-hover:opacity-100">Open ATS</span>
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
    cell: ({ row }) => {
      return (
        <Link
          href={`/company/job-listing/${row.original.id}`}
          onClick={(event) => event.stopPropagation()}
          className="ml-auto flex w-fit items-center gap-2 pr-2 text-xs font-bold text-brand hover:underline"
        >
          View ATS <ArrowRight size={15} />
        </Link>
      );
    },
  },
];
