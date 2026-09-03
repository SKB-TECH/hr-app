"use client";
import type { CompanyJob } from "@/core/types/job";
import GridJobCard from "./GridJobCard";
import LayeredCard from "./LayeredCard";

export interface JobsCardProps {
  applyLink: string;
  job: CompanyJob;
}

export function JobsCard({
  job,
  viewGrid,
  applyLink,
}: {
  job: CompanyJob;
  viewGrid: boolean;
  applyLink: string;
}) {
  // grid on md screen and above
  if (viewGrid) {
    return <GridJobCard job={job} applyLink={applyLink} />;
  }

  // current layout card (list view)
  return <LayeredCard job={job} applyLink={applyLink} />;
}
