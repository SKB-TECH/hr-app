// components/CompaniesSection.tsx

import Image from "next/image";
import { VodafoneLogo , IntelLogo , TeslaLogo , AmdLogoSvg , TalkitLogo } from "./icons";


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
    <section className="bg-white  py-10">
      <div className="px-6 sm:px-18">
  {/* Label */}
      <p className="text-[14px] text-[#C8C8C8] font-normal mb-8 tracking-normal">
        {label}
      </p>

      {/* Logos row */}
      <div className="flex items-center justify-between">
        {companies.map((company) => (
          <div
            key={company.name}
            className="flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity cursor-pointer"
          >
            {company.logo}
          </div>
        ))}
      </div>

      </div>
    
    </section>
  );
}