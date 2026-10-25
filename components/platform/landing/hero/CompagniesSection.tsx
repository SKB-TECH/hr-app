import { getTranslations } from "next-intl/server";
import {
  VodafoneLogo,
  IntelLogo,
  TeslaLogo,
  AmdLogoSvg,
  TalkitLogo,
} from "../icons";

export interface Company {
  name: string;
  logo: React.ReactNode;
}

export interface CompaniesSectionProps {
  label?: string;
  companies?: Company[];
}

const defaultCompanies: Company[] = [
  { name: "Vodafone", logo: <VodafoneLogo /> },
  { name: "Intel", logo: <IntelLogo /> },
  { name: "Tesla", logo: <TeslaLogo /> },
  { name: "AMD", logo: <AmdLogoSvg /> },
  { name: "Talkit", logo: <TalkitLogo /> },
];

export default async function CompaniesSection({
  label,
  companies = defaultCompanies,
}: CompaniesSectionProps) {
  const t = await getTranslations("landing");
  const resolvedLabel = label ?? t("companiesMarquee.defaultLabel");

  // Repeat 4 times so 50% marquee shift is seamless even on ultra-wide screens
  const marqueeCompanies = [
    ...companies,
    ...companies,
    ...companies,
    ...companies,
  ];

  return (
    <section className="bg-white py-10 md:py-14 border-y border-[#D6DDEB] overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 flex flex-col items-start">
        {/* Section Label */}
        <p className="text-[14px] font-epilogue text-[#7C8493] font-normal mb-6">
          {resolvedLabel}
        </p>

        {/* Marquee with white background and 50% opacity logos */}
        <div className="w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="flex w-max items-center gap-14 sm:gap-20 lg:gap-28 animate-[featured-jobs-marquee_60s_linear_infinite] hover:[animation-play-state:paused] focus-within:[animation-play-state:paused] motion-reduce:animate-none">
            {marqueeCompanies.map((company, index) => {
              const isDuplicate = index >= companies.length;
              return (
                <div
                  key={`${company.name}-${index}`}
                  aria-hidden={isDuplicate}
                  className="flex items-center justify-center shrink-0 opacity-50 hover:opacity-100 transition-opacity duration-300"
                >
                  {company.logo}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
