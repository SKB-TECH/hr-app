import { VodafoneLogo, IntelLogo, TeslaLogo, AmdLogoSvg, TalkitLogo } from "./icons";

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
  { name: "Intel",    logo: <IntelLogo /> },
  { name: "Tesla",    logo: <TeslaLogo /> },
  { name: "AMD",      logo: <AmdLogoSvg /> },
  { name: "Talkit",   logo: <TalkitLogo /> },
];

export default function CompaniesSection({
  label = "Companies we helped grow",
  companies = defaultCompanies,
}: CompaniesSectionProps) {
  return (
    <section className="bg-white py-10 px-6 sm:px-18">

      
      <p className="text-[13px] text-gray-300 font-normal mb-6">
        {label}
      </p>

      <div className="flex flex-wrap items-center justify-between gap-y-6">
        {companies.map((company) => (
          <div
            key={company.name}
            className="flex items-center justify-center opacity-40 grayscale hover:opacity-60 transition-opacity"
          >
            {company.logo}
          </div>
        ))}
      </div>

    </section>
  );
}