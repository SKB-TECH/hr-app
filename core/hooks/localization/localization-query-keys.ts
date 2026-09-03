export const localizationKeys = {
  countries: ["localization", "countries"] as const,
  cities: (countryCode: string) => ["localization", "countries", countryCode, "cities"] as const,
};
