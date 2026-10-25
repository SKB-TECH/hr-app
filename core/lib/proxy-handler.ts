import { NextRequest, NextResponse } from "next/server";
import { ENV } from "@/core/constants/env";

export type ProxyCtx = {
  params?: Promise<{ path?: string[] }>;
};

/**
 * Resolves path segments either from Route Handler dynamic params
 * or by parsing req.nextUrl.pathname for explicit routes.
 */
export async function resolvePath(
  req: NextRequest,
  ctx?: ProxyCtx
): Promise<string[]> {
  if (ctx?.params) {
    try {
      const resolved = await ctx.params;
      if (
        resolved?.path &&
        Array.isArray(resolved.path) &&
        resolved.path.length > 0
      ) {
        return resolved.path;
      }
    } catch {
      // Fall through to pathname extraction
    }
  }

  // Fallback: extract path segments from req.nextUrl.pathname
  const pathname = req.nextUrl.pathname;
  const segments = pathname.split("/").filter(Boolean);

  // Strip prefix segments: "/api/v1/..." or "/api/proxy/..."
  if (segments[0] === "api") segments.shift();
  if (segments[0] === "proxy" || (segments[0] && /^v\d+$/i.test(segments[0]))) {
    segments.shift();
  }

  return segments;
}

export function buildUpstreamUrl(
  path: string[] | undefined,
  search: string
): string {
  const configuredBase = (ENV.API_BASE_URL || ENV.API_URL || "").replace(
    /\/+$/,
    ""
  );
  const base = /\/api\/v\d+$/i.test(configuredBase)
    ? configuredBase
    : `${configuredBase}/api/v1`;

  const cleanPath = path ? [...path] : [];
  if (cleanPath[0] === "api") cleanPath.shift();
  if (cleanPath[0] && /^v\d+$/i.test(cleanPath[0])) cleanPath.shift();
  if (cleanPath[0] === "proxy") cleanPath.shift();

  const pathString = cleanPath.join("/");
  if (!pathString) {
    return `${base}${search || ""}`;
  }
  return `${base}/${pathString}${search || ""}`;
}

export function buildHeaders(req: NextRequest): Headers {
  const headers = new Headers();

  const forward = [
    "accept",
    "content-type",
    "authorization",
    "cookie",
    "origin",
    "referer",
    "x-client-type",
    "idempotency-key",
    "x-request-id",
  ] as const;

  forward.forEach((key) => {
    const val = req.headers.get(key);
    if (val) headers.set(key, val);
  });

  const token =
    req.cookies.get("access_token")?.value ||
    req.cookies.get("accessToken")?.value ||
    req.cookies.get("token")?.value;

  if (token && !headers.has("authorization")) {
    headers.set("authorization", `Bearer ${token}`);
  }

  if (ENV.API_KEY) headers.set("x-api-key", ENV.API_KEY);
  if (ENV.API_CHANNEL) headers.set("x-api-channel", ENV.API_CHANNEL);
  if (!headers.has("x-client-type")) headers.set("x-client-type", "web");

  return headers;
}

export function getResponseStatus(
  upstream: Response,
  body: ArrayBuffer
): number {
  const contentType = upstream.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) return upstream.status;

  try {
    const text = new TextDecoder().decode(body);
    const payload = JSON.parse(text) as {
      status?: unknown;
      code?: unknown;
      statusCode?: unknown;
    };
    const code = Number(payload?.code);
    const status = Number(payload?.status);
    const statusCode = Number(payload?.statusCode);

    if (Number.isInteger(code) && code >= 400 && code <= 599) return code;
    if (Number.isInteger(status) && status >= 400 && status <= 599) return status;
    if (Number.isInteger(statusCode) && statusCode >= 400 && statusCode <= 599) {
      return statusCode;
    }
  } catch {
    return upstream.status;
  }

  return upstream.status;
}

