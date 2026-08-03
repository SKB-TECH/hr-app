import PipelineHeader from "./PipelineHeader";
import { Applicant } from "@/types/applicant";
import PipelineProfileInfo from "./PipelineProfileInfo";
import React from "react";

const stages = ["In Review", "Shortlisted", "Interview", "Hired", "Declined"];

export default function ApplicantPipeline({
  applicants,
}: {
  applicants: Applicant[];
}) {
  return (
    <div className="overflow-x-auto custom-scrollbar pb-2">
      <div className="flex min-w-max gap-4 ">
        {stages.map((stage) => {
          const stageApplicants = applicants.filter(
            (applicant) => applicant.stage === stage,
          );

          return (
            <section
              key={stage}
              className="w-72 shrink-0 border border-neutral-20 max-h-max "
            >
              <PipelineHeader stage={stage} stageApplicants={stageApplicants} />
              <div className="space-y-3  p-3">
                {stageApplicants.map((applicant) => (
                  <React.Fragment key={applicant.id}>
                    <PipelineProfileInfo applicant={applicant} />
                  </React.Fragment>
                ))}
                {!stageApplicants.length && (
                  <p className="py-6 text-center text-sm text-neutral-60">
                    No applicants
                  </p>
                )}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
