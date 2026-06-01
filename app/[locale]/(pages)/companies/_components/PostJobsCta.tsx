import Link from "next/link";

type PostJobsCtaProps = {
  copy: {
    title: string;
    subtitle: string;
    buttonLabel: string;
  };
};

export default function PostJobsCta({ copy }: PostJobsCtaProps) {
  return (
    <section aria-label="Post jobs call to action" className="companies-cta">
      <div className="companies-cta__content">
        <h2 className="companies-cta__title">{copy.title}</h2>
        <p className="companies-cta__subtitle">{copy.subtitle}</p>
        <Link href="/sign-up" className="companies-cta__btn">
          {copy.buttonLabel}
        </Link>
      </div>

      <div className="companies-cta__visual" aria-hidden>
        <div className="companies-cta__mock">
          <div className="companies-cta__mock-header">
            <span className="companies-cta__mock-dot" />
            <span className="companies-cta__mock-dot" />
            <span className="companies-cta__mock-dot" />
          </div>
          <div className="companies-cta__mock-body">
            <div className="companies-cta__mock-card companies-cta__mock-card--primary">
              Post a job
            </div>
            <div className="companies-cta__mock-card">
              <span className="companies-cta__mock-label">Applicants Statistic</span>
              <div className="companies-cta__mock-chart">
                <span />
                <span />
                <span />
                <span />
              </div>
            </div>
            <div className="companies-cta__mock-card">
              <span className="companies-cta__mock-label">Recent Applicants</span>
              <ul className="companies-cta__mock-list">
                <li />
                <li />
                <li />
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
