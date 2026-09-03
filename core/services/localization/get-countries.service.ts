import { apiRequest } from "@/core/lib/api-client";
import type { Country } from "@/core/types/localization";
import type { PlatformReference } from "@/core/types/platform-reference";

export const getCountries = () =>
  apiRequest<PlatformReference[]>("references/country?limit=300").then(
    (response) =>
      response.data.map(
        (country): Country => ({ code: country.code, name: country.name }),
      ),
  );
