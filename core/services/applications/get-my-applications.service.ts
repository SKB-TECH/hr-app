import { apiRequest, toQueryString } from "@/core/lib/api-client";
import type { PaginatedEnvelope } from "@/core/types/api";
import type { MyApplication, MyApplicationQuery } from "@/core/types/application";
import { normalizeMyApplication } from "./normalize-my-application";

export const getMyApplications = (query: MyApplicationQuery = {}) =>
  apiRequest<unknown[]>(`applications/my${toQueryString(query)}`).then(
    (response) =>
      ({
        ...response,
        data: response.data.map(normalizeMyApplication),
      }) as PaginatedEnvelope<MyApplication>,
  );
