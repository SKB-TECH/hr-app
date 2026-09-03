"use client";

import { useCountries } from "@/core/hooks/localization/use-countries";
import { useCities } from "@/core/hooks/localization/use-cities";

interface CountryCitySelectProps {
  countryValue: string;
  cityValue: string;
  onCountryChange: (name: string) => void;
  onCityChange: (name: string) => void;
  countryLabel?: string;
  cityLabel?: string;
  countryInputId?: string;
  cityInputId?: string;
}

export default function CountryCitySelect({
  countryValue,
  cityValue,
  onCountryChange,
  onCityChange,
  countryLabel = "Country",
  cityLabel = "City",
  countryInputId = "country-select",
  cityInputId = "city-select",
}: CountryCitySelectProps) {
  const { data: countries = [], isLoading: isLoadingCountries } = useCountries();
  const selectedCountry = countries.find((country) => country.name === countryValue);
  const { data: cities = [], isLoading: isLoadingCities } = useCities(selectedCountry?.code);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div>
        <label htmlFor={countryInputId} className="mb-2 block text-sm font-medium text-[#25324B]">
          {countryLabel}
        </label>
        <select
          id={countryInputId}
          className="w-full cursor-pointer rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-brand"
          value={countryValue}
          onChange={(event) => {
            onCountryChange(event.target.value);
            onCityChange("");
          }}
        >
          <option value="">{isLoadingCountries ? "Loading countries..." : "Select a country"}</option>
          {countries.map((country) => (
            <option key={country.code} value={country.name}>
              {country.name}
            </option>
          ))}
          {countryValue && !selectedCountry && <option value={countryValue}>{countryValue}</option>}
        </select>
      </div>

      <div>
        <label htmlFor={cityInputId} className="mb-2 block text-sm font-medium text-[#25324B]">
          {cityLabel}
        </label>
        <select
          id={cityInputId}
          disabled={!selectedCountry}
          className="w-full cursor-pointer rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-brand disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400"
          value={cityValue}
          onChange={(event) => onCityChange(event.target.value)}
        >
          <option value="">
            {!selectedCountry ? "Select a country first" : isLoadingCities ? "Loading cities..." : "Select a city"}
          </option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
          {cityValue && !cities.includes(cityValue) && <option value={cityValue}>{cityValue}</option>}
        </select>
      </div>
    </div>
  );
}
