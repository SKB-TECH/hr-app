import {
  handleGET,
  handlePOST,
  handlePUT,
  handlePATCH,
  handleDELETE,
  handleOPTIONS,
  type ProxyCtx,
} from "@/core/lib/proxy-handler";
import type { NextRequest } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(req: NextRequest, ctx: ProxyCtx) {
  return handleGET(req, ctx);
}

export async function POST(req: NextRequest, ctx: ProxyCtx) {
  return handlePOST(req, ctx);
}

export async function PUT(req: NextRequest, ctx: ProxyCtx) {
  return handlePUT(req, ctx);
}

export async function PATCH(req: NextRequest, ctx: ProxyCtx) {
  return handlePATCH(req, ctx);
}

export async function DELETE(req: NextRequest, ctx: ProxyCtx) {
  return handleDELETE(req, ctx);
}

export async function OPTIONS() {
  return handleOPTIONS();
}
