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
    <section className="bg-[#132745] py-10 md:py-14 border-y border-white/10 overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-4 md:px-12 flex flex-col items-center">
        {/* Subtle Section Label matching Exuta "Our Featured Partner" */}
        <p className="text-xs uppercase tracking-[0.2em] font-semibold text-white/60 mb-6 text-center">
          {resolvedLabel}
        </p>

        {/* Marquee with smooth hover pause */}
        <div className="w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="flex w-max items-center gap-14 sm:gap-20 lg:gap-28 animate-[featured-jobs-marquee_60s_linear_infinite] hover:[animation-play-state:paused] focus-within:[animation-play-state:paused] motion-reduce:animate-none">
            {marqueeCompanies.map((company, index) => {
              const isDuplicate = index >= companies.length;
              return (
                <div
                  key={`${company.name}-${index}`}
                  aria-hidden={isDuplicate}
                  className="flex items-center justify-center shrink-0 opacity-60 hover:opacity-100 transition-opacity duration-300 filter brightness-200 contrast-125"
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
