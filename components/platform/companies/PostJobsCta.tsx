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
    <section
      aria-label="Post jobs call to action"
      className="relative w-full overflow-hidden mb-14 min-h-[380px]"
    >
      {/* Background SVG — fills full height including mockup on mobile */}
      <svg
        className="absolute inset-0 w-full h-full z-0 block"
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

      {/* Inner content */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-8 px-6 md:px-12 pt-10 md:pt-14">

        {/* Text + CTA */}
        <div className="flex flex-col items-center text-center md:items-start md:text-left flex-1 md:max-w-[480px] pb-6 md:pb-14">
          <h2 className="text-[clamp(1.75rem,6vw,2.25rem)] font-bold text-white leading-tight">
            {copy.title}
          </h2>
          <p className="mt-3 text-[16px] md:text-[18px] text-white/90">
            {copy.subtitle}
          </p>
          <Link
            href="/sign-up"
            className="mt-6 w-full md:w-auto text-center px-7 py-4 bg-white text-indigo-600 text-base font-bold border-2 border-white hover:bg-transparent hover:text-white transition-colors duration-200"
          >
            {copy.buttonLabel}
          </Link>
        </div>

        {/* Mock browser window */}
        <div
          className="w-full md:w-[560px] md:flex-shrink-0 flex justify-center md:justify-end items-end"
          aria-hidden
        >
          <div className="w-full md:max-w-[32rem] bg-white rounded-t-xl overflow-hidden shadow-[0_-4px_40px_rgba(0,0,0,0.2)]">
            {/* Browser chrome dots */}
            <div className="flex gap-1.5 px-3.5 py-2.5 bg-gray-100 border-b border-gray-200">
              <span className="w-2 h-2 rounded-full bg-gray-300" />
              <span className="w-2 h-2 rounded-full bg-gray-300" />
              <span className="w-2 h-2 rounded-full bg-gray-300" />
            </div>
            {/* Dashboard preview image */}
            <div className="w-full block leading-none">
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