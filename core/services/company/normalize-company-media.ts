import { mediaUrl } from "@/core/lib/media-url";
import type { Company, CompanyMember } from "@/core/types/company";

export function normalizeCompanyMedia(company: Company): Company {
  return {
    ...company,
    logo: company.logo ? mediaUrl(company.logo) : null,
    coverImage: company.coverImage ? mediaUrl(company.coverImage) : null,
    gallery: (company.gallery || []).map((image) => mediaUrl(image)),
    teamMembers: company.teamMembers?.map((member) => ({
      ...member,
      avatar: member.avatar ? mediaUrl(member.avatar) : undefined,
    })),
  };
}

export function normalizeMemberMedia(member: CompanyMember): CompanyMember {
  return {
    ...member,
    user: {
      ...member.user,
      avatar: member.user.avatar ? mediaUrl(member.user.avatar) : null,
    },
  };
}
