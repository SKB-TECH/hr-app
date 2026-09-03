import type { CompanyJob } from "@/core/types/job";

export interface ApplyOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  job: CompanyJob;
}

export interface FormField {
  key: string;
  label: string;
  type: string;
  placeholder: string;
}
