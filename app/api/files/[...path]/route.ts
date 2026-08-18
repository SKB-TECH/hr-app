import { ENV } from "@/core/constants/env";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path } = await params;
  const configuredFilesBase = ENV.FILES_BASE_URL?.replace(/\/$/, "");
  const apiOrigin = ENV.API_BASE_URL.replace(/\/api\/v\d+\/?$/i, "").replace(/\/$/, "");
  const base = configuredFilesBase || `${apiOrigin}/files`;
  const upstream = await fetch(`${base}/${path.map(encodeURIComponent).join("/")}`, { cache: "no-store" });

  if (!upstream.ok) return Response.json({ message: "Image not found" }, { status: upstream.status });

  const headers = new Headers();
  headers.set("content-type", upstream.headers.get("content-type") || "application/octet-stream");
  headers.set("cache-control", upstream.headers.get("cache-control") || "public, max-age=3600");
  return new Response(upstream.body, { status: 200, headers });
}
