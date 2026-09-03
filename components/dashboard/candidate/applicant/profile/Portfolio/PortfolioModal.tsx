"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { FolderIcon } from "@heroicons/react/24/outline";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";

import ProfileEntryModal from "../shared/ProfileEntryModal";
import SubmitButton from "../shared/SubmitButton";
import ImageUpload from "../shared/ImageUpload";
import { isValidUrl } from "../shared/profile-document-validation";
import { useCreateCandidatePortfolio } from "@/core/hooks/candidate/use-create-candidate-portfolio";
import { useUpdateCandidatePortfolio } from "@/core/hooks/candidate/use-update-candidate-portfolio";
import type { CandidatePortfolio } from "@/core/types/candidate-portfolio";
import { ApiError } from "@/core/types/api";

const DESCRIPTION_MAX_LENGTH = 500;

type PortfolioFormValues = {
  title: string;
  projectUrl: string;
  description: string;
};

interface PortfolioModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  portfolio?: CandidatePortfolio | null;
}

export default function PortfolioModal({
  open,
  onOpenChange,
  portfolio,
}: PortfolioModalProps) {
  const isEditing = Boolean(portfolio);
  const createPortfolio = useCreateCandidatePortfolio();
  const updatePortfolio = useUpdateCandidatePortfolio();
  const isPending = createPortfolio.isPending || updatePortfolio.isPending;
  const submittingRef = useRef(false);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailError, setThumbnailError] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<PortfolioFormValues>({
    defaultValues: { title: "", projectUrl: "", description: "" },
  });

  useEffect(() => {
    if (!open) return;
    reset({
      title: portfolio?.title || "",
      projectUrl: portfolio?.projectUrl || "",
      description: portfolio?.description || "",
    });
    setThumbnailFile(null);
    setThumbnailError("");
  }, [open, portfolio, reset]);

  const descriptionValue = watch("description");

  const handleClose = () => {
    if (isPending) return;
    onOpenChange(false);
  };

  const onSubmit = async (values: PortfolioFormValues) => {
    if (submittingRef.current) return;

    if (!isEditing && !thumbnailFile) {
      setThumbnailError("A project thumbnail is required.");
      return;
    }
    setThumbnailError("");
    submittingRef.current = true;

    try {
      const input = {
        title: values.title.trim(),
        projectUrl: values.projectUrl.trim() || null,
        description: values.description.trim(),
        thumbnail: thumbnailFile || undefined,
      };

      if (isEditing && portfolio) {
        await updatePortfolio.mutateAsync({ id: portfolio.id, input });
        toast.success("Project updated successfully.");
      } else {
        await createPortfolio.mutateAsync(input);
        toast.success("Project added successfully.");
      }
      onOpenChange(false);
    } catch (error) {
      if (error instanceof ApiError) {
        console.log(
          "Portfolio project save rejected by backend:",
          error.status,
          error.details,
        );
      }
      toast.error(
        error instanceof ApiError
          ? error.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      submittingRef.current = false;
    }
  };

  return (
    <ProfileEntryModal
      open={open}
      onOpenChange={onOpenChange}
      isPending={isPending}
      icon={<FolderIcon className='h-5 w-5' />}
      title={isEditing ? "Edit Project" : "Add Project"}
      description="Showcase work you're proud of so recruiters can see what you can build."
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
          label={isEditing ? "Project Thumbnail" : "Project Thumbnail *"}
          shape='rectangle'
          file={thumbnailFile}
          currentImageUrl={portfolio?.thumbnailUrl}
          onSelect={(file) => {
            setThumbnailFile(file);
            setThumbnailError("");
          }}
          error={thumbnailError}
        />

        <div>
          <label
            htmlFor='portfolio-title'
            className='mb-2 block text-sm font-medium text-[#25324B]'
          >
            Project Title
          </label>
          <input
            id='portfolio-title'
            type='text'
            placeholder='e.g. Growthly - SaaS Analytics Dashboard'
            aria-invalid={Boolean(errors.title)}
            aria-describedby={
              errors.title ? "portfolio-title-error" : undefined
            }
            className='w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-brand'
            {...register("title", {
              required: "Project title is required.",
              validate: (value) =>
                value.trim().length > 0 || "Project title is required.",
            })}
          />
          {errors.title && (
            <p
              id='portfolio-title-error'
              className='mt-1.5 text-[13px] text-red-500'
            >
              {errors.title.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor='portfolio-project-url'
            className='mb-2 block text-sm font-medium text-[#25324B]'
          >
            Project Link
          </label>
          <input
            id='portfolio-project-url'
            type='url'
            placeholder='https://...'
            aria-invalid={Boolean(errors.projectUrl)}
            aria-describedby={
              errors.projectUrl ? "portfolio-project-url-error" : undefined
            }
            className='w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-brand'
            {...register("projectUrl", {
              validate: (value) =>
                isValidUrl(value) || "Please enter a valid URL.",
            })}
          />
          {errors.projectUrl && (
            <p
              id='portfolio-project-url-error'
              className='mt-1.5 text-[13px] text-red-500'
            >
              {errors.projectUrl.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor='portfolio-description'
            className='mb-2 block text-sm font-medium text-[#25324B]'
          >
            Description
          </label>
          <textarea
            id='portfolio-description'
            rows={4}
            maxLength={DESCRIPTION_MAX_LENGTH}
            placeholder='Briefly describe the project, your role, and the tools you used.'
            aria-invalid={Boolean(errors.description)}
            aria-describedby={
              errors.description ? "portfolio-description-error" : undefined
            }
            className='w-full rounded-lg border border-gray-300 p-4 outline-none transition focus:border-brand'
            {...register("description", {
              required: "Description is required.",
              validate: (value) =>
                value.trim().length > 0 || "Description is required.",
            })}
          />
          <div className='mt-1.5 flex items-start justify-between gap-2'>
            {errors.description ? (
              <p
                id='portfolio-description-error'
                className='text-[13px] text-red-500'
              >
                {errors.description.message}
              </p>
            ) : (
              <span />
            )}
            <p className='shrink-0 text-right text-[12px] text-gray-400'>
              {descriptionValue?.length || 0}/{DESCRIPTION_MAX_LENGTH}
            </p>
          </div>
        </div>

        <DialogFooter className='-mx-6 -mb-6 mt-2 rounded-b-xl border-t border-gray-100 bg-gray-50/60 px-6 py-4'>
          <Button
            type='button'
            variant='outline'
            onClick={handleClose}
            disabled={isPending}
          >
            Cancel
          </Button>
          <SubmitButton
            isPending={isPending}
            label={isEditing ? "Update Project" : "Save Project"}
          />
        </DialogFooter>
      </form>
    </ProfileEntryModal>
  );
}
