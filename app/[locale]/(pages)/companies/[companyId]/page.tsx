import { ArrowRightIcon } from "lucide-react";
import Stripe from "../../../../../components/pages/companies/CompanyProfile/StripeHeroSection";
import { companyProfiles } from "@/data/companyDetails";
import TeamSection from "@/components/pages/companies/CompanyProfile/teamSection";
import JobPerksSection from "@/components/pages/jobs/job-details/JobPerksSection";
import SimilarJobsSection from "@/components/pages/jobs/job-details/SimilarJobsSection";
import { similarJobs } from "@/data/jobDetailsData";
import OpenJobsSection from "@/components/pages/companies/CompanyProfile/OpenJobsSection";
import Link from "next/link";

interface Company {
  id: string;
  name: string;
  description: string;
  socials: {
    twitter: string;
    facebook: string;
    linkedin: string;
  };
  techStack: {
    image: string;
    name: string;
  }[];
  offices: {
    image: string;
    name: string;
  }[];
  teamMembers: {
    image: string;
    name: string;
    role: string;
  }[];
  perks: {
    icon: string;
    title: string;
    description: string;
  }[];
  SimilarJobsSectionProps: {
    jobs: [];
    showAllHref?: string;
    title?: string;
  };
}

export default async function CompanyPage({
  params,
}: Readonly<{
  params: Promise<{ companyId: string }>;
}>) {
  const { companyId } = await params;
  const companyDetails = companyProfiles.find(
    (company) => company.id === companyId,
  );

  if (!companyDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center text-brand capitalize text-[24px] font-semibold">
        Company not found
      </div>
    );
  }
  return (
    <main className="w-full ">
      <Stripe />
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-20 max-w-6xl mx-auto px-4 md:px-8 py-6 md:py-15">
        <div className="w-full lg:w-2/3 ">
          <h1 className="text-neutral-100 text-3xl font-clash font-bold mb-5">
            {companyDetails.name}
          </h1>
          <p className="text-neutral-80 font-epilogue">
            {companyDetails.description}
          </p>

          {/* contact section */}
          <div className="">
            <h1 className="text-neutral-100 text-3xl font-clash font-bold mb-5 mt-5">
              Contact
            </h1>
            <div className="flex flex-wrap gap-3">
              <div className="flex gap-5 border border-brand/50 px-2 py-1">
                <img
                  src="/twitter.png"
                  alt="icon"
                  className="h-4 w-4 items-center mt-1"
                />
                <h1 className="text-base md:text-lg text-brand font-epilogue break-all">
                  {companyDetails.socials.twitter}
                </h1>
              </div>
              <div className="flex gap-5 border border-brand/50 px-2 py-1">
                <img
                  src="/facebook.png"
                  alt="icon"
                  className="h-5 w-2 items-center mt-1"
                />
                <h1 className="text-base md:text-lg text-brand font-epilogue break-all">
                  {companyDetails.socials.facebook}
                </h1>
              </div>
              <div className="flex gap-5 border border-brand/50 px-2 py-1">
                <img src="/icon7.png" alt="icon" className="h-5 w-5" />
                <h1 className="text-base md:text-lg text-brand font-epilogue break-all">
                  {companyDetails.socials.linkedin}
                </h1>
              </div>
            </div>

            {/* profile image */}
            <div className="flex flex-col md:flex-row gap-2 mt-10">
              <div className="md:w-1/2 w-full h-full">
                <img
                  src="/profile1.jpg"
                  alt="image"
                  className="h-70 md:h-112 object-cover"
                />
              </div>
              <div className="w-1/3 gap-2 md:gap-2 h-full flex md:flex-col">
                <img
                  src="/profile2.jpg"
                  alt="image"
                  className="w-27 h-27 md:w-full md:h-full object-cover"
                />
                <img
                  src="/profile3.jpg"
                  alt="image"
                  className="w-27 h-27 md:w-full md:h-full object-cover"
                />
                <img
                  src="/profile4.jpg"
                  alt="image"
                  className="w-27 h-27 md:w-full md:h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-1/3">
          <h1 className="text-neutral-100 text-3xl font-clash font-bold mb-5">
            Tech stack
          </h1>
          <p className="text-neutral-80 font-epilogue">
            Learn about the technology and tools that Stripe uses.
          </p>
          <div className="flex flex-wrap gap-10 mt-4">
            {companyDetails.techStack.map((tech) => (
              <div key={tech.name} className="flex flex-col items-center">
                <img src={tech.image} alt={tech.name} className="h-15 w-15" />
                <span className="text-neutral-100 font-epilogue">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-10 ">
            <Link
              href="/#"
              className="text-base md:text-[16px] text-brand font-epilogue break-all"
            >
              View tech stack
              <ArrowRightIcon className="inline-block h-5 w-5 ml-5" />
            </Link>
          </div>
          <div className="max-w-6xl h-0.5 bg-[#D6DDEB] mt-5" />
          <div className="mt-15">
            <h1 className="text-neutral-100 text-3xl font-clash font-bold mb-5">
              Office Location
            </h1>
            <p className="text-neutral-80 font-epilogue">
              Stripe offices spread across 20 countries
            </p>

            <div>
              {companyDetails.offices.map((office) => (
                <div key={office.name} className="flex items-center gap-3 mt-2">
                  <img
                    src={office.image}
                    alt={office.name}
                    className="h-7 w-7"
                  />
                  <span className="text-neutral-100 font-semibold font-epilogue">
                    {office.name}
                  </span>
                </div>
              ))}
              <Link
                href="/#"
                className="text-base md:text-[16px] text-brand font-epilogue font-semibold break-all mt-5 inline-flex items-center"
              >
                View Countries
                <ArrowRightIcon className="inline-block h-5 w-5 ml-5" />
              </Link>
            </div>
            <div className="w-[376px] h-0.5 bg-[#D6DDEB] mt-5 hidden md:block" />
          </div>
        </div>
      </div>
      <TeamSection teamMembers={companyDetails.teamMembers} />
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-6 md:py-15 ">
        <JobPerksSection perks={companyDetails.perks} />
      </div>
      <OpenJobsSection jobs={similarJobs} />
    </main>
  );
}
