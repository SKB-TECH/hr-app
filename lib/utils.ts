import { dynamicPageTitles } from "@/data/data";
import { categoryStyles, jobsDetailsResponse } from "@/data/jobDetailsData";
import { navItems, settingsItems } from "@/data/SidebarNavigations";
import type { UserRoles } from "@/data/SidebarNavigations";
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

export function getActivePathname(pathnameWithLocale: string) {
  // Remove locale prefix & 1st path
  return "/" + pathnameWithLocale.split("/").filter(Boolean).slice(2).join("/");
}

export function shouldShowBackButton(pathname: string) {
  const segments = pathname.split("/").filter(Boolean);
  return segments.length > 3; //check if segments are more than 3 (locale,role,path and more)
}

export function getPageName(pathname: string): string {
  const allItems = [...navItems, ...settingsItems];

  const activePath = getActivePathname(pathname);

  const dynamicTitle = dynamicPageTitles.find((item) =>
    activePath.startsWith(item.path + "/"),
  );

  if (dynamicTitle) {
    return dynamicTitle.title;
  }

  const match = allItems.find(
    (item) =>
      activePath === item.path || activePath.startsWith(item.path + "/"),
  );

  return match?.name ?? "Dashboard";
}

export function getRolePath(role: UserRoles, path: string) {
  return `/${role}${path}`;
}

export function getNavItems(viewerRole: UserRoles) {
  const mainItems = navItems.filter((item) => item.roles.includes(viewerRole));
  const settingItems = settingsItems.filter((item) =>
    item.roles.includes(viewerRole),
  );
  return [mainItems, settingItems];
}

export function getParentPath(pathname: string) {
  const segments = pathname.split("/").filter(Boolean);
  return "/" + segments.slice(0, -1).join("/");
}

export function isNavItemActive(currentPath: string, itemPath: string) {
  if (itemPath === "/") {
    return currentPath === "/";
  }

  return currentPath === itemPath || currentPath.startsWith(itemPath + "/");
}
