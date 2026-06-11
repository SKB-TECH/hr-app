import {
  MessageSquareText,
  House,
  FileText,
  Search,
  Building,
  UserRound,
  Settings,
  BadgeQuestionMark,
} from "lucide-react";

export const navItems = [
  {
    id: 1,
    name: "Dashboard",
    href: "/dashboard",
    icon: House,
    badge: null,
  },
  {
    id: 2,
    name: "Messages",
    href: "/dashboard/messages",
    icon: MessageSquareText,
    badge: "1",
  },
  {
    id: 3,
    name: "My Applications",
    href: "/dashboard/applications",
    icon: FileText,
    badge: null,
  },
  {
    id: 4,
    name: "Find Jobs",
    href: "/dashboard/find-jobs",
    icon: Search,
    badge: null,
  },
  {
    id: 5,
    name: "Browse Companies",
    href: "/dashboard/companies",
    icon: Building,
    badge: null,
  },
  {
    id: 6,
    name: "My Public Profile",
    href: "/dashboard/profile",
    icon: UserRound,
    badge: null,
  },
];

export const settingsItems = [
  { id: 1, name: "Settings", href: "/dashboard/settings", icon: Settings },
  {
    id: 2,
    name: "Help Center",
    href: "/dashboard/help",
    icon: BadgeQuestionMark,
  },
];
