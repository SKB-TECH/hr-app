"use client";

import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { DocumentTextIcon } from "@heroicons/react/24/outline";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";

import ProfileEntryModal from "../shared/ProfileEntryModal";
import SubmitButton from "../shared/SubmitButton";
import { useUpdateCandidateProfile } from "@/core/hooks/candidate/use-update-candidate-profile";
import { toCandidateProfileInput } from "@/core/services/candidate/to-candidate-profile-input";
import type { CandidateProfile } from "@/core/types/candidate-profile";
import { ApiError } from "@/core/types/api";

const BIO_MAX_LENGTH = 1000;

type BioFormValues = { bio: string };

interface EditBioModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  profile: CandidateProfile;
}

export default function EditBioModal({ open, onOpenChange, profile }: EditBioModalProps) {
  const updateProfile = useUpdateCandidateProfile();
  const isPending = updateProfile.isPending;
  const submittingRef = useRef(false);

  const { register, handleSubmit, watch, reset } = useForm<BioFormValues>({
    defaultValues: { bio: "" },
  });

  useEffect(() => {
    if (!open) return;
    reset({ bio: profile.candidateProfile?.bio || "" });
  }, [open, profile, reset]);

  const bioValue = watch("bio");

  const handleClose = () => {
    if (isPending) return;
    onOpenChange(false);
  };

  const onSubmit = async (values: BioFormValues) => {
    if (submittingRef.current) return;
    submittingRef.current = true;

    try {
      await updateProfile.mutateAsync(toCandidateProfileInput(profile, { bio: values.bio.trim() || null }));
      toast.success("About section updated successfully.");
      onOpenChange(false);
    } catch (error) {
      if (error instanceof ApiError) {
        console.error("Bio update rejected by backend:", error.status, error.details);
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
      icon={<DocumentTextIcon className="h-5 w-5" />}
      title="Edit About Me"
      description="Tell recruiters who you are, what you do, and what you're looking for."
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
          <label htmlFor="profile-bio" className="mb-2 block text-sm font-medium text-[#25324B]">
            About Me
          </label>
          <textarea
            id="profile-bio"
            rows={6}
            maxLength={BIO_MAX_LENGTH}
            placeholder="I'm a product designer + filmmaker currently working remotely..."
            className="w-full rounded-lg border border-gray-300 p-4 outline-none transition focus:border-brand"
            {...register("bio")}
          />
          <p className="mt-1.5 text-right text-[12px] text-gray-400">
            {bioValue?.length || 0}/{BIO_MAX_LENGTH}
          </p>
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
