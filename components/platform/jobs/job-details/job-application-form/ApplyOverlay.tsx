"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useTranslations } from "next-intl";

import "./ApplyOverlay.css";
import type { ApplyOverlayProps } from "@/types/form-types";
import OverlayHeader from "./OverlayHeader";
import OverlayForm from "./OverlayForm";
import OverlayFooter from "./OverlayFooter";
import ResumeModal from "@/components/dashboard/candidate/applicant/profile/Resume/ResumeModal";
import { useSession } from "@/core/hooks/auth/use-session";
import { useMyCandidateProfile } from "@/core/hooks/candidate/use-my-candidate-profile";
import { useCandidateResumes } from "@/core/hooks/candidate/use-candidate-resumes";
import { useCreateApplication } from "@/core/hooks/applications/use-create-application";
import { ApiError } from "@/core/types/api";

export type ApplicationFormValues = {
  fullName: string;
  email: string;
  phone: string;
  currentJobTitle: string;
  linkedinUrl: string;
  portfolioUrl: string;
  coverLetter: string;
};

const EMPTY_VALUES: ApplicationFormValues = {
  fullName: "",
  email: "",
  phone: "",
  currentJobTitle: "",
  linkedinUrl: "",
  portfolioUrl: "",
  coverLetter: "",
};

export default function ApplyOverlay({ isOpen, onClose, job }: ApplyOverlayProps) {
  const t = useTranslations("findJobs");
  const { data: session } = useSession();
  const { data: profile } = useMyCandidateProfile();
  const { data: resumes = [], isLoading: isLoadingResumes } = useCandidateResumes();
  const createApplication = useCreateApplication();

  const [values, setValues] = useState<ApplicationFormValues>(EMPTY_VALUES);
  const [resumeId, setResumeId] = useState<string | undefined>(undefined);
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const [prefilled, setPrefilled] = useState(false);

  useEffect(() => {
    if (prefilled || (!session && !profile)) return;
    setValues((previous) => ({
      ...previous,
      fullName: previous.fullName || session?.fullName || "",
      email: previous.email || session?.email || "",
      linkedinUrl: previous.linkedinUrl || profile?.candidateProfile?.linkedinUrl || "",
      portfolioUrl: previous.portfolioUrl || profile?.candidateProfile?.portfolioUrl || "",
    }));
    setPrefilled(true);
  }, [session, profile, prefilled]);

  useEffect(() => {
    if (resumeId || resumes.length === 0) return;
    setResumeId(resumes.find((resume) => resume.isDefault)?.id || resumes[0].id);
  }, [resumes, resumeId]);

  if (!isOpen) return null;

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) onClose();
  };

  const handleChange = (key: keyof ApplicationFormValues, value: string) => {
    setValues((previous) => ({ ...previous, [key]: value }));
  };

  const handleSubmit = async () => {
    if (!values.fullName.trim() || !values.email.trim()) {
      toast.error(t("apply.requiredFieldsMissing"));
      return;
    }

    try {
      await createApplication.mutateAsync({
        jobId: job.id,
        resumeId,
        fullName: values.fullName.trim(),
        email: values.email.trim(),
        phone: values.phone.trim() || null,
        currentJobTitle: values.currentJobTitle.trim() || null,
        linkedinUrl: values.linkedinUrl.trim() || null,
        portfolioUrl: values.portfolioUrl.trim() || null,
        coverLetter: values.coverLetter.trim() || null,
      });
      toast.success(t("apply.submitSuccess"));
      onClose();
    } catch (error) {
      toast.error(error instanceof ApiError ? error.message : t("apply.submitError"));
    }
  };

  return (
    <div className="apply-overlay__backdrop" onClick={handleBackdropClick}>
      <div
        className="apply-overlay__modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="apply-modal-title"
      >
        <OverlayHeader job={job} onClose={onClose} />
        <OverlayForm
          company={job.companyName || job.title}
          values={values}
          onChange={handleChange}
          resumes={resumes}
          isLoadingResumes={isLoadingResumes}
          resumeId={resumeId}
          onResumeChange={setResumeId}
          onUploadNewResume={() => setResumeModalOpen(true)}
        />
        <OverlayFooter isPending={createApplication.isPending} onSubmit={handleSubmit} />
      </div>
      <ResumeModal open={resumeModalOpen} onOpenChange={setResumeModalOpen} />
    </div>
  );
}
