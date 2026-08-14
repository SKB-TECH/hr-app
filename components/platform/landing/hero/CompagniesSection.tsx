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

export default function CompaniesSection({
  label = "Companies we helped grow",
  companies = defaultCompanies,
}: CompaniesSectionProps) {
  // Repeat 4 times so 50% marquee shift is seamless even on ultra-wide screens
  const marqueeCompanies = [
    ...companies,
    ...companies,
    ...companies,
    ...companies,
  ];

  return (
    <section className="px-4 py-10 lg:py-22 md:px-12 w-full max-w-7xl mx-auto overflow-hidden">
      <p className="text-[14px] font-epilogue text-neutral-60 font-normal mb-4">
        {label}
      </p>

      <div className="overflow-hidden w-full">
        <div className="flex w-max items-center gap-12 sm:gap-16 lg:gap-24 animate-[featured-jobs-marquee_70s_linear_infinite] hover:[animation-play-state:paused] focus-within:[animation-play-state:paused] motion-reduce:animate-none">
          {marqueeCompanies.map((company, index) => {
            const isDuplicate = index >= companies.length;
            return (
              <div
                key={`${company.name}-${index}`}
                aria-hidden={isDuplicate}
                className="flex items-center justify-center shrink-0"
              >
                {company.logo}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
