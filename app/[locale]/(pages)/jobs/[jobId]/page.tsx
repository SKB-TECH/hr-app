export default function JobDetailsPage({
  params,
}: Readonly<{
  params: { jobId: string };
}>) {
  const { jobId } = params;
  return (
    <main className='flex-1 p-8'>
      <h1 className='text-3xl font-bold mb-4'>Job Details for ID: {jobId}</h1>
      <p className='text-gray-600'>
        Here you can display the details of the job with ID: {jobId}.
      </p>
    </main>
  );
}
