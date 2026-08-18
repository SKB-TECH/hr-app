import { PublicCompanyProfile } from "@/components/platform/companies/PublicCompanyProfile";

export default async function CompanyPage({ params }: { params: Promise<{ companyId: string }> }) {
  const { companyId } = await params;
  return <PublicCompanyProfile id={companyId} />;
}
