import {
  MessageSquareText,
  House,
  FileText,
  Search,
  Building,
  UserRound,
  Settings,
  BadgeQuestionMark,
  LucideIcon,
  Calendar,
  UsersRound,
} from "lucide-react";

export type NavItem = {
  id: number;
  name: string;
  path: string;
  icon: LucideIcon;
  badge?: string | null;
  roles: UserRoles[];
};

export type UserRoles = "candidate" | "company" | "admin";

export const navItems: NavItem[] = [
  {
    id: 1,
    name: "Dashboard",
    path: "/",
    icon: House,
    badge: null,
    roles: ["candidate", "company"],
  },
  {
    id: 2,
    name: "Messages",
    path: "/messages",
    icon: MessageSquareText,
    badge: null,
    roles: ["candidate", "company"],
  },
  {
    id: 3,
    name: "My Applications",
    path: "/applications",
    icon: FileText,
    badge: null,
    roles: ["candidate"],
  },
  {
    id: 4,
    name: "Find Jobs",
    path: "/find-jobs",
    icon: Search,
    badge: null,
    roles: ["candidate"],
  },
  {
    id: 5,
    name: "Browse Companies",
    path: "/companies",
    icon: Building,
    badge: null,
    roles: ["candidate"],
  },
  {
    id: 6,
    name: "My Public Profile",
    path: "/profile",
    icon: UserRound,
    badge: null,
    roles: ["candidate"],
  },
  {
    id: 12,
    name: "My Schedule",
    path: "/schedule",
    icon: Calendar,
    badge: null,
    roles: ["candidate"],
  },

  // company only
  {
    id: 7,
    name: "Company Profile",
    path: "/profile",
    icon: Building,
    badge: null,
    roles: ["company"],
  },
  {
    id: 8,
    name: "Job Listing",
    path: "/job-listing",
    icon: FileText,
    badge: null,
    roles: ["company"],
  },
  {
    id: 9,
    name: "All Applicants",
    path: "/applicants",
    icon: UserRound,
    badge: null,
    roles: ["company"],
  },
  {
    id: 10,
    name: "Schedule",
    path: "/schedule",
    icon: Calendar,
    badge: null,
    roles: ["company"],
  },
  {
    id: 11,
    name: "Company Members",
    path: "/members",
    icon: UsersRound,
    badge: null,
    roles: ["company"],
  },
];

export const settingsItems: NavItem[] = [
  {
    id: 1,
    name: "Settings",
    path: "/settings",
    icon: Settings,
    badge: null,
    roles: ["candidate", "company"],
  },
  {
    id: 2,
    name: "Help Center",
    path: "/help",
    icon: BadgeQuestionMark,
    badge: null,
    roles: ["candidate"],
  },
  {
    id: 3,
    name: "Help Center",
    path: "/help-center",
    icon: BadgeQuestionMark,
    badge: null,
    roles: ["company"],
  },
];
