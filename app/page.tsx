import Navbar from "@/components/Navbar";
import JobCard from "@/components/JobCard";
import Button from "@/components/Button";

const jobs = [
  {
    id: 1,
    title: "Frontend Developer",
    location: "Manchester, UK",
    salary: "£40000 – £55000 per annum",
    description:
      "Lorem ipsum dolor sit amet consectetur. Turpis sed pulvinar sed blandit rhoncus tellus senectus at quis. Mi at fermentum imperdiet velit magna a aliquam. Faucibus et quam ac elit placerat tristique vulputate.",
  },
  {
    id: 2,
    title: "Frontend Developer",
    location: "Manchester, UK",
    salary: "£40000 – £55000 per annum",
    description:
      "Lorem ipsum dolor sit amet consectetur. Turpis sed pulvinar sed blandit rhoncus tellus senectus at quis. Mi at fermentum imperdiet velit magna a aliquam. Faucibus et quam ac elit placerat tristique vulputate.",
  },
  {
    id: 3,
    title: "Frontend Developer",
    location: "Manchester, UK",
    salary: "£40000 – £55000 per annum",
    description:
      "Lorem ipsum dolor sit amet consectetur. Turpis sed pulvinar sed blandit rhoncus tellus senectus at quis. Mi at fermentum imperdiet velit magna a aliquam. Faucibus et quam ac elit placerat tristique vulputate.",
  },
]

export default function HomePage() {
  return (
    <main>
      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-overlay" />
        <div className="hero-content">
          <p className="hero-subtitle">Recruitment for creative people</p>
          <h1 className="hero-heading">
            <span className="teal">Talent?</span>
            Meet<br />Opportunity.
          </h1>
          <Button variant="hero">Job Openings →</Button>
        </div>
      </section>

      {/* JOBS SECTION */}
      <section className="jobs-section" id="jobs">
        <div className="jobs-header">
          <div>
            <p className="jobs-label">Jobs</p>
            <h2 className="jobs-title">Latest Openings</h2>
          </div>
          <Button variant="arrow">→</Button>
        </div>

        <div className="jobs-grid">
          {jobs.map((job, index) => (
            <JobCard
              key={job.id}
              title={job.title}
              location={job.location}
              salary={job.salary}
              description={job.description}
              featured={index === 0}
            />
          ))}
        </div>
      </section>
    </main>
  )
}

