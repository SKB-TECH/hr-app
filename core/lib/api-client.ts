import { ENV } from "@/core/constants/env";
import { ApiError, type ApiEnvelope } from "@/core/types/api";

let refreshPromise: Promise<boolean> | null = null;

function url(path: string) {
  return `${ENV.API_URL.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
}

async function parseResponse<T>(response: Response): Promise<ApiEnvelope<T>> {
  const payload = await response.json().catch(() => null);
  if (!response.ok) {
    throw new ApiError(
      payload?.message || "Une erreur est survenue.",
      response.status,
      payload?.error,
      payload,
    );
  }
  return payload as ApiEnvelope<T>;
}

async function refreshSession() {
  if (!refreshPromise) {
    refreshPromise = fetch(url("auth/refresh"), {
      method: "POST",
      credentials: "include",
      headers: { "x-client-type": "web" },
    })
      .then((response) => response.ok)
      .finally(() => {
        refreshPromise = null;
      });
  }
  return refreshPromise;
}

export async function apiRequest<T>(
  path: string,
  init: RequestInit = {},
  retry = true,
): Promise<ApiEnvelope<T>> {
  const headers = new Headers(init.headers);
  headers.set("Accept", "application/json");
  headers.set("x-client-type", "web");
  if (init.body && !(init.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }
  const response = await fetch(url(path), {
    ...init,
    headers,
    credentials: "include",
    cache: "no-store",
  });
  if (response.status === 401 && retry && path !== "auth/refresh") {
    if (await refreshSession()) return apiRequest<T>(path, init, false);
  }
  return parseResponse<T>(response);
}

export function toQueryString(values: Record<string, unknown>) {
  const query = new URLSearchParams();
  Object.entries(values).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") query.set(key, String(value));
  });
  const result = query.toString();
  return result ? `?${result}` : "";
}
