"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";

import SettingsProfile, { ProfileFormValues } from "./SettingsProfile";
import { useMyCandidateProfile } from "@/core/hooks/candidate/use-my-candidate-profile";
import { useUpdateCandidateProfile } from "@/core/hooks/candidate/use-update-candidate-profile";
import { toCandidateProfileInput } from "@/core/services/candidate/to-candidate-profile-input";
import { ApiError } from "@/core/types/api";

function ProfileWrapper() {
  const t = useTranslations("candidateSettings.profile");
  const { data: profile, isLoading, isError } = useMyCandidateProfile();
  const updateProfile = useUpdateCandidateProfile();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      dateOfBirth: "",
      gender: "",
      profileImage: null,
    },
  });

  useEffect(() => {
    if (!profile) return;
    reset({
      fullName: profile.fullName || "",
      phone: profile.phoneNumber || "",
      email: profile.email || "",
      dateOfBirth: profile.candidateProfile?.birthDate
        ? profile.candidateProfile.birthDate.slice(0, 10)
        : "",
      gender: profile.candidateProfile?.gender || "",
      profileImage: null,
    });
  }, [profile, reset]);

  const onSubmit = async (values: ProfileFormValues) => {
    if (!profile) return;
    try {
      await updateProfile.mutateAsync(
        toCandidateProfileInput(profile, {
          fullName: values.fullName.trim(),
          phoneNumber: values.phone.trim() || null,
          gender: values.gender || null,
          birthDate: values.dateOfBirth || null,
          avatarFile: values.profileImage || undefined,
        }),
      );
      toast.success(t("toasts.updated"));
      setValue("profileImage", null);
    } catch (error) {
      toast.error(error instanceof ApiError ? error.message : t("toasts.genericError"));
    }
  };

  if (isLoading) {
    return <div className="animate-pulse space-y-4 py-6 text-sm text-gray-400">{t("loading")}</div>;
  }

  if (isError || !profile) {
    return (
      <p className="text-[14px] text-gray-500">
        {t("loadError")}
      </p>
    );
  }

  return (
    <div>
      <SettingsProfile
        profile={profile}
        register={register}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        errors={errors}
        isSubmitting={updateProfile.isPending}
        setValue={setValue}
        watch={watch}
      />
    </div>
  );
}

export default ProfileWrapper;
