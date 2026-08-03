"use client";

import FormSection from "./FormSection";
import RichTextEditor from "./RichTextEditor";
import { JobData } from "./types";

interface JobDescriptionProps {
  data: JobData;
  updateData: (values: Partial<JobData>) => void;
}

export default function JobDescription({
  data,
  updateData,
}: JobDescriptionProps) {
  return (
    <div className=" bg-white">
      {/* Header */}
      <div className="border-b pb-5">
        <h2 className="text-xl font-semibold text-neutral-100">
          Basic Information
        </h2>

        <p className="mt-1 text-neutral-60">
          Add the description of the job, responsibilities, who you are, and
          nice-to-haves.
        </p>
      </div>

      <div className="">
        {/* Job Description */}
        <FormSection
          title="Job Description"
          description="Job titles must be describe one position"
        >
          <RichTextEditor
            value={data.jobDescription}
            onChange={(value) =>
              updateData({
                jobDescription: value,
              })
            }
            placeholder="Enter job description"
          />
        </FormSection>

        {/* Responsibilities */}
        <FormSection
          title="Responsibilities"
          description="Outline the core responsibilities of the position."
        >
          <RichTextEditor
            value={data.responsibilities}
            onChange={(value) =>
              updateData({
                responsibilities: value,
              })
            }
            placeholder="Enter job responsibilities"
          />
        </FormSection>

        {/* Who You Are */}
        <FormSection
          title="Who You Are"
          description="Add your preferred candidates qualifications."
        >
          <RichTextEditor
            value={data.whoYouAre}
            onChange={(value) =>
              updateData({
                whoYouAre: value,
              })
            }
            placeholder="Enter qualifications "
          />
        </FormSection>

        {/* Nice To Haves */}
        <FormSection
          title="Nice To Haves"
          description="Add nice-to-have skills and qualifications for the role to encourage a more diverse set of candidates to apply."
          className="border-none"
        >
          <RichTextEditor
            value={data.niceToHave}
            onChange={(value) =>
              updateData({
                niceToHave: value,
              })
            }
            placeholder="Enter nice-to-haves"
          />
        </FormSection>
      </div>
      <hr className="bg-neutral-20" />
    </div>
  );
}
