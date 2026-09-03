"use client";

import FormSection from "./FormSection";
import SalaryRange from "./SalaryRange";
import SkillInput from "./SkillInput";
import { JobData } from "./types";
import { usePlatformReferences } from "@/core/hooks/references/use-platform-references";
import { DEFAULT_JOB_CATEGORIES } from "@/core/constants/job-categories";

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
      <div className="mb-10">
        <h2 className="text-[18px] font-epilogue text-neutral-100 font-semibold">
          Basic Information
        </h2>

        <p className="mt-1 text-neutral-60 ">
          This information will be displayed publicly.
        </p>
      </div>

      <hr />

      {/* Job Title */}
      <FormSection
        title="Job Title"
        description="Job titles must describe one position."
      >
        <div className="">
          <input
            value={data.jobTitle}
            onChange={(e) =>
              updateData({
                jobTitle: e.target.value,
              })
            }
            placeholder="e.g. Software Engineer"
            className="w-full border border-neutral-20  px-4 py-3 outline-none focus:border-indigo-600 "
          />

          <p
            className={`mt-2 text-sm ${
              data.jobTitle.length >= 80 ? "text-green-600" : "text-gray-400"
            }`}
          >
            {data.jobTitle.length}/80 characters
          </p>
        </div>
      </FormSection>

      <FormSection
        title="Location"
        description="Use a city and country in Central Africa, or Remote."
      >
        <input
          value={data.location}
          onChange={(e) => updateData({ location: e.target.value })}
          placeholder="e.g. Kinshasa, DRC"
          className="w-full border border-neutral-20 px-4 py-3 outline-none focus:border-indigo-600"
        />
      </FormSection>

      {/* Employment */}
      <FormSection
        title="Type of Employment"
        description="You can select multiple employment types."
      >
        <div className="space-y-4">
          {employmentTypes.map((item) => (
            <label
              key={item}
              className="flex items-center text-neutral-80 gap-3"
            >
              <input
                type="checkbox"
                checked={data.employmentTypes.includes(item)}
                onChange={() => toggleEmploymentType(item)}
                className="h-4 w-4"
              />

              <span>{item}</span>
            </label>
          ))}
        </div>
      </FormSection>

      {/* Salary */}
      <FormSection
        title="Salary"
        description="Please specify the estimated salary range for the role. You can leave this blank."
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
        title="Category"
        description="You can select multiple job categories"
      >
        <select
          value={data.category}
          onChange={(e) =>
            updateData({
              category: e.target.value,
            })
          }
          className="w-80 border border-gray-300 px-4 py-3 outline-none focus:border-indigo-600 text-neutral-"
        >
          <option value="" className="">
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
        title="Required Skills"
        description="Add required skills for the job"
      >
        <SkillInput
          defaultSkills={data.skills}
          onChange={(skills) => updateData({ skills })}
        />
      </FormSection>
    </div>
  );
}
