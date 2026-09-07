export type PlatformReferenceType = "country" | "language" | "skill_category" | "job_category" | "benefit";

export type PlatformReference = {
  id: string;
  type: PlatformReferenceType;
  code: string;
  name: string;
  description?: string | null;
  icon?: string | null;
  phoneCode?: string | null;
};
