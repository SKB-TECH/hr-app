export type PlatformReferenceType = "country" | "job_category" | "benefit";

export type PlatformReference = {
  id: string;
  type: PlatformReferenceType;
  code: string;
  name: string;
  description: string | null;
  icon: string | null;
};
