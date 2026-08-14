import { NextRequest, NextResponse } from 'next/server';
import {ENV} from "@/core/constants/env";


export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

type ProxyCtx = {
    params: Promise<{ path: string[] }>;
};

function buildUpstreamUrl(path: string[] | undefined, search: string): string {
    const base = ENV.API_BASE_URL.replace(/\/+$/, '');
    const pathString = path?.length ? path.join('/') : '';
    if (!pathString) {
        return `${base}${search || ''}`;
    }
    return `${base}/${pathString}${search || ''}`;
}

function buildHeaders(req: NextRequest): Headers {
    const headers = new Headers();

    const forward = [
        'accept',
        'content-type',
        'authorization',
        'cookie',
        'origin',
        'referer',
    ] as const;

    forward.forEach((key) => {
        const val = req.headers.get(key);
        if (val) headers.set(key, val);
    });

    const token =
        req.cookies.get('auth_token')?.value ||
        req.cookies.get('accessToken')?.value;

    if (token && !headers.has('authorization')) {
        headers.set('authorization', `Bearer ${token}`);
    }

    if (ENV.API_KEY) headers.set('x-api-key', ENV.API_KEY);
    if (ENV.API_CHANNEL) headers.set('x-api-channel', ENV.API_CHANNEL);

    return headers;
}

function getResponseStatus(upstream: Response, body: ArrayBuffer): number {
    const contentType = upstream.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) return upstream.status;

    try {
        const text = new TextDecoder().decode(body);
        const payload = JSON.parse(text) as { status?: unknown; code?: unknown };
        const code = Number(payload?.code);
        const status = Number(payload?.status);

        if (Number.isInteger(code) && code >= 400 && code <= 599) {
            return code;
        }

        if (Number.isInteger(status) && status >= 400 && status <= 599) {
            return status;
        }
    } catch {
        return upstream.status;
    }

    return upstream.status;
}

async function proxy(
    method: string,
    req: NextRequest,
    ctx: ProxyCtx
): Promise<NextResponse> {
    const { path } = await ctx.params;
    const url = buildUpstreamUrl(path, req.nextUrl.search);
    const headers = buildHeaders(req);
    const init: RequestInit = { method, headers };
    if (method !== 'GET' && method !== 'HEAD') {
        const body = await req.arrayBuffer();
        if (body.byteLength > 0) {
            init.body = body;
        }
    }
    try {
        const upstream = await fetch(url, init);
        const body = await upstream.arrayBuffer();
        const res = new NextResponse(body, {
            status: getResponseStatus(upstream, body),
            headers: { 'cache-control': 'no-store' },
        });
        const contentType = upstream.headers.get('content-type');
        if (contentType) res.headers.set('content-type', contentType);
        const setCookie = upstream.headers.get('set-cookie');
        if (setCookie) {
            setCookie
                .split(/,(?=\s*[^;]+?=)/)
                .forEach((c) => res.headers.append('set-cookie', c.trim()));
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
                message: 'Proxy fetch failed',
                upstreamUrl: url,
                error: message,
                ...(cause ? { cause } : {}),
            },
            { status: 502 }
        );
    }
}

export async function GET(req: NextRequest, ctx: ProxyCtx) {
    return proxy('GET', req, ctx);
}
export async function POST(req: NextRequest, ctx: ProxyCtx) {
    return proxy('POST', req, ctx);
}
export async function PUT(req: NextRequest, ctx: ProxyCtx) {
    return proxy('PUT', req, ctx);
}
export async function DELETE(req: NextRequest, ctx: ProxyCtx) {
    return proxy('DELETE', req, ctx);
}
export async function OPTIONS() {
    return new NextResponse(null, { status: 204 });
}
