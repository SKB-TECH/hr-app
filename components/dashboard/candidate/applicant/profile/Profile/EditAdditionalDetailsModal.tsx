"use client";

import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { DevicePhoneMobileIcon } from "@heroicons/react/24/outline";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";

import ProfileEntryModal from "../shared/ProfileEntryModal";
import SubmitButton from "../shared/SubmitButton";
import { useUpdateCandidateProfile } from "@/core/hooks/candidate/use-update-candidate-profile";
import { toCandidateProfileInput } from "@/core/services/candidate/to-candidate-profile-input";
import type { CandidateProfile } from "@/core/types/candidate-profile";
import { ApiError } from "@/core/types/api";

type AdditionalDetailsFormValues = { phoneNumber: string };

interface EditAdditionalDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  profile: CandidateProfile;
}

export default function EditAdditionalDetailsModal({ open, onOpenChange, profile }: EditAdditionalDetailsModalProps) {
  const updateProfile = useUpdateCandidateProfile();
  const isPending = updateProfile.isPending;
  const submittingRef = useRef(false);

  const { register, handleSubmit, reset } = useForm<AdditionalDetailsFormValues>({
    defaultValues: { phoneNumber: "" },
  });

  useEffect(() => {
    if (!open) return;
    reset({ phoneNumber: profile.phoneNumber || "" });
  }, [open, profile, reset]);

  const handleClose = () => {
    if (isPending) return;
    onOpenChange(false);
  };

  const onSubmit = async (values: AdditionalDetailsFormValues) => {
    if (submittingRef.current) return;
    submittingRef.current = true;

    try {
      await updateProfile.mutateAsync(toCandidateProfileInput(profile, { phoneNumber: values.phoneNumber.trim() || null }));
      toast.success("Additional details updated successfully.");
      onOpenChange(false);
    } catch (error) {
      if (error instanceof ApiError) {
        console.error("Additional details update rejected by backend:", error.status, error.details);
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
      icon={<DevicePhoneMobileIcon className="h-5 w-5" />}
      title="Edit Additional Details"
      description="Keep your contact details current so employers can reach you."
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
          <label htmlFor="profile-email-readonly" className="mb-2 block text-sm font-medium text-[#25324B]">
            Email
          </label>
          <input
            id="profile-email-readonly"
            type="email"
            value={profile.email}
            disabled
            className="w-full cursor-not-allowed rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-gray-500 outline-none"
          />
          <p className="mt-1.5 text-[12px] text-gray-400">Your email address can&apos;t be changed here.</p>
        </div>

        <div>
          <label htmlFor="profile-phone" className="mb-2 block text-sm font-medium text-[#25324B]">
            Phone
          </label>
          <input
            id="profile-phone"
            type="tel"
            placeholder="e.g. +250 788 123 456"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-brand"
            {...register("phoneNumber")}
          />
        </div>

        <DialogFooter className="-mx-6 -mb-6 mt-2 rounded-b-xl border-t border-gray-100 bg-gray-50/60 px-6 py-4">
          <Button type="button" variant="outline" onClick={handleClose} disabled={isPending}>
            Cancel
          </Button>
          <SubmitButton isPending={isPending} label="Save Changes" />
        </DialogFooter>
      </form>
    </ProfileEntryModal>
  );
}