export async function proxy(
  method: string,
  req: NextRequest,
  ctx?: ProxyCtx
): Promise<NextResponse> {
  const path = await resolvePath(req, ctx);
  const url = buildUpstreamUrl(path, req.nextUrl.search);
  const headers = buildHeaders(req);
  const init: RequestInit = { method, headers };

  if (method !== "GET" && method !== "HEAD") {
    const body = await req.arrayBuffer();
    if (body.byteLength > 0) {
      init.body = body;
    }
  }

  try {
    const upstream = await fetch(url, { ...init, redirect: "manual" });
    const body = await upstream.arrayBuffer();

    const pathString = path.join("/");
    const normalizedPath = pathString.toLowerCase();
    const isCallbackPath =
      normalizedPath.endsWith("auth/google/callback") ||
      normalizedPath === "auth/google/callback";

    const isGoogleSuccess =
      isCallbackPath &&
      (upstream.ok || (upstream.status >= 300 && upstream.status < 400));

    const status = isGoogleSuccess ? 302 : getResponseStatus(upstream, body);

    const res = new NextResponse(isGoogleSuccess ? null : body, {
      status,
      headers: { "cache-control": "no-store" },
    });

    const contentType = upstream.headers.get("content-type");
    if (contentType) res.headers.set("content-type", contentType);

    // Determine target dashboard based on OAuth state parameter
    const googleProfile = req.nextUrl.searchParams.get("state")?.toUpperCase();
    const targetPortal =
      googleProfile === "COMPANY" ? "/company" : "/candidate";

    const localeCookie = req.cookies.get("NEXT_LOCALE")?.value;
    const referer = req.headers.get("referer") || "";
    const isFr =
      localeCookie === "fr" ||
      referer.includes("/fr/") ||
      referer.endsWith("/fr");
    const defaultRedirect = isFr ? `/fr${targetPortal}` : targetPortal;

    let location = isGoogleSuccess
      ? new URL(defaultRedirect, req.url).toString()
      : upstream.headers.get("location");

    if (upstream.headers.get("location") && isGoogleSuccess) {
      const upstreamLoc = upstream.headers.get("location")!;
      try {
        const parsed = new URL(upstreamLoc, req.url);
        if (
          parsed.pathname.includes("company") ||
          parsed.pathname.includes("candidate")
        ) {
          location = parsed.toString();
        }
      } catch {
        // Fall back to defaultRedirect
      }
    }

    if (location) res.headers.set("location", location);

    // Sanitize and forward upstream cookies
    const responseHeaders = upstream.headers as Headers & {
      getSetCookie?: () => string[];
    };
    const cookies =
      responseHeaders.getSetCookie?.() ??
      (upstream.headers.get("set-cookie")
        ? [upstream.headers.get("set-cookie")!]
        : []);

    cookies.forEach((cookie) => {
      // 1. Strip Domain so cookie is host-scoped to local development or custom domain
      let rewritten = cookie.replace(/;\s*Domain=[^;]+/gi, "");
      // 2. Rewrite Path from /api/v1/auth/refresh to root Path=/ so both /api/proxy and /api/v1 receive it
      rewritten = rewritten.replace(
        /Path=\/api\/v1\/auth\/refresh/gi,
        "Path=/"
      );
      // 3. Rewrite any general Path=/api/v1 or Path=/api/proxy to root Path=/
      rewritten = rewritten.replace(/Path=\/api\/v1(?=[;\s]|$)/gi, "Path=/");
      rewritten = rewritten.replace(/Path=\/api\/proxy(?=[;\s]|$)/gi, "Path=/");
      // 4. Ensure Path=/ is explicitly set if missing
      if (!/;\s*Path=/i.test(rewritten)) {
        rewritten += "; Path=/";
      }
      // 5. If running on plain HTTP (e.g. local dev), strip Secure flag so browser saves the cookie
      if (req.nextUrl.protocol === "http:") {
        rewritten = rewritten.replace(/;\s*Secure/gi, "");
      }
      res.headers.append("set-cookie", rewritten);
    });

    // Extract tokens from JSON payload if returned directly in body
    if (isCallbackPath && body.byteLength > 0) {
      try {
        const text = new TextDecoder().decode(body);
        if (text) {
          const json = JSON.parse(text);
          const data =
            json && typeof json === "object" && "data" in json && json.data
              ? json.data
              : json;
          const accessToken =
            data?.accessToken || data?.access_token || data?.token;
          const refreshToken = data?.refreshToken || data?.refresh_token;

          const isHttp = req.nextUrl.protocol === "http:";
          const secureFlag = isHttp ? "" : "; Secure";

          if (accessToken && !cookies.some((c) => /access_token=/i.test(c))) {
            res.headers.append(
              "set-cookie",
              `access_token=${accessToken}; Path=/; HttpOnly; SameSite=Lax${secureFlag}`
            );
          }
          if (refreshToken && !cookies.some((c) => /refresh_token=/i.test(c))) {
            res.headers.append(
              "set-cookie",
              `refresh_token=${refreshToken}; Path=/; HttpOnly; SameSite=Lax${secureFlag}`
            );
          }
        }
      } catch {
        // Non-JSON response, ignore
      }
    }

    return res;
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : String(e);
    const cause =
      e instanceof Error && e.cause instanceof Error
        ? e.cause.message
        : e instanceof Error && e.cause != null
          ? String(e.cause)
          : undefined;
    return NextResponse.json(
      {
        message: "Proxy fetch failed",
        upstreamUrl: url,
        error: message,
        ...(cause ? { cause } : {}),
      },
      { status: 502 }
    );
  }
}

export async function handleGET(req: NextRequest, ctx?: ProxyCtx) {
  return proxy("GET", req, ctx);
}
export async function handlePOST(req: NextRequest, ctx?: ProxyCtx) {
  return proxy("POST", req, ctx);
}
export async function handlePUT(req: NextRequest, ctx?: ProxyCtx) {
  return proxy("PUT", req, ctx);
}
export async function handlePATCH(req: NextRequest, ctx?: ProxyCtx) {
  return proxy("PATCH", req, ctx);
}
export async function handleDELETE(req: NextRequest, ctx?: ProxyCtx) {
  return proxy("DELETE", req, ctx);
}
export async function handleOPTIONS() {
  return new NextResponse(null, { status: 204 });
}
