import StatusLabel from "@/components/jobDetails/StatusLabel";
import { ProgressWithLabel } from "@/components/ui/ProgressWithLabel";
import {
  description,
  responsibilities,
  niceToHaves,
  whoYouAre,
  requiredSkills,
  labels,
} from "@/data/companyDetailsData";
import { CircleCheck } from "lucide-react";

export default function JobDetailsPage({
  params,
}: Readonly<{
  params: { jobId: string };
}>) {
  const { jobId } = params;
  return (
    <main className="w-full max-w-6xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-14 ">
        {/* LEFT */}
        <div className="lg:col-span-2 space-y-10">
          {/* description */}
          <div className="space-y-2">
            <h1 className="text-[32px] text-neutral-100 font-bold font-clash">
              Description
            </h1>
            <p className="text-neutral-80 text-[16px]  ">{description}</p>
          </div>
          {/* responsibilities */}
          <div className="space-y-2">
            <h1 className="text-[32px] text-neutral-100 font-bold font-clash">
              Responsibilities
            </h1>
            <div>
              {responsibilities.map((item, index) => (
                <span
                  key={index}
                  className="text-neutral-100 text-[16px] flex items-center mb-2"
                >
                  <CircleCheck className="text-accent-green w-5 h-5 shrink-0" />
                  <p className="inline-block ml-2 ">{item}</p>
                </span>
              ))}
            </div>
          </div>
          {/*Who you are  */}
          <div className="space-y-2">
            <h1 className="text-[32px] text-neutral-100 font-bold font-clash">
              Who you are
            </h1>
            {whoYouAre.map((item, index) => (
              <span
                key={index}
                className="text-neutral-100 text-[16px] flex items-center mb-2"
              >
                <CircleCheck className="text-accent-green w-5 h-5 shrink-0" />
                <p className="inline-block ml-2 ">{item}</p>
              </span>
            ))}
          </div>
          {/* Nice to haves  */}
          <div className="space-y-2">
            <h1 className="text-[32px] text-neutral-100 font-bold font-clash">
              Nice to Haves
            </h1>
            <div>
              {niceToHaves.map((item, index) => (
                <span
                  key={index}
                  className="text-neutral-100 text-[16px] flex items-center mb-2"
                >
                  <CircleCheck className="text-accent-green w-5 h-5 shrink-0" />
                  <p className="inline-block ml-2 ">{item}</p>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className=" divide-y divide-brand-light-neutral">
          {/* about this role */}
          <div className="py-8">
            <h1 className="text-[32px] text-neutral-100 font-bold font-clash">
              About this role
            </h1>
            <div className="w-full mt-6 h-[74px] px-4 bg-[#F8F8FD] flex items-center justify-center">
              <ProgressWithLabel />
            </div>
            <div className="w-full  mt-4 space-y-4 p-2">
              <div className="flex justify-between font-epilogue">
                <p className="text-neutral-80">Apply Before</p>
                <span className="font-semibold text-neutral-100 text-[16px]">
                  June 30, 2024
                </span>
              </div>
              <div className="flex justify-between font-epilogue">
                <p className="text-neutral-80">Job Posted On</p>
                <span className="font-semibold text-neutral-100 text-[16px]">
                  June 1, 2024
                </span>
              </div>
              <div className="flex justify-between font-epilogue">
                <p className="text-neutral-80">Job Type</p>
                <span className="font-semibold text-neutral-100 text-[16px]">
                  Full-Time
                </span>
              </div>
              <div className="flex justify-between font-epilogue">
                <p className="text-neutral-80">Salary</p>
                <span className="font-semibold text-neutral-100 text-[16px]">
                  $100k - $120k
                </span>
              </div>
            </div>
          </div>
          {/* categories */}
          <div className="py-8 ">
            <h1 className="pb-4 text-[32px] text-neutral-100 font-bold font-clash">
              Categories
            </h1>
            {/* labels container */}
            <div className="flex items-center gap-4  flex-wrap">
              {labels.map((label) => (
                <StatusLabel
                  style={{
                    backgroundColor: label.color,
                    color: label.textColor,
                  }}
                  key={label.name}
                  className="rounded-full font-medium"
                  label={label.name}
                />
              ))}
            </div>
          </div>
          {/* Required skills */}
          <div className="mt-6">
            <h1 className="text-[32px] text-neutral-100 font-bold font-clash">
              Required Skills
            </h1>
            <div className="flex items-center gap-4 mt-4 flex-wrap">
              {requiredSkills.map((skill) => (
                <StatusLabel
                  style={{
                    backgroundColor: skill.backgroundColor,
                    color: skill.textColor,
                  }}
                  className="rounded-none font-normal"
                  key={skill.id}
                  label={skill.name}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
