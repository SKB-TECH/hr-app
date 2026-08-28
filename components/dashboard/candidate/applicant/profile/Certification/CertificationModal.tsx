"use client";

import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { AcademicCapIcon } from "@heroicons/react/24/outline";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";

import ProfileEntryModal from "../shared/ProfileEntryModal";
import DateField from "../shared/DateField";
import { isBeforeDate, isFutureDate, isValidUrl } from "../shared/profile-document-validation";
import { useCreateCandidateCertification } from "@/core/hooks/candidate/use-create-candidate-certification";
import { useUpdateCandidateCertification } from "@/core/hooks/candidate/use-update-candidate-certification";
import type { CandidateCertification } from "@/core/types/candidate-certification";
import { ApiError } from "@/core/types/api";

type CertificationFormValues = {
  title: string;
  organization: string;
  issueDate: string;
  expirationDate: string;
  credentialId: string;
  credentialUrl: string;
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

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    trigger,
    getValues,
    formState: { errors },
  } = useForm<CertificationFormValues>({
    defaultValues: {
      title: "",
      organization: "",
      issueDate: "",
      expirationDate: "",
      credentialId: "",
      credentialUrl: "",
    },
  });

  useEffect(() => {
    if (!open) return;
    reset({
      title: certification?.title || "",
      organization: certification?.organization || "",
      issueDate: certification?.issueDate ? certification.issueDate.slice(0, 10) : "",
      expirationDate: certification?.expirationDate ? certification.expirationDate.slice(0, 10) : "",
      credentialId: certification?.credentialId || "",
      credentialUrl: certification?.credentialUrl || "",
    });
  }, [open, certification, reset]);

  const issueDateValue = watch("issueDate");
  const expirationDateValue = watch("expirationDate");

  const handleClose = () => {
    if (isPending) return;
    onOpenChange(false);
  };

  const onSubmit = async (values: CertificationFormValues) => {
    if (submittingRef.current) return;
    submittingRef.current = true;

    try {
      const input = {
        title: values.title.trim(),
        organization: values.organization.trim(),
        issueDate: values.issueDate,
        expirationDate: values.expirationDate || null,
        credentialId: values.credentialId.trim() || null,
        credentialUrl: values.credentialUrl.trim() || null,
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
    <ProfileEntryModal
      open={open}
      onOpenChange={onOpenChange}
      isPending={isPending}
      icon={<AcademicCapIcon className="h-5 w-5" />}
      title={isEditing ? "Edit Certification" : "Add Certification"}
      description="Certifications help recruiters quickly see the skills you've validated and how up to date they are."
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
          <label htmlFor="certification-title" className="mb-2 block text-sm font-medium text-[#25324B]">
            Certification Name
          </label>
          <input
            id="certification-title"
            type="text"
            placeholder="e.g. AWS Certified Solutions Architect – Associate"
            aria-invalid={Boolean(errors.title)}
            aria-describedby={errors.title ? "certification-title-error" : undefined}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-brand"
            {...register("title", {
              required: "Certificate name is required.",
              validate: (value) => value.trim().length > 0 || "Certificate name is required.",
            })}
          />
          {errors.title && (
            <p id="certification-title-error" className="mt-1.5 text-[13px] text-red-500">
              {errors.title.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="certification-organization" className="mb-2 block text-sm font-medium text-[#25324B]">
            Issuing Organization
          </label>
          <input
            id="certification-organization"
            type="text"
            placeholder="e.g. Amazon Web Services (AWS)"
            aria-invalid={Boolean(errors.organization)}
            aria-describedby={errors.organization ? "certification-organization-error" : undefined}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-brand"
            {...register("organization", {
              required: "Issuing organization is required.",
              validate: (value) => value.trim().length > 0 || "Issuing organization is required.",
            })}
          />
          {errors.organization && (
            <p id="certification-organization-error" className="mt-1.5 text-[13px] text-red-500">
              {errors.organization.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="certification-issue-date" className="mb-2 block text-sm font-medium text-[#25324B]">
              Issue Date
            </label>
            <input
              type="hidden"
              id="certification-issue-date"
              {...register("issueDate", {
                required: "Issue date is required.",
                validate: (value) => {
                  if (!value) return "Issue date is required.";
                  if (isFutureDate(value)) return "Issue date cannot be in the future.";
                  return true;
                },
              })}
            />
            <DateField
              id="certification-issue-date-trigger"
              value={issueDateValue}
              onChange={(value) => {
                setValue("issueDate", value, { shouldValidate: true, shouldDirty: true });
                if (expirationDateValue) trigger("expirationDate");
              }}
              placeholder="Select the issue date"
              error={errors.issueDate?.message}
              maxDate={new Date()}
            />
            {errors.issueDate && (
              <p id="certification-issue-date-error" className="mt-1.5 text-[13px] text-red-500">
                {errors.issueDate.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="certification-expiration-date" className="mb-2 block text-sm font-medium text-[#25324B]">
              Expiration Date
            </label>
            <input
              type="hidden"
              id="certification-expiration-date"
              {...register("expirationDate", {
                validate: (value) => {
                  if (!value) return true;
                  if (isBeforeDate(value, getValues("issueDate"))) {
                    return "Expiration date cannot be earlier than the issue date.";
                  }
                  return true;
                },
              })}
            />
            <DateField
              id="certification-expiration-date-trigger"
              value={expirationDateValue}
              onChange={(value) => setValue("expirationDate", value, { shouldValidate: true, shouldDirty: true })}
              placeholder="No expiration"
              error={errors.expirationDate?.message}
              minDate={issueDateValue ? new Date(issueDateValue) : undefined}
            />
            {errors.expirationDate && (
              <p className="mt-1.5 text-[13px] text-red-500">{errors.expirationDate.message}</p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="certification-credential-id" className="mb-2 block text-sm font-medium text-[#25324B]">
            Credential ID
          </label>
          <input
            id="certification-credential-id"
            type="text"
            placeholder="e.g. AWS-ASA-12345"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-brand"
            {...register("credentialId")}
          />
        </div>

        <div>
          <label htmlFor="certification-credential-url" className="mb-2 block text-sm font-medium text-[#25324B]">
            Credential URL
          </label>
          <input
            id="certification-credential-url"
            type="url"
            placeholder="https://..."
            aria-invalid={Boolean(errors.credentialUrl)}
            aria-describedby="certification-credential-url-hint"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-brand"
            {...register("credentialUrl", {
              validate: (value) => isValidUrl(value) || "Please enter a valid credential URL.",
            })}
          />
          <p id="certification-credential-url-hint" className="mt-1.5 text-[13px] text-gray-400">
            Add a public verification link if available.
          </p>
          {errors.credentialUrl && <p className="mt-1 text-[13px] text-red-500">{errors.credentialUrl.message}</p>}
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
    </ProfileEntryModal>
  );
}
