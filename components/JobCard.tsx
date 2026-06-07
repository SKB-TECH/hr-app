type Job = {
  id: string;
  ref: string;
  title: string;
  location: string;
  salary: string;
  jobType: string;
  description: string;
};

interface JobCardProps {
  job: Job;
}

export function JobCard({ job }: JobCardProps) {
  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-500">{job.ref}</p>
          <h2 className="text-xl font-semibold text-gray-900">{job.title}</h2>
        </div>
        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-700">
          {job.jobType}
        </span>
      </div>

      <p className="mt-4 text-sm text-gray-600">{job.description}</p>

      <div className="mt-5 flex flex-wrap gap-3 text-sm text-gray-500">
        <span>{job.location}</span>
        <span>•</span>
        <span>{job.salary}</span>
      </div>
    </div>
  );
}
