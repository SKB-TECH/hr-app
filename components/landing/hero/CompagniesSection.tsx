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
  return (
    <section className=" w-full max-w-6xl mx-auto ">
      <p className="text-[13px] text-gray-300 font-normal mb-6">{label}</p>

      <div className="flex flex-wrap items-center justify-between gap-y-6">
        {companies.map((company) => (
          <div
            key={company.name}
            className="flex items-center justify-center  "
          >
            {company.logo}
          </div>
        ))}
      </div>
    </section>
  );
}
