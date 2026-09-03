import JobDetailsView from "@/components/platform/jobs/job-details/JobDetailsView";

export default async function JobDetailsPage({
  params,
}: Readonly<{
  params: Promise<{ jobId: string }>;
}>) {
  const { jobId } = await params;

  return <JobDetailsView jobId={jobId} />;
}
