type JobCardProps = {
  title: string;
  location: string;
  salary: string;
  description: string;
  featured?: string;
};

export default function JobCard({
  title,
  location,
  salary,
  description,
  featured,
}: JobCardProps) {
  return (
    <div className={featured ? "job-card featured" : "job-card dark"}>
      <h3 className="text-xl font-semibold">{title}</h3>

      <p className="mt-2 text-sm">{location}</p>
      <p className="mt-6 text-sm">{salary}</p>
      <p className="mt-6 text-sm">{description}</p>
      <p className="mt-6 text-sm">{featured}</p>
    </div>
  );
}
