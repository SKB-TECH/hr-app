"use client";

import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { BriefcaseIcon } from "@heroicons/react/24/outline";
import toast from "react-hot-toast";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";

import ProfileEntryModal from "../shared/ProfileEntryModal";
import SubmitButton from "../shared/SubmitButton";
import { WORK_TYPE_OPTIONS, AVAILABILITY_OPTIONS } from "./candidate-profile-options";
import { useUpdateCandidateProfile } from "@/core/hooks/candidate/use-update-candidate-profile";
import { toCandidateProfileInput } from "@/core/services/candidate/to-candidate-profile-input";
import type { CandidateProfile } from "@/core/types/candidate-profile";
import { ApiError } from "@/core/types/api";

type WorkPreferencesFormValues = {
  yearsExperience: string;
  workType: string;
  availability: string;
};

// Maps the snake_case values in candidate-profile-options.ts to the camelCase
// translation keys under candidateProfileCore.workTypeOptions / availabilityOptions.
function toOptionKey(value: string): string {
  return value.replace(/_([a-z])/g, (_match, letter: string) => letter.toUpperCase());
}

interface EditWorkPreferencesModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  profile: CandidateProfile;
}

export default function EditWorkPreferencesModal({ open, onOpenChange, profile }: EditWorkPreferencesModalProps) {
  const t = useTranslations("candidateProfileCore.editWorkPreferencesModal");
  const tWorkType = useTranslations("candidateProfileCore.workTypeOptions");
  const tAvailability = useTranslations("candidateProfileCore.availabilityOptions");
  const updateProfile = useUpdateCandidateProfile();
  const isPending = updateProfile.isPending;
  const submittingRef = useRef(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<WorkPreferencesFormValues>({
    defaultValues: { yearsExperience: "", workType: "", availability: "" },
  });

  useEffect(() => {
    if (!open) return;
    const details = profile.candidateProfile;
    reset({
      yearsExperience: details?.yearsExperience != null ? String(details.yearsExperience) : "",
      workType: details?.workType || "",
      availability: details?.availability || "",
    });
  }, [open, profile, reset]);

  const handleClose = () => {
    if (isPending) return;
    onOpenChange(false);
  };

  const onSubmit = async (values: WorkPreferencesFormValues) => {
    if (submittingRef.current) return;
    submittingRef.current = true;

    try {
      await updateProfile.mutateAsync(
        toCandidateProfileInput(profile, {
          yearsExperience: values.yearsExperience.trim() ? Number(values.yearsExperience) : null,
          workType: values.workType || null,
          availability: values.availability || null,
        }),
      );
      toast.success(t("successToast"));
      onOpenChange(false);
    } catch (error) {
      if (error instanceof ApiError) {
        console.error("Work preferences update rejected by backend:", error.status, error.details);
      }
      toast.error(error instanceof ApiError ? error.message : t("errorToast"));
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
      title={t("title")}
      description={t("description")}
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
          <label htmlFor="profile-years-experience" className="mb-2 block text-sm font-medium text-[#25324B]">
            {t("yearsLabel")}
          </label>
          <input
            id="profile-years-experience"
            type="number"
            min={0}
            max={60}
            step={1}
            placeholder={t("yearsPlaceholder")}
            aria-invalid={Boolean(errors.yearsExperience)}
            aria-describedby={errors.yearsExperience ? "profile-years-experience-error" : undefined}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-brand"
            {...register("yearsExperience", {
              validate: (value) => {
                if (!value.trim()) return true;
                const parsed = Number(value);
                return (Number.isInteger(parsed) && parsed >= 0 && parsed <= 60) || t("yearsError");
              },
            })}
          />
          {errors.yearsExperience && (
            <p id="profile-years-experience-error" className="mt-1.5 text-[13px] text-red-500">
              {errors.yearsExperience.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="profile-work-type" className="mb-2 block text-sm font-medium text-[#25324B]">
            {t("workTypeLabel")}
          </label>
          <select
            id="profile-work-type"
            className="w-full cursor-pointer rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-brand"
            {...register("workType")}
          >
            <option value="">{t("selectOption")}</option>
            {WORK_TYPE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {tWorkType(toOptionKey(option.value))}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="profile-availability" className="mb-2 block text-sm font-medium text-[#25324B]">
            {t("availabilityLabel")}
          </label>
          <select
            id="profile-availability"
            className="w-full cursor-pointer rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-brand"
            {...register("availability")}
          >
            <option value="">{t("selectOption")}</option>
            {AVAILABILITY_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {tAvailability(toOptionKey(option.value))}
              </option>
            ))}
          </select>
        </div>

        <DialogFooter className="-mx-6 -mb-6 mt-2 rounded-b-xl border-t border-gray-100 bg-gray-50/60 px-6 py-4">
          <Button type="button" variant="outline" onClick={handleClose} disabled={isPending}>
            {t("cancel")}
          </Button>
          <SubmitButton isPending={isPending} label={t("save")} />
        </DialogFooter>
      </form>
    </ProfileEntryModal>
  );
}
