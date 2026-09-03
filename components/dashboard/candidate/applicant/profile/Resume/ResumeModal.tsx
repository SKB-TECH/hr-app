"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { DocumentTextIcon } from "@heroicons/react/24/outline";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";

import ProfileEntryModal from "../shared/ProfileEntryModal";
import SubmitButton from "../shared/SubmitButton";
import DocumentUpload from "../shared/DocumentUpload";
import { useCreateCandidateResume } from "@/core/hooks/candidate/use-create-candidate-resume";
import { ApiError } from "@/core/types/api";

interface ResumeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ResumeModal({ open, onOpenChange }: ResumeModalProps) {
  const t = useTranslations("candidateProfileSections");
  const createResume = useCreateCandidateResume();
  const isPending = createResume.isPending;
  const submittingRef = useRef(false);

  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState("");

  useEffect(() => {
    if (!open) return;
    setFile(null);
    setFileError("");
  }, [open]);

  const handleClose = () => {
    if (isPending) return;
    onOpenChange(false);
  };

  const handleSubmit = async () => {
    if (submittingRef.current) return;
    if (!file) {
      setFileError(t("resume.modal.fileRequired"));
      return;
    }
    setFileError("");
    submittingRef.current = true;

    try {
      await createResume.mutateAsync({ file });
      toast.success(t("resume.toasts.uploaded"));
      onOpenChange(false);
    } catch (error) {
      toast.error(error instanceof ApiError ? error.message : t("resume.toasts.genericError"));
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
      title={t("resume.modal.title")}
      description={t("resume.modal.description")}
    >
      <form
        onSubmit={(event) => {
          event.preventDefault();
          void handleSubmit();
        }}
        className="mt-5 space-y-5"
      >
        <DocumentUpload
          label={t("resume.modal.fileLabel")}
          file={file}
          error={fileError}
          onSelect={(selected) => {
            setFile(selected);
            setFileError("");
          }}
        />

        <DialogFooter className="-mx-6 -mb-6 mt-2 rounded-b-xl border-t border-gray-100 bg-gray-50/60 px-6 py-4">
          <Button type="button" variant="outline" onClick={handleClose} disabled={isPending}>
            {t("resume.modal.cancel")}
          </Button>
          <SubmitButton isPending={isPending} label={t("resume.modal.uploadSubmit")} />
        </DialogFooter>
      </form>
    </ProfileEntryModal>
  );
}
