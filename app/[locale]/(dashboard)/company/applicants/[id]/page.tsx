import CompanyApplicantDetails from "@/components/dashboard/company/candidates/CompanyApplicantDetails";
import ProposeJobMessageButton from "@/components/dashboard/company/candidates/ProposeJobMessageButton";

export default async function ApplicantPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <><CompanyApplicantDetails applicationId={id}/><ProposeJobMessageButton applicationId={id}/></>;
}
