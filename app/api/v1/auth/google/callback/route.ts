import {
  handleGET,
  handlePOST,
  handleOPTIONS,
} from "@/core/lib/proxy-handler";
import type { NextRequest } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  return handleGET(req);
}

export async function POST(req: NextRequest) {
  return handlePOST(req);
}

export async function OPTIONS() {
  return handleOPTIONS();
}
