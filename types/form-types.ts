export interface JobInfo {
  title: string;
  company: string;
  location: string;
  type: string;
  logo?: string;
}

export interface ApplyOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  job?: JobInfo;
}

export interface FormField {
  label: string;
  type: string;
  placeholder: string;
}