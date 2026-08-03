"use client";

import InputField from "@/components/dashboard/candidate/settings/profile/InputField";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select";
import TagInput from "./TagInput";

import { UseFormRegister, FieldErrors, UseFormSetValue } from "react-hook-form";
import { ProfileFormValues } from "../Overview";

interface CompanyDetailsProps {
  register: UseFormRegister<ProfileFormValues>;
  errors: FieldErrors<ProfileFormValues>;
  setValue?: UseFormSetValue<ProfileFormValues>;
  locationTags: string[];
  setLocationTags: (tags: string[]) => void;
  techStackTags: string[];
  setTechStackTags: (tags: string[]) => void;
}

const employeeOptions = [
  "1 - 50",
  "51 - 150",
  "151 - 250",
  "251 - 500",
  "501 - 1000",
  "1000+",
];

const industryOptions = [
  "Technology",
  "Finance",
  "Healthcare",
  "Education",
  "Marketing",
  "Design",
  "Retail",
  "Manufacturing",
];

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const locationOptions = [
  "England",
  "Japan",
  "Australia",
  "Canada",
  "Germany",
  "United States",
];

const techStackOptions = [
  "HTML 5",
  "CSS 3",
  "Javascript",
  "TypeScript",
  "React",
  "Node.js",
];

function CompanyDetails({
  register,
  errors,
  setValue,
  locationTags,
  setLocationTags,
  techStackTags,
  setTechStackTags,
}: CompanyDetailsProps) {
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

  return (
    <div className="mb-8 grid gap-6 md:grid-cols-[300px_minmax(0,540px)] md:gap-x-[78px]">
      <div>
        <h2 className="text-[16px]! leading-6 font-epilogue font-semibold text-neutral-100">
          Company Details
        </h2>
        <p className="text-[15px]! leading-relaxed font-epilogue text-gray-500 mt-1">
          Introduce your company core info quickly to users by fill up company
          details.
        </p>
      </div>

      <div className="space-y-5">
        {/* Company Name */}
        <div>
          <InputField
            {...register("companyName", {
              required: "Company name is required",
            })}
            label="Company Name"
            placeholder="Name of your company"
          />
          {errors.companyName && (
            <p className="text-red-500 text-sm mt-2">
              {errors.companyName.message}
            </p>
          )}
        </div>

        {/* Website */}
        <div>
          <InputField
            {...register("website", {
              required: "Website is required",
            })}
            label="Website"
            placeholder="Https://www.companywebsite.com"
          />
          {errors.website && (
            <p className="text-red-500 text-sm mt-2">
              {errors.website.message}
            </p>
          )}
        </div>

        {/* Location Tag Input */}
        <TagInput
          label="Location"
          tags={locationTags}
          onTagsChange={setLocationTags}
          options={locationOptions}
          placeholder="Add location..."
        />

        {/* Employee & Industry */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Employee
            </label>
            <Select
              defaultValue="1 - 50"
              onValueChange={(value) => {
                setValue?.("employee", value, { shouldValidate: true });
              }}
            >
              <SelectTrigger className="text-neutral-100! w-full border border-gray-200 px-4 py-5.5 text-sm rounded-none focus:outline-brand">
                <SelectValue placeholder="Select range" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {employeeOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Industry
            </label>
            <Select
              defaultValue="Technology"
              onValueChange={(value) => {
                setValue?.("industry", value, { shouldValidate: true });
              }}
            >
              <SelectTrigger className="text-neutral-100! w-full border border-gray-200 px-4 py-5.5 text-sm rounded-none focus:outline-brand">
                <SelectValue placeholder="Select industry" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {industryOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Date Founded */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date Founded
          </label>
          <div className="grid grid-cols-3 gap-4">
            <Select
              defaultValue="31"
              onValueChange={(value) => {
                setValue?.("date", Number(value), { shouldValidate: true });
              }}
            >
              <SelectTrigger className="text-neutral-100! w-full border border-gray-200 px-4 py-5.5 text-sm rounded-none focus:outline-brand">
                <SelectValue placeholder="Day" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {days.map((day) => (
                    <SelectItem key={day} value={String(day)}>
                      {day}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            <Select
              defaultValue="July"
              onValueChange={(value) => {
                setValue?.("month", value, { shouldValidate: true });
              }}
            >
              <SelectTrigger className="text-neutral-100! w-full border border-gray-200 px-4 py-5.5 text-sm rounded-none focus:outline-brand">
                <SelectValue placeholder="Month" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {months.map((month) => (
                    <SelectItem key={month} value={month}>
                      {month}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            <Select
              defaultValue="2021"
              onValueChange={(value) => {
                setValue?.("year", Number(value), { shouldValidate: true });
              }}
            >
              <SelectTrigger className="text-neutral-100! w-full border border-gray-200 px-4 py-5.5 text-sm rounded-none focus:outline-brand">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {years.map((year) => (
                    <SelectItem key={year} value={String(year)}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Tech Stack Tag Input */}
        <TagInput
          label="Tech Stack"
          tags={techStackTags}
          onTagsChange={setTechStackTags}
          options={techStackOptions}
          placeholder="Add tech stack..."
        />
      </div>
    </div>
  );
}
export default CompanyDetails;
