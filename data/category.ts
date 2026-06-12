import { LaptopMinimal, CodeXml, BriefcaseBusiness, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type CategoryProp = {
  id: number;
  name: string;
  availableJobs: number;
  logo: LucideIcon;
  blackIcon?: boolean;
};

export const categoriesData: CategoryProp[] = [
  {
    id: 1,
    name: "Technology",
    availableJobs: 235,
    logo: LaptopMinimal,
  },
  {
    id: 2,
    name: "Engineering",
    availableJobs: 756,
    logo: CodeXml,
  },
  {
    id: 3,
    name: "Business",
    availableJobs: 140,
    logo: BriefcaseBusiness,
  },
  {
    id: 4,
    name: "Human Resources",
    availableJobs: 325,
    logo: Users,
    blackIcon: true,
  },
];
