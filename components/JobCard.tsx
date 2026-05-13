
type JobCardProps = {
  title: string
  location: string
  salary: string
  description: string
  featured?: boolean   
}

export default function JobCard({ title, location, salary, description, featured }: JobCardProps) {
  return (
    <div className={featured ? "job-card featured" : "job-card dark"}>
        <h3 className="job-card-title">{title}</h3>
      <p className="job-card-location">{location}</p>
      <p className="job-card-salary">{salary}</p>
      <p className="job-card-desc">{description}</p>
      <span className="job-card-link">View Job</span>
    </div>
  )
}