// use this file for ts types

// company type definition
export type CompanyIndustry = {
  name: string;
  style: {
    bg: string;
    color: string;
  };
};
export type Company = {
  id: number;
  src: string;
  location: string;
  availableJobs: number;
  name: string;
  description: string;
  industry: CompanyIndustry[];
  size: number;
  applied: number;
  capacity: number;
};
// company filter type definition
export type SidebarOptions = {
  name: string;
  count: number;
  defaultSelected?: boolean;
};
export type SidebarFilterCompany = {
  title: string;
  options: SidebarOptions[];
};

export type NotificationKey = "applications" | "jobs" | "recommendations";

export interface NotificationsState {
  applications: boolean;
  jobs: boolean;
  recommendations: boolean;
}

export interface NotificationItem {
  key: NotificationKey;
  label: string;
  description: string;
}
export interface NotificationsFormValues {
  applications: boolean;
  jobs: boolean;
  recommendations: boolean;
}
