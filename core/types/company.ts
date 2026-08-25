export type CompanyPerk = { title: string; description: string; icon?: string };
export type CompanyStatus = "active" | "deactivated" | "deletion_scheduled";
export type CompanyVisibility = "public" | "authenticated" | "verified_candidates" | "private";

export type Company = {
  id: string;
  name: string;
  slug: string | null;
  description: string | null;
  industry: string | null;
  location: string | null;
  locations: string[];
  foundationDate: string | null;
  companySize: string | null;
  logo: string | null;
  coverImage: string | null;
  website: string | null;
  facebook: string | null;
  twitter: string | null;
  instagram: string | null;
  linkedin: string | null;
  youtube: string | null;
  techStack: string[];
  perks: CompanyPerk[];
  gallery: string[];
  visibility: CompanyVisibility;
  emailContactEnabled: boolean;
  inAppContactEnabled: boolean;
  status: CompanyStatus;
  teamMembers?: CompanyTeamMember[];
};

export type CompanyInput = Partial<Omit<Company, "id" | "slug" | "status" | "teamMembers">> & { name: string };
export type CompanyQuery = { search?: string; location?: string; industry?: string; companySize?: string; page?: number; limit?: number };
export type CompanyMemberRole = "HR_MANAGER" | "RECRUITER";
export type CompanyMember = {
  id: string;
  companyId: string;
  userId: string;
  role: CompanyMemberRole | "COMPANY_OWNER";
  title: string | null;
  joinedAt: string;
  user: { id: string; fullName: string; email: string; avatar: string | null };
};
export type CompanyInvitation = {
  id: string;
  email: string;
  fullName: string | null;
  title: string | null;
  role: CompanyMemberRole;
  status: "pending" | "accepted" | "revoked" | "expired";
  expiresAt: string;
  createdAt: string;
};
export type AddCompanyMemberInput = { email: string; fullName?: string; title?: string; role: CompanyMemberRole };
export type CompanyTeamMemberInput = { name: string; role: string; avatar?: string; instagram?: string; linkedin?: string; displayOrder?: number };
export type CompanyTeamMember = CompanyTeamMemberInput & { id: string; companyId: string; createdAt: string; updatedAt: string };
export type CompanyNotificationPreferences = { id: string; companyId: string; userId: string; recruiterRelated: boolean; subscriptionNotifications: boolean; billingAlerts: boolean; securityUpdates: boolean; updatedAt: string };
