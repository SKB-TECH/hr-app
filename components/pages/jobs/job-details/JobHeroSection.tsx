import Image from "next/image";
import Link from "next/link";
import TriggerApplicationForm from "@/components/pages/jobs/job-details/job-application-form/TriggerApplicationForm";

type JobHeroSectionProps = {
  jobDetails: {
    title: string;
    image: string;
    company: string;
    location: string;
    jobType: string;
  };
};

export default function JobHeroSection({ jobDetails }: JobHeroSectionProps) {
  return (
    <div
      className="w-full bg-light-brand-neutral py-8 md:py-12"
      style={{
        backgroundImage: `url(/BG.webp)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className=" px-4 md:px-12   w-full max-w-7xl mx-auto">
        {/* Breadcrumbs */}
        <div className="flex items-center text-sm text-[#7C8493] mb-6 overflow-hidden">
          <Link
            href="/"
            className="hover:text-[#4640DE] transition-colors truncate max-w-[60px] md:max-w-none"
          >
            Home
          </Link>

          <span className="mx-2 shrink-0">/</span>

          <Link
            href="/companies"
            className="hover:text-[#4640DE] transition-colors truncate max-w-[90px] md:max-w-none"
          >
            Companies
          </Link>

          <span className="mx-2 shrink-0">/</span>

          <Link
            href={"/companies/1"}
            className="hover:text-[#4640DE] transition-colors truncate max-w-[80px] md:max-w-none"
          >
            {jobDetails.company}
          </Link>

          <span className="mx-2 shrink-0">/</span>

          <span className="text-[#25324B] font-medium text-nowrap">
            {jobDetails.title}
          </span>
        </div>

        {/* Hero Card */}
        <div className="w-full bg-white border border-[#D6DDEB] p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div className="flex flex-col md:flex-row md:items-center gap-6 w-full ">
            <div className="flex  flex-col md:flex-row md:items-center gap-5 flex-1">
              <div className="flex justify-between items-center ">
                <div className="relative w-18 h-18 shrink-0">
                  <Image
                    src={jobDetails.image}
                    alt={jobDetails.title}
                    fill
                    quality={100}
                    className="object-cover"
                  />
                </div>
                <button className="md:hidden text-[#7C8493] hover:text-[#4640DE] transition-colors cursor-pointer">
                  <Image
                    src="/linkIcon.png"
                    alt="Share"
                    width={28}
                    height={28}
                  />
                </button>
              </div>

              <div className="flex-1">
                <h1 className="text-[32px] leading-[1.05] max-md:text-[28px] tracking-0 font-bold text-[#25324B] tracking-[-0.02em]">
                  {jobDetails.title}
                </h1>

                <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mt-4 text-[14px]  text-[#515B6F]">
                  <span>{jobDetails.company}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#A8ADB7]" />
                  <span>{jobDetails.location}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#A8ADB7]" />
                  <span>{jobDetails.jobType}</span>
                </div>
              </div>
            </div>

            <div className="flex md:flex-row flex-col md:items-center gap-6 md:gap-8">
              <button className="hidden md:block text-[#7C8493] hover:text-[#4640DE] transition-colors cursor-pointer">
                <Image src="/linkIcon.png" alt="Share" width={28} height={28} />
              </button>

              <div className="hidden md:block w-px h-14 bg-[#D6DDEB]" />

              <TriggerApplicationForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
