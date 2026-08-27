"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { format, parse, isValid as isValidDate } from "date-fns";
import { CalendarDaysIcon, AcademicCapIcon } from "@heroicons/react/24/outline";
import toast from "react-hot-toast";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

import CertificateUpload from "./CertificateUpload";
import { isFutureIssueDate, isValidCertificateUrl } from "./certification-validation";
import { useCreateCandidateCertification } from "@/core/hooks/candidate/use-create-candidate-certification";
import { useUpdateCandidateCertification } from "@/core/hooks/candidate/use-update-candidate-certification";
import type { CandidateCertification } from "@/core/types/candidate-certification";
import { ApiError } from "@/core/types/api";

const DATE_FORMAT = "yyyy-MM-dd";
const DESCRIPTION_MAX_LENGTH = 500;

type CertificationFormValues = {
  name: string;
  institution: string;
  issueDate: string;
  certificateUrl: string;
  description: string;
};

interface CertificationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  certification?: CandidateCertification | null;
}

export default function CertificationModal({ open, onOpenChange, certification }: CertificationModalProps) {
  const isEditing = Boolean(certification);
  const createCertification = useCreateCandidateCertification();
  const updateCertification = useUpdateCandidateCertification();
  const isPending = createCertification.isPending || updateCertification.isPending;
  const submittingRef = useRef(false);

  const [certificateFile, setCertificateFile] = useState<File | null>(null);
  const [removeExistingFile, setRemoveExistingFile] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<CertificationFormValues>({
    defaultValues: {
      name: "",
      institution: "",
      issueDate: "",
      certificateUrl: "",
      description: "",
    },
  });

  useEffect(() => {
    if (!open) return;
    reset({
      name: certification?.name || "",
      institution: certification?.institution || "",
      issueDate: certification?.issueDate ? certification.issueDate.slice(0, 10) : "",
      certificateUrl: certification?.certificateUrl || "",
      description: certification?.description || "",
    });
    setCertificateFile(null);
    setRemoveExistingFile(false);
  }, [open, certification, reset]);

  const issueDateValue = watch("issueDate");
  const descriptionValue = watch("description");
  const selectedDate = issueDateValue ? parse(issueDateValue, DATE_FORMAT, new Date()) : undefined;

  const handleClose = () => {
    if (isPending) return;
    onOpenChange(false);
  };

  const onSubmit = async (values: CertificationFormValues) => {
    if (submittingRef.current) return;
    submittingRef.current = true;

    try {
      const input = {
        name: values.name.trim(),
        institution: values.institution.trim(),
        issueDate: values.issueDate,
        certificateUrl: values.certificateUrl.trim() || null,
        description: values.description.trim() || null,
        certificateFile: certificateFile || undefined,
        removeCertificateFile: removeExistingFile && !certificateFile,
      };

      if (isEditing && certification) {
        await updateCertification.mutateAsync({ id: certification.id, input });
        toast.success("Certification updated successfully.");
      } else {
        await createCertification.mutateAsync(input);
        toast.success("Certification added successfully.");
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
    <Dialog open={open} onOpenChange={(value) => !value && handleClose()}>
      <DialogContent className="max-w-lg gap-0 rounded-xl p-0 sm:max-w-lg">
        <div className="max-h-[85vh] overflow-y-auto p-6">
          <DialogHeader className="mb-1 gap-1.5">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-brand">
                <AcademicCapIcon className="h-5 w-5" />
              </span>
              <DialogTitle className="text-[20px] font-bold text-[#25324B]">
                {isEditing ? "Edit Certification" : "Add Certification"}
              </DialogTitle>
            </div>
            <DialogDescription className="text-[14px] text-gray-500">
              Certifications help recruiters quickly see the skills you&apos;ve validated and how up to date they are.
            </DialogDescription>
          </DialogHeader>

          <form
            noValidate
            onSubmit={(event) => {
              event.preventDefault();
              handleSubmit(onSubmit)(event);
            }}
            className="mt-5 space-y-5"
          >
            <div>
              <label htmlFor="certification-name" className="mb-2 block text-sm font-medium text-[#25324B]">
                Certification Name
              </label>
              <input
                id="certification-name"
                type="text"
                placeholder="e.g. AWS Certified Cloud Practitioner"
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "certification-name-error" : undefined}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-brand"
                {...register("name", {
                  required: "Certificate name is required.",
                  validate: (value) => value.trim().length > 0 || "Certificate name is required.",
                })}
              />
              {errors.name && (
                <p id="certification-name-error" className="mt-1.5 text-[13px] text-red-500">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="certification-institution" className="mb-2 block text-sm font-medium text-[#25324B]">
                School or Training Center
              </label>
              <input
                id="certification-institution"
                type="text"
                placeholder="e.g. Rwanda Coding Academy"
                aria-invalid={Boolean(errors.institution)}
                aria-describedby={errors.institution ? "certification-institution-error" : undefined}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-brand"
                {...register("institution", {
                  required: "School or training center is required.",
                  validate: (value) => value.trim().length > 0 || "School or training center is required.",
                })}
              />
              {errors.institution && (
                <p id="certification-institution-error" className="mt-1.5 text-[13px] text-red-500">
                  {errors.institution.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="certification-issue-date" className="mb-2 block text-sm font-medium text-[#25324B]">
                Issue Date
              </label>
              <input type="hidden" id="certification-issue-date" {...register("issueDate", {
                required: "Issue date is required.",
                validate: (value) => {
                  if (!value) return "Issue date is required.";
                  const parsed = parse(value, DATE_FORMAT, new Date());
                  if (!isValidDate(parsed)) return "Please enter a valid date.";
                  if (isFutureIssueDate(value)) return "Issue date cannot be in the future.";
                  return true;
                },
              })} />
              <Popover>
                <PopoverTrigger asChild>
                  <button
                    type="button"
                    aria-describedby={errors.issueDate ? "certification-issue-date-error" : undefined}
                    className={`flex h-auto w-full items-center justify-between gap-2 rounded-lg border px-4 py-3 text-left text-[15px] transition ${
                      errors.issueDate ? "border-red-300" : "border-gray-300 hover:border-brand"
                    } ${!issueDateValue ? "text-gray-400" : "text-[#202430]"}`}
                  >
                    <span>{issueDateValue && isValidDate(selectedDate!) ? format(selectedDate!, "MMMM d, yyyy") : "Select the issue date"}</span>
                    <CalendarDaysIcon className="h-4 w-4 shrink-0 text-brand" />
                  </button>
                </PopoverTrigger>
                <PopoverContent align="start" className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={issueDateValue && isValidDate(selectedDate!) ? selectedDate : undefined}
                    onSelect={(date) => {
                      if (date) setValue("issueDate", format(date, DATE_FORMAT), { shouldValidate: true, shouldDirty: true });
                    }}
                    disabled={{ after: new Date() }}
                    defaultMonth={selectedDate}
                  />
                </PopoverContent>
              </Popover>
              {errors.issueDate && (
                <p id="certification-issue-date-error" className="mt-1.5 text-[13px] text-red-500">
                  {errors.issueDate.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="certification-url" className="mb-2 block text-sm font-medium text-[#25324B]">
                Certificate Link
              </label>
              <input
                id="certification-url"
                type="url"
                placeholder="https://..."
                aria-invalid={Boolean(errors.certificateUrl)}
                aria-describedby="certification-url-hint"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-brand"
                {...register("certificateUrl", {
                  validate: (value) => isValidCertificateUrl(value) || "Please enter a valid certificate URL.",
                })}
              />
              <p id="certification-url-hint" className="mt-1.5 text-[13px] text-gray-400">
                Add a public verification or certificate URL if available.
              </p>
              {errors.certificateUrl && <p className="mt-1 text-[13px] text-red-500">{errors.certificateUrl.message}</p>}
            </div>

            <CertificateUpload
              file={certificateFile}
              existingFileUrl={removeExistingFile ? null : certification?.certificateFileUrl}
              existingFileName={removeExistingFile ? null : certification?.certificateFileName}
              onSelect={(file) => {
                setCertificateFile(file);
                setRemoveExistingFile(false);
              }}
              onRemove={() => {
                setCertificateFile(null);
                setRemoveExistingFile(true);
              }}
            />

            <div>
              <label htmlFor="certification-description" className="mb-2 block text-sm font-medium text-[#25324B]">
                Description
              </label>
              <textarea
                id="certification-description"
                rows={4}
                maxLength={DESCRIPTION_MAX_LENGTH}
                placeholder="Briefly describe this certification, what you learned, or the skills covered."
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
                {isPending ? "Saving..." : isEditing ? "Update Certification" : "Save Certification"}
              </Button>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
