import CardWrapper from "./CardWrapper";
import Image from "next/image";

import { countryVisitorsData } from "@/data/company-job-listing";

export default function VisitorsByCountryStats() {
  return (
    <CardWrapper>
      <h2 className=" mb-6 text-2xl font-semibold text-[#25324B]">
        Visitors by country
      </h2>

      <div className="max-h-[230px] space-y-5 overflow-y-auto country-visitors-scroll pr-2">
        {countryVisitorsData.map((country) => (
          <div key={country.id} className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-neutral-100">
              <Image
                src={`https://flagcdn.com/w40/${country.flag}.png`}
                alt={country.name}
                width={32}
                height={24}
                className="object-cover"
              />

              <span className="text-md ">{country.name}</span>
            </div>

            <span className="text-md ">
              {country.visitors.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </CardWrapper>
  );
}
