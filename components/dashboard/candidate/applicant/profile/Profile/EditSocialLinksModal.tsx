"use client";

import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { LinkIcon } from "@heroicons/react/24/outline";
import toast from "react-hot-toast";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";

import ProfileEntryModal from "../shared/ProfileEntryModal";
import SubmitButton from "../shared/SubmitButton";
import { isValidUrl } from "../shared/profile-document-validation";
import { useUpdateCandidateProfile } from "@/core/hooks/candidate/use-update-candidate-profile";
import { toCandidateProfileInput } from "@/core/services/candidate/to-candidate-profile-input";
import type { CandidateProfile } from "@/core/types/candidate-profile";
import { ApiError } from "@/core/types/api";

type SocialLinksFormValues = { linkedinUrl: string; githubUrl: string; portfolioUrl: string };

interface EditSocialLinksModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  profile: CandidateProfile;
}

export default function EditSocialLinksModal({ open, onOpenChange, profile }: EditSocialLinksModalProps) {
  const t = useTranslations("candidateProfileCore.editSocialLinksModal");
  const updateProfile = useUpdateCandidateProfile();
  const isPending = updateProfile.isPending;
  const submittingRef = useRef(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SocialLinksFormValues>({ defaultValues: { linkedinUrl: "", githubUrl: "", portfolioUrl: "" } });

  useEffect(() => {
    if (!open) return;
    reset({
      linkedinUrl: profile.candidateProfile?.linkedinUrl || "",
      githubUrl: profile.candidateProfile?.githubUrl || "",
      portfolioUrl: profile.candidateProfile?.portfolioUrl || "",
    });
  }, [open, profile, reset]);

  const handleClose = () => {
    if (isPending) return;
    onOpenChange(false);
  };

  const onSubmit = async (values: SocialLinksFormValues) => {
    if (submittingRef.current) return;
    submittingRef.current = true;

    try {
      await updateProfile.mutateAsync(
        toCandidateProfileInput(profile, {
          linkedinUrl: values.linkedinUrl.trim() || null,
          githubUrl: values.githubUrl.trim() || null,
          portfolioUrl: values.portfolioUrl.trim() || null,
        }),
      );
      toast.success(t("successToast"));
      onOpenChange(false);
    } catch (error) {
      if (error instanceof ApiError) {
        console.error("Social links update rejected by backend:", error.status, error.details);
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
      icon={<LinkIcon className="h-5 w-5" />}
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
          <label htmlFor="profile-linkedin-url" className="mb-2 block text-sm font-medium text-[#25324B]">
            {t("linkedinLabel")}
          </label>
          <input
            id="profile-linkedin-url"
            type="url"
            placeholder={t("linkedinPlaceholder")}
            aria-invalid={Boolean(errors.linkedinUrl)}
            aria-describedby={errors.linkedinUrl ? "profile-linkedin-url-error" : undefined}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-brand"
            {...register("linkedinUrl", {
              validate: (value) => isValidUrl(value) || t("urlInvalid"),
            })}
          />
          {errors.linkedinUrl && (
            <p id="profile-linkedin-url-error" className="mt-1.5 text-[13px] text-red-500">
              {errors.linkedinUrl.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="profile-github-url" className="mb-2 block text-sm font-medium text-[#25324B]">
            {t("githubLabel")}
          </label>
          <input
            id="profile-github-url"
            type="url"
            placeholder={t("githubPlaceholder")}
            aria-invalid={Boolean(errors.githubUrl)}
            aria-describedby={errors.githubUrl ? "profile-github-url-error" : undefined}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-brand"
            {...register("githubUrl", {
              validate: (value) => isValidUrl(value) || t("urlInvalid"),
            })}
          />
          {errors.githubUrl && (
            <p id="profile-github-url-error" className="mt-1.5 text-[13px] text-red-500">
              {errors.githubUrl.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="profile-portfolio-url" className="mb-2 block text-sm font-medium text-[#25324B]">
            {t("portfolioLabel")}
          </label>
          <input
            id="profile-portfolio-url"
            type="url"
            placeholder={t("portfolioPlaceholder")}
            aria-invalid={Boolean(errors.portfolioUrl)}
            aria-describedby={errors.portfolioUrl ? "profile-portfolio-url-error" : undefined}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-brand"
            {...register("portfolioUrl", {
              validate: (value) => isValidUrl(value) || t("urlInvalid"),
            })}
          />
          {errors.portfolioUrl && (
            <p id="profile-portfolio-url-error" className="mt-1.5 text-[13px] text-red-500">
              {errors.portfolioUrl.message}
            </p>
          )}
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
