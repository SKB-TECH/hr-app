"use client";

import FormSection from "./FormSection";
import SalaryRange from "./SalaryRange";
import SkillInput from "./SkillInput";
import { JobData } from "./types";
import { usePlatformReferences } from "@/core/hooks/references/use-platform-references";
import { DEFAULT_JOB_CATEGORIES } from "@/core/constants/job-categories";
import CountrySelect from "@/components/ui/CountrySelect";

const employmentTypes = [
  "Full-Time",
  "Part-Time",
  "Remote",
  "Internship",
  "Contract",
];

interface JobInformationProps {
  data: JobData;
  updateData: (values: Partial<JobData>) => void;
}

export default function JobInformation({
  data,
  updateData,
}: JobInformationProps) {
  const { data: categories = [], isLoading: categoriesLoading } =
    usePlatformReferences("job_category");
  const displayedCategories = categories.length
    ? categories
    : DEFAULT_JOB_CATEGORIES;
  const toggleEmploymentType = (type: string) => {
    const updatedTypes = data.employmentTypes.includes(type)
      ? data.employmentTypes.filter((item) => item !== type)
      : [...data.employmentTypes, type];

    updateData({
      employmentTypes: updatedTypes,
    });
  };

  return (
    <div className="bg-white ">
      {/* Header */}
      <div className="mb-8 pb-4 border-b border-[#D6DDEB]">
        <h2 className="text-xl font-bold font-clash text-[#132745]">
          Basic Information
        </h2>
        <p className="mt-1 text-sm text-[#7C8493]">
          This information will be displayed publicly on candidate search feeds.
        </p>
      </div>

      {/* Job Title */}
      <FormSection
        title="Job Title"
        description="Job titles must describe one distinct executive or specialist role."
      >
        <div className="max-w-xl">
          <input
            value={data.jobTitle}
            onChange={(e) =>
              updateData({
                jobTitle: e.target.value,
              })
            }
            placeholder="e.g. Chief Financial Officer, Senior Tech Lead"
            className="w-full border border-[#D6DDEB] bg-white rounded-none px-4 py-3 outline-none focus:border-[#4640DE] focus:ring-1 focus:ring-[#4640DE] text-sm sm:text-base text-[#132745] font-medium"
          />

          <p
            className={`mt-2 text-xs ${
              data.jobTitle.length >= 80 ? "text-amber-600" : "text-[#7C8493]"
            }`}
          >
            {data.jobTitle.length}/80 characters
          </p>
        </div>
      </FormSection>

      <FormSection
        title="Location"
        description="Select a country/city across Central Africa, or Remote."
      >
        <div className="max-w-xl">
          <CountrySelect
            value={data.location}
            onChange={(location) => updateData({ location })}
            className="rounded-none border-[#D6DDEB]"
          />
        </div>
      </FormSection>

      {/* Employment */}
      <FormSection
        title="Type of Employment"
        description="You can select multiple employment arrangements."
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-xl">
          {employmentTypes.map((item) => {
            const selected = data.employmentTypes.includes(item);
            return (
              <label
                key={item}
                className={`flex items-center gap-3 p-3 border rounded-none cursor-pointer text-sm font-medium transition-all ${
                  selected
                    ? "border-[#4640DE] bg-[#F8F9FC] text-[#4640DE]"
                    : "border-[#D6DDEB] text-[#515B6F] hover:border-gray-400"
                }`}
              >
                <input
                  type="checkbox"
                  checked={selected}
                  onChange={() => toggleEmploymentType(item)}
                  className="h-4 w-4 rounded-none accent-[#4640DE]"
                />
                <span>{item}</span>
              </label>
            );
          })}
        </div>
      </FormSection>

      {/* Salary */}
      <FormSection
        title="Estimated Compensation"
        description="Specify the estimated monthly or annual salary range (USD). You can leave this blank."
      >
        <SalaryRange
          minSalary={data.minSalary}
          maxSalary={data.maxSalary}
          onChange={(min, max) =>
            updateData({
              minSalary: min,
              maxSalary: max,
            })
          }
        />
      </FormSection>

      {/* Category */}
      <FormSection
        title="Job Category"
        description="Select the business function that best categorizes this opening."
      >
        <select
          value={data.category}
          onChange={(e) =>
            updateData({
              category: e.target.value,
            })
          }
          className="w-full max-w-xl border border-[#D6DDEB] bg-white rounded-none px-4 py-3 outline-none focus:border-[#4640DE] focus:ring-1 focus:ring-[#4640DE] text-sm text-[#132745] font-medium"
        >
          <option value="">
            {categoriesLoading ? "Loading categories..." : "Select Category"}
          </option>

          {displayedCategories.map((category) => (
            <option key={category.id} value={category.code}>
              {category.name}
            </option>
          ))}
        </select>
      </FormSection>

      {/* Skills */}
      <FormSection
        title="Required Skills & Competencies"
        description="Add key leadership and technical proficiencies."
      >
        <SkillInput
          defaultSkills={data.skills}
          onChange={(skills) => updateData({ skills })}
        />
      </FormSection>

    </div>
  );
}
