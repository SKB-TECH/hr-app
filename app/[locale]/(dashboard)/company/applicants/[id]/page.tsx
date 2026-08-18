import CompanyApplicantDetails from "@/components/dashboard/company/candidates/CompanyApplicantDetails";

export default async function ApplicantPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <CompanyApplicantDetails applicationId={id}/>;
}
