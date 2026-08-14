"use client";
import { Company } from "@/types/types";
import { AtsDetailsReturnProps, getAtsDetails } from "@/lib/candidate";
import GridJobCard from "./GridJobCard";
import LayeredCard from "./LayeredCard";

export interface AtsProps {
  score: number;
  atsInfo: AtsDetailsReturnProps;
}
export interface JobsCardProps {
  applyLink: string;
  company: Company;
  atsProps?: AtsProps;
}

export function JobsCard({
  company,
  viewGrid,
  applyLink,
}: {
  company: Company;
  viewGrid: boolean;
  applyLink: string;
}) {
  const score = company.atsScore ?? 0;
  const atsInfo = getAtsDetails(score);
  const currentAtsProps: AtsProps = { score, atsInfo };

  //grid on md screen and above
  if (viewGrid) {
    return (
      <GridJobCard
        company={company}
        applyLink={applyLink}
        atsProps={currentAtsProps}
      />
    );
  }

  // current layout card (list view)
  return (
    <LayeredCard
      company={company}
      applyLink={applyLink}
      atsProps={currentAtsProps}
    />
  );
}
