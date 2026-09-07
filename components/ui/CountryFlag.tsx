"use client";

import ReactCountryFlag from "react-country-flag";
import { useCountries } from "@/core/hooks/localization/use-countries";

export default function CountryFlag({ countryName, className = "text-xl" }: { countryName?: string | null; className?: string }) {
  const { data: countries = [] } = useCountries();
  if (!countryName) return null;

  const country = countries.find(
    (item) => item.name.localeCompare(countryName, undefined, { sensitivity: "base" }) === 0,
  );

  if (!country?.code) return null;
  return <ReactCountryFlag countryCode={country.code} svg className={className} aria-label={country.name} />;
}
