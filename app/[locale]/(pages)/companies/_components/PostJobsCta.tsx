import Link from "next/link";
import Image from "next/image";

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
      <svg
        className="companies-cta__bg"
        viewBox="0 0 1192 414"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
        preserveAspectRatio="none"
      >
        <path
          d="M0 63.5V414H999.712L1192 319.5V0H128.706L0 63.5Z"
          fill="#4640DE"
        />
      </svg>

      <div className="companies-cta__inner">
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
            <div className="companies-cta__mock-screen">
              <Image
                   src="/logo/dashboard-preview.png"
                   alt="Dashboard preview"
                   width={480}
                   height={360}
                  style={{ width: "100%", height: "auto" }}
                    />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}