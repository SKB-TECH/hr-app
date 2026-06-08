import { categoryStyles, jobsDetailsResponse } from "@/data/jobDetailsData";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getJobDetailsById = (id: string) => {
  const job = jobsDetailsResponse.find((job) => job.id === id);
  if (!job) {
    throw new Error(`Job not found`);
  }
  return job;
};

export const getStyleForCategory = (
  labels: { id: string | number; name: string }[],
) => {
  const style = labels
    .map((item) => categoryStyles[item.name.toLocaleLowerCase()])
    .filter(Boolean);
  return style;
};
