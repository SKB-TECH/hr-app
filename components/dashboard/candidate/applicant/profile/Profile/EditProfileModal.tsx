"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import toast from "react-hot-toast";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";

import ProfileEntryModal from "../shared/ProfileEntryModal";
import ImageUpload from "../shared/ImageUpload";
import SubmitButton from "../shared/SubmitButton";
import CountryCitySelect from "../shared/CountryCitySelect";
import { useUpdateCandidateProfile } from "@/core/hooks/candidate/use-update-candidate-profile";
import { toCandidateProfileInput } from "@/core/services/candidate/to-candidate-profile-input";
import type { CandidateProfile } from "@/core/types/candidate-profile";
import { ApiError } from "@/core/types/api";

const HEADLINE_MAX_LENGTH = 120;

type ProfileFormValues = {
  fullName: string;
  headline: string;
  cityName: string;
  countryName: string;
  openToWork: boolean;
};

interface EditProfileModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  profile: CandidateProfile;
}

export default function EditProfileModal({
  open,
  onOpenChange,
  profile,
}: EditProfileModalProps) {
  const t = useTranslations("candidateProfileCore.editProfileModal");
  const updateProfile = useUpdateCandidateProfile();
  const isPending = updateProfile.isPending;
  const submittingRef = useRef(false);

  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    defaultValues: {
      fullName: "",
      headline: "",
      cityName: "",
      countryName: "",
      openToWork: false,
    },
  });

  useEffect(() => {
    if (!open) return;
    reset({
      fullName: profile.fullName || "",
      headline: profile.candidateProfile?.headline || "",
      cityName: profile.candidateProfile?.cityName || "",
      countryName: profile.candidateProfile?.countryName || "",
      openToWork: profile.candidateProfile?.openToWork || false,
    });
    setAvatarFile(null);
  }, [open, profile, reset]);

  const headlineValue = watch("headline");

  const handleClose = () => {
    if (isPending) return;
    onOpenChange(false);
  };

  const onSubmit = async (values: ProfileFormValues) => {
    if (submittingRef.current) return;
    submittingRef.current = true;

    try {
      await updateProfile.mutateAsync(
        toCandidateProfileInput(profile, {
          fullName: values.fullName.trim(),
          headline: values.headline.trim() || null,
          cityName: values.cityName.trim() || null,
          countryName: values.countryName.trim() || null,
          openToWork: values.openToWork,
          avatarFile: avatarFile || undefined,
        }),
      );

      toast.success(t("successToast"));
      onOpenChange(false);
    } catch (error) {
      if (error instanceof ApiError) {
        console.log(
          "Profile update rejected by backend:",
          error.status,
          error.details,
        );
      }
      const message =
        error instanceof ApiError ? error.message : t("errorToast");
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
      icon={<UserCircleIcon className='h-5 w-5' />}
      title={t("title")}
      description={t("description")}
    >
      <form
        noValidate
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmit(onSubmit)(event);
        }}
        className='mt-5 space-y-5'
      >
        <ImageUpload
          label={t("photoLabel")}
          shape='circle'
          file={avatarFile}
          currentImageUrl={profile.avatar}
          onSelect={setAvatarFile}
        />

        <div>
          <label
            htmlFor='profile-full-name'
            className='mb-2 block text-sm font-medium text-[#25324B]'
          >
            {t("fullNameLabel")}
          </label>
          <input
            id='profile-full-name'
            type='text'
            placeholder={t("fullNamePlaceholder")}
            aria-invalid={Boolean(errors.fullName)}
            aria-describedby={
              errors.fullName ? "profile-full-name-error" : undefined
            }
            className='w-full rounded-none border border-gray-300 px-4 py-3 outline-none transition focus:border-brand'
            {...register("fullName", {
              required: t("fullNameRequired"),
              validate: (value) =>
                value.trim().length > 0 || t("fullNameRequired"),
            })}
          />
          {errors.fullName && (
            <p
              id='profile-full-name-error'
              className='mt-1.5 text-[13px] text-red-500'
            >
              {errors.fullName.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor='profile-headline'
            className='mb-2 block text-sm font-medium text-[#25324B]'
          >
            {t("headlineLabel")}
          </label>
          <input
            id='profile-headline'
            type='text'
            maxLength={HEADLINE_MAX_LENGTH}
            placeholder={t("headlinePlaceholder")}
            className='w-full rounded-none border border-gray-300 px-4 py-3 outline-none transition focus:border-brand'
            {...register("headline")}
          />
          <p className='mt-1.5 text-right text-[12px] text-gray-400'>
            {headlineValue?.length || 0}/{HEADLINE_MAX_LENGTH}
          </p>
        </div>

        <CountryCitySelect
          countryValue={watch("countryName")}
          cityValue={watch("cityName")}
          onCountryChange={(value) =>
            setValue("countryName", value, { shouldDirty: true })
          }
          onCityChange={(value) =>
            setValue("cityName", value, { shouldDirty: true })
          }
          countryInputId='profile-country'
          cityInputId='profile-city'
        />

        <label className='flex cursor-pointer items-start gap-3 rounded-none border border-gray-200 p-4'>
          <input
            type='checkbox'
            className='mt-0.5 h-4 w-4 cursor-pointer accent-brand'
            {...register("openToWork")}
          />
          <span>
            <span className='block text-[14px] font-medium text-[#25324B]'>
              {t("openToWorkLabel")}
            </span>
            <span className='block text-[13px] text-gray-500'>
              {t("openToWorkDescription")}
            </span>
          </span>
        </label>

        <DialogFooter className='-mx-6 -mb-6 mt-2 rounded-b-xl border-t border-gray-100 bg-gray-50/60 px-6 py-4'>
          <Button
            type='button'
            variant='outline'
            onClick={handleClose}
            disabled={isPending}
          >
            {t("cancel")}
          </Button>
          <SubmitButton isPending={isPending} label={t("save")} />
        </DialogFooter>
      </form>
    </ProfileEntryModal>
  );
}
