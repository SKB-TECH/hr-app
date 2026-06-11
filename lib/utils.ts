import { categoryStyles, jobsDetailsResponse } from "@/data/jobDetailsData";
import { navItems, settingsItems } from "@/data/SidebarNavigations";
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

export function getPageName(pathname: string): string {
  const allItems = [...navItems, ...settingsItems];
  // Remove locale prefix
  const segments = pathname.split("/").filter(Boolean);
  const pathWithoutLocale = "/" + segments.slice(1).join("/");
  // Find matching from navItems and settingsItems
  const match = allItems.find((item) => item.href === pathWithoutLocale);

  return match?.name || "Dashboard";
}
