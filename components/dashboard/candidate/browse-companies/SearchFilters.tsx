"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import LocationDropdown from "./LocationDropdown";

export default function SearchFilters() {
  const t = useTranslations("findJobs");
  const locations = [
    t("search.selectLocation"),
    t("search.remoteOption"),
    "Kigali",
    "Nairobi",
    "Lagos",
    "Cape Town",
  ];
  const [selectedLocation, setSelectedLocation] = useState(locations[0]);

  return (
    <>
      <LocationDropdown
        selectedLocation={selectedLocation}
        locations={locations}
        onLocationChange={setSelectedLocation}
      />

      <button className="w-full bg-brand hover:bg-indigo-800 cursor-pointer px-5 py-2 text-white transition hover:bg-brand-dark md:w-auto">
        {t("search.searchButton")}
      </button>
    </>
  );
}
