"use client";

import { useState } from "react";
import LocationDropdown from "./LocationDropdown";

const locations = [
  "Select Location",
  "Remote",
  "Kigali",
  "Nairobi",
  "Lagos",
  "Cape Town",
];

export default function SearchFilters() {
  const [selectedLocation, setSelectedLocation] = useState(locations[0]);

  return (
    <>
      <LocationDropdown
        selectedLocation={selectedLocation}
        locations={locations}
        onLocationChange={setSelectedLocation}
      />

      <button className="w-full bg-brand hover:bg-indigo-800 cursor-pointer px-5 py-2 text-white transition hover:bg-brand-dark md:w-auto">
        Search
      </button>
    </>
  );
}
