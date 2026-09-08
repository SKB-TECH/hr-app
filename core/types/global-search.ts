export type GlobalSearchResults = {
  jobs: Array<{ id: string; title: string; location: string | null; companyName: string; companyLogo: string | null }>;
  companies: Array<{ id: string; name: string; industry: string | null; location: string | null; logo: string | null }>;
  candidates: Array<{ id: string; fullName: string; avatar: string | null; headline: string | null; cityName: string | null; countryName: string | null; profession: string | null }>;
};
