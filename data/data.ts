import { NavigationTypes } from "@/types/navigationTypes";
import { NotificationItem } from "@/types/types";

export const navigations: NavigationTypes[] = [
  { id: "1", name: "Find Jobs", path: "/jobs" },
  { id: "2", name: "Browse Companies", path: "/companies" },
];

export const notificationItems: NotificationItem[] = [
  {
    key: "applications",
    label: "Applications",
    description: "These are notifications for jobs that you have applied to",
  },
  {
    key: "jobs",
    label: "Jobs",
    description:
      "These are notifications for job openings that suit your profile",
  },
  {
    key: "recommendations",
    label: "Recommendations",
    description:
      "These are notifications for personalized recommendations from our recruiters",
  },
];
export const dynamicPageTitles = [
  {
    path: "/find-jobs",
    title: "Job Description",
  },
  {
    path: "/companies",
    title: "Company Profile",
  },
  {
    path: "/applications",
    title: "Application Details",
  },
];
