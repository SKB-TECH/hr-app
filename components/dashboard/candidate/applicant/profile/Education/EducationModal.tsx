"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { BookOpenIcon } from "@heroicons/react/24/outline";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";

import ProfileEntryModal from "../shared/ProfileEntryModal";
import DocumentUpload from "../shared/DocumentUpload";
import DateField from "../shared/DateField";
import { isFutureDate, isValidUrl } from "../shared/profile-document-validation";
import { DEGREE_SUGGESTIONS, isEndBeforeStart } from "./education-validation";
import { useCreateCandidateEducation } from "@/core/hooks/candidate/use-create-candidate-education";
import { useUpdateCandidateEducation } from "@/core/hooks/candidate/use-update-candidate-education";
import type { CandidateEducation } from "@/core/types/candidate-education";
import { ApiError } from "@/core/types/api";

const DESCRIPTION_MAX_LENGTH = 500;

type EducationFormValues = {
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  grade: string;
  educationUrl: string;
  description: string;
};

interface EducationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  education?: CandidateEducation | null;
}

export default function EducationModal({ open, onOpenChange, education }: EducationModalProps) {
  const isEditing = Boolean(education);
  const createEducation = useCreateCandidateEducation();
  const updateEducation = useUpdateCandidateEducation();
  const isPending = createEducation.isPending || updateEducation.isPending;
  const submittingRef = useRef(false);

  const [documentFile, setDocumentFile] = useState<File | null>(null);
  const [removeExistingFile, setRemoveExistingFile] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    getValues,
    trigger,
    formState: { errors },
  } = useForm<EducationFormValues>({
    defaultValues: {
      institution: "",
      degree: "",
      fieldOfStudy: "",
      startDate: "",
      endDate: "",
      isCurrent: false,
      grade: "",
      educationUrl: "",
      description: "",
    },
  });

  useEffect(() => {
    if (!open) return;
    reset({
      institution: education?.institution || "",
      degree: education?.degree || "",
      fieldOfStudy: education?.fieldOfStudy || "",
      startDate: education?.startDate ? education.startDate.slice(0, 10) : "",
      endDate: education?.endDate ? education.endDate.slice(0, 10) : "",
      isCurrent: education?.isCurrent || false,
      grade: education?.grade || "",
      educationUrl: education?.educationUrl || "",
      description: education?.description || "",
    });
    setDocumentFile(null);
    setRemoveExistingFile(false);
  }, [open, education, reset]);

  const startDateValue = watch("startDate");
  const endDateValue = watch("endDate");
  const isCurrentValue = watch("isCurrent");
  const descriptionValue = watch("description");

  const handleClose = () => {
    if (isPending) return;
    onOpenChange(false);
  };

  const onSubmit = async (values: EducationFormValues) => {
    if (submittingRef.current) return;
    submittingRef.current = true;

    try {
      const input = {
        institution: values.institution.trim(),
        degree: values.degree.trim(),
        fieldOfStudy: values.fieldOfStudy.trim() || null,
        startDate: values.startDate,
        endDate: values.isCurrent ? null : values.endDate || null,
        isCurrent: values.isCurrent,
        grade: values.grade.trim() || null,
        educationUrl: values.educationUrl.trim() || null,
        description: values.description.trim() || null,
        documentFile: documentFile || undefined,
        removeDocumentFile: removeExistingFile && !documentFile,
      };

      if (isEditing && education) {
        await updateEducation.mutateAsync({ id: education.id, input });
        toast.success("Education updated successfully.");
      } else {
        await createEducation.mutateAsync(input);
        toast.success("Education added successfully.");
      }
      onOpenChange(false);
    } catch (error) {
      const message = error instanceof ApiError ? error.message : "Something went wrong. Please try again.";
      toast.error(message);
    } finally {
      submittingRef.current = false;
    }
  };

  return (
    <ProfileEntryModal
      open={open}
      onOpenChange={onOpenChange}
      isPending={isPending}
      icon={<BookOpenIcon className="h-5 w-5" />}
      title={isEditing ? "Edit Education" : "Add Education"}
      description="Add your academic background to help employers better understand your qualifications."
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
          <label htmlFor="education-institution" className="mb-2 block text-sm font-medium text-[#25324B]">
            School or Institution
          </label>
          <input
            id="education-institution"
            type="text"
            placeholder="e.g. University of Rwanda"
            aria-invalid={Boolean(errors.institution)}
            aria-describedby={errors.institution ? "education-institution-error" : undefined}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-brand"
            {...register("institution", {
              required: "School or institution is required.",
              validate: (value) => value.trim().length > 0 || "School or institution is required.",
            })}
          />
          {errors.institution && (
            <p id="education-institution-error" className="mt-1.5 text-[13px] text-red-500">
              {errors.institution.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="education-degree" className="mb-2 block text-sm font-medium text-[#25324B]">
              Degree or Qualification
            </label>
            <input
              id="education-degree"
              type="text"
              list="education-degree-options"
              placeholder="e.g. Bachelor's Degree"
              aria-invalid={Boolean(errors.degree)}
              aria-describedby={errors.degree ? "education-degree-error" : undefined}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-brand"
              {...register("degree", {
                required: "Degree or qualification is required.",
                validate: (value) => value.trim().length > 0 || "Degree or qualification is required.",
              })}
            />
            <datalist id="education-degree-options">
              {DEGREE_SUGGESTIONS.map((degree) => (
                <option key={degree} value={degree} />
              ))}
            </datalist>
            {errors.degree && (
              <p id="education-degree-error" className="mt-1.5 text-[13px] text-red-500">
                {errors.degree.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="education-field-of-study" className="mb-2 block text-sm font-medium text-[#25324B]">
              Field of Study
            </label>
            <input
              id="education-field-of-study"
              type="text"
              placeholder="e.g. Computer Science"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-brand"
              {...register("fieldOfStudy")}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="education-start-date" className="mb-2 block text-sm font-medium text-[#25324B]">
              Start Date
            </label>
            <input
              type="hidden"
              id="education-start-date"
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
              id="education-start-date-trigger"
              value={startDateValue}
              onChange={(value) => {
                setValue("startDate", value, { shouldValidate: true, shouldDirty: true });
                if (endDateValue) trigger("endDate");
              }}
              placeholder="Select the start date"
              error={errors.startDate?.message}
              maxDate={new Date()}
            />
            {errors.startDate && (
              <p className="mt-1.5 text-[13px] text-red-500">{errors.startDate.message}</p>
            )}
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between gap-2">
              <label htmlFor="education-end-date" className="block text-sm font-medium text-[#25324B]">
                End Date
              </label>
              <label className="flex cursor-pointer items-center gap-1.5 text-[13px] font-medium text-gray-500">
                <input
                  type="checkbox"
                  className="h-3.5 w-3.5 cursor-pointer accent-brand"
                  {...register("isCurrent", {
                    onChange: () => trigger("endDate"),
                  })}
                />
                Currently studying here
              </label>
            </div>

            {isCurrentValue ? (
              <div className="flex h-[50px] items-center rounded-lg border border-gray-200 bg-gray-50 px-4 text-[14px] text-gray-500">
                Currently studying — no end date
              </div>
            ) : (
              <>
                <input
                  type="hidden"
                  id="education-end-date"
                  {...register("endDate", {
                    validate: (value) => {
                      if (getValues("isCurrent")) return true;
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
                  id="education-end-date-trigger"
                  value={endDateValue}
                  onChange={(value) => setValue("endDate", value, { shouldValidate: true, shouldDirty: true })}
                  placeholder="Select the end date"
                  error={errors.endDate?.message}
                  maxDate={new Date()}
                />
              </>
            )}
            {!isCurrentValue && errors.endDate && (
              <p className="mt-1.5 text-[13px] text-red-500">{errors.endDate.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="education-grade" className="mb-2 block text-sm font-medium text-[#25324B]">
              Grade or Score
            </label>
            <input
              id="education-grade"
              type="text"
              placeholder="e.g. 3.8 GPA, Distinction"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-brand"
              {...register("grade")}
            />
          </div>

          <div>
            <label htmlFor="education-url" className="mb-2 block text-sm font-medium text-[#25324B]">
              Institution or Education Link
            </label>
            <input
              id="education-url"
              type="url"
              placeholder="https://university.example.com"
              aria-invalid={Boolean(errors.educationUrl)}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-brand"
              {...register("educationUrl", {
                validate: (value) => isValidUrl(value) || "Please enter a valid URL.",
              })}
            />
            {errors.educationUrl && <p className="mt-1.5 text-[13px] text-red-500">{errors.educationUrl.message}</p>}
          </div>
        </div>

        <DocumentUpload
          label="Upload Supporting Document"
          title="Upload supporting document"
          file={documentFile}
          existingFileUrl={removeExistingFile ? null : education?.documentFileUrl}
          existingFileName={removeExistingFile ? null : education?.documentFileName}
          onSelect={(file) => {
            setDocumentFile(file);
            setRemoveExistingFile(false);
          }}
          onRemove={() => {
            setDocumentFile(null);
            setRemoveExistingFile(true);
          }}
        />

        <div>
          <label htmlFor="education-description" className="mb-2 block text-sm font-medium text-[#25324B]">
            Description
          </label>
          <textarea
            id="education-description"
            rows={4}
            maxLength={DESCRIPTION_MAX_LENGTH}
            placeholder="Add additional information about your education, achievements, specialization, or relevant coursework."
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
          <Button type="submit" disabled={isPending} className="bg-brand text-white hover:bg-[#3730c4]">
            {isPending ? "Saving..." : isEditing ? "Update Education" : "Save Education"}
          </Button>
        </DialogFooter>
      </form>
    </ProfileEntryModal>
  );
}
