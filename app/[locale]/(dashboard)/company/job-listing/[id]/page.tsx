import CompanyJobATSPage from "@/components/dashboard/company/recruitment/CompanyJobATSPage";

export default async function JobPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <CompanyJobATSPage jobId={id} />;
}
