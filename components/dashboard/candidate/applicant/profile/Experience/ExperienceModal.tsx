"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { BriefcaseIcon } from "@heroicons/react/24/outline";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";

import ProfileEntryModal from "../shared/ProfileEntryModal";
import DateField from "../shared/DateField";
import SubmitButton from "../shared/SubmitButton";
import { isFutureDate } from "../shared/profile-document-validation";
import { EMPLOYMENT_TYPE_OPTIONS, isEndBeforeStart } from "./experience-options";
import { useCreateCandidateExperience } from "@/core/hooks/candidate/use-create-candidate-experience";
import { useUpdateCandidateExperience } from "@/core/hooks/candidate/use-update-candidate-experience";
import type { CandidateExperience } from "@/core/types/candidate-experience";
import { ApiError } from "@/core/types/api";

const DESCRIPTION_MAX_LENGTH = 500;

type ExperienceFormValues = {
  title: string;
  companyName: string;
  employmentType: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
};

interface ExperienceModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  experience?: CandidateExperience | null;
}

export default function ExperienceModal({ open, onOpenChange, experience }: ExperienceModalProps) {
  const isEditing = Boolean(experience);
  const createExperience = useCreateCandidateExperience();
  const updateExperience = useUpdateCandidateExperience();
  const isPending = createExperience.isPending || updateExperience.isPending;
  const submittingRef = useRef(false);

  const [isCurrent, setIsCurrent] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    getValues,
    trigger,
    formState: { errors },
  } = useForm<ExperienceFormValues>({
    defaultValues: { title: "", companyName: "", employmentType: "", location: "", startDate: "", endDate: "", description: "" },
  });

  useEffect(() => {
    if (!open) return;
    reset({
      title: experience?.title || "",
      companyName: experience?.companyName || "",
      employmentType: experience?.employmentType || "",
      location: experience?.location || "",
      startDate: experience?.startDate ? experience.startDate.slice(0, 10) : "",
      endDate: experience?.endDate ? experience.endDate.slice(0, 10) : "",
      description: experience?.description || "",
    });
    setIsCurrent(Boolean(experience) && !experience?.endDate);
  }, [open, experience, reset]);

  const startDateValue = watch("startDate");
  const endDateValue = watch("endDate");
  const descriptionValue = watch("description");

  const handleClose = () => {
    if (isPending) return;
    onOpenChange(false);
  };

  const onSubmit = async (values: ExperienceFormValues) => {
    if (submittingRef.current) return;
    submittingRef.current = true;

    try {
      const input = {
        title: values.title.trim(),
        companyName: values.companyName.trim(),
        employmentType: values.employmentType || null,
        location: values.location.trim() || null,
        startDate: values.startDate,
        endDate: isCurrent ? null : values.endDate || null,
        description: values.description.trim() || null,
      };

      if (isEditing && experience) {
        await updateExperience.mutateAsync({ id: experience.id, input });
        toast.success("Experience updated successfully.");
      } else {
        await createExperience.mutateAsync(input);
        toast.success("Experience added successfully.");
      }
      onOpenChange(false);
    } catch (error) {
      if (error instanceof ApiError) {
        console.error("Experience save rejected by backend:", error.status, error.details);
      }
      toast.error(error instanceof ApiError ? error.message : "Something went wrong. Please try again.");
    } finally {
      submittingRef.current = false;
    }
  };

  return (
    <ProfileEntryModal
      open={open}
      onOpenChange={onOpenChange}
      isPending={isPending}
      icon={<BriefcaseIcon className="h-5 w-5" />}
      title={isEditing ? "Edit Experience" : "Add Experience"}
      description="Add your work history to show recruiters what you've built and led."
    >
      <form
        noValidate
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmit(onSubmit)(event);
        }}
        className="mt-5 space-y-5"
      >
        <div>
          <label htmlFor="experience-job-title" className="mb-2 block text-sm font-medium text-[#25324B]">
            Job Title
          </label>
          <input
            id="experience-job-title"
            type="text"
            placeholder="e.g. Senior Product Designer"
            aria-invalid={Boolean(errors.title)}
            aria-describedby={errors.title ? "experience-job-title-error" : undefined}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-brand"
            {...register("title", {
              required: "Job title is required.",
              validate: (value) => value.trim().length > 0 || "Job title is required.",
            })}
          />
          {errors.title && (
            <p id="experience-job-title-error" className="mt-1.5 text-[13px] text-red-500">
              {errors.title.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="experience-company-name" className="mb-2 block text-sm font-medium text-[#25324B]">
              Company
            </label>
            <input
              id="experience-company-name"
              type="text"
              placeholder="e.g. Twitter"
              aria-invalid={Boolean(errors.companyName)}
              aria-describedby={errors.companyName ? "experience-company-name-error" : undefined}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-brand"
              {...register("companyName", {
                required: "Company is required.",
                validate: (value) => value.trim().length > 0 || "Company is required.",
              })}
            />
            {errors.companyName && (
              <p id="experience-company-name-error" className="mt-1.5 text-[13px] text-red-500">
                {errors.companyName.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="experience-employment-type" className="mb-2 block text-sm font-medium text-[#25324B]">
              Employment Type
            </label>
            <select
              id="experience-employment-type"
              className="w-full cursor-pointer rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-brand"
              {...register("employmentType")}
            >
              <option value="">Select an option</option>
              {EMPLOYMENT_TYPE_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="experience-location" className="mb-2 block text-sm font-medium text-[#25324B]">
            Location
          </label>
          <input
            id="experience-location"
            type="text"
            placeholder="e.g. Manchester, UK"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-brand"
            {...register("location")}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="experience-start-date" className="mb-2 block text-sm font-medium text-[#25324B]">
              Start Date
            </label>
            <input
              type="hidden"
              id="experience-start-date"
              {...register("startDate", {
                required: "Start date is required.",
                validate: (value) => {
                  if (!value) return "Start date is required.";
                  if (isFutureDate(value)) return "Start date cannot be in the future.";
                  return true;
                },
              })}
            />
            <DateField
              id="experience-start-date-trigger"
              value={startDateValue}
              onChange={(value) => {
                setValue("startDate", value, { shouldValidate: true, shouldDirty: true });
                if (endDateValue) trigger("endDate");
              }}
              placeholder="Select the start date"
              error={errors.startDate?.message}
              maxDate={new Date()}
            />
            {errors.startDate && <p className="mt-1.5 text-[13px] text-red-500">{errors.startDate.message}</p>}
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between gap-2">
              <label htmlFor="experience-end-date" className="block text-sm font-medium text-[#25324B]">
                End Date
              </label>
              <label className="flex cursor-pointer items-center gap-1.5 text-[13px] font-medium text-gray-500">
                <input
                  type="checkbox"
                  checked={isCurrent}
                  onChange={(event) => {
                    setIsCurrent(event.target.checked);
                    trigger("endDate");
                  }}
                  className="h-3.5 w-3.5 cursor-pointer accent-brand"
                />
                I currently work here
              </label>
            </div>

            {isCurrent ? (
              <div className="flex h-[50px] items-center rounded-lg border border-gray-200 bg-gray-50 px-4 text-[14px] text-gray-500">
                Currently working — no end date
              </div>
            ) : (
              <>
                <input
                  type="hidden"
                  id="experience-end-date"
                  {...register("endDate", {
                    validate: (value) => {
                      if (isCurrent) return true;
                      if (!value) return "End date is required.";
                      if (isFutureDate(value)) return "End date cannot be in the future.";
                      if (isEndBeforeStart(getValues("startDate"), value)) {
                        return "End date cannot be earlier than the start date.";
                      }
                      return true;
                    },
                  })}
                />
                <DateField
                  id="experience-end-date-trigger"
                  value={endDateValue}
                  onChange={(value) => setValue("endDate", value, { shouldValidate: true, shouldDirty: true })}
                  placeholder="Select the end date"
                  error={errors.endDate?.message}
                  maxDate={new Date()}
                />
              </>
            )}
            {!isCurrent && errors.endDate && <p className="mt-1.5 text-[13px] text-red-500">{errors.endDate.message}</p>}
          </div>
        </div>

        <div>
          <label htmlFor="experience-description" className="mb-2 block text-sm font-medium text-[#25324B]">
            Description
          </label>
          <textarea
            id="experience-description"
            rows={4}
            maxLength={DESCRIPTION_MAX_LENGTH}
            placeholder="Describe your responsibilities, achievements, and impact in this role."
            className="w-full rounded-lg border border-gray-300 p-4 outline-none transition focus:border-brand"
            {...register("description")}
          />
          <p className="mt-1.5 text-right text-[12px] text-gray-400">
            {descriptionValue?.length || 0}/{DESCRIPTION_MAX_LENGTH}
          </p>
        </div>

        <DialogFooter className="-mx-6 -mb-6 mt-2 rounded-b-xl border-t border-gray-100 bg-gray-50/60 px-6 py-4">
          <Button type="button" variant="outline" onClick={handleClose} disabled={isPending}>
            Cancel
          </Button>
          <SubmitButton isPending={isPending} label={isEditing ? "Update Experience" : "Save Experience"} />
        </DialogFooter>
      </form>
    </ProfileEntryModal>
  );
}
