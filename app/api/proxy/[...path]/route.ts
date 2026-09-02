import { NextRequest, NextResponse } from 'next/server';
import {ENV} from "@/core/constants/env";


export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

type ProxyCtx = {
    params: Promise<{ path: string[] }>;
};

function buildUpstreamUrl(path: string[] | undefined, search: string): string {
    const configuredBase = ENV.API_BASE_URL.replace(/\/+$/, '');
    const base = /\/api\/v\d+$/i.test(configuredBase)
        ? configuredBase
        : `${configuredBase}/api/v1`;
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
        'x-client-type',
        'idempotency-key',
        'x-request-id',
    ] as const;

    forward.forEach((key) => {
        const val = req.headers.get(key);
        if (val) headers.set(key, val);
    });

    const token = req.cookies.get('access_token')?.value;

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
        const upstream = await fetch(url, { ...init, redirect: 'manual' });
        const body = await upstream.arrayBuffer();
        const isGoogleCallback = path.join('/') === 'auth/google/callback' && upstream.ok;
        const res = new NextResponse(isGoogleCallback ? null : body, {
            status: isGoogleCallback ? 302 : getResponseStatus(upstream, body),
            headers: { 'cache-control': 'no-store' },
        });
        const contentType = upstream.headers.get('content-type');
        if (contentType) res.headers.set('content-type', contentType);
        const googleProfile = req.nextUrl.searchParams.get('state');
        const location = isGoogleCallback
            ? new URL(googleProfile === 'COMPANY' ? '/fr/company' : '/fr/candidate', req.url).toString()
            : upstream.headers.get('location');
        if (location) res.headers.set('location', location);
        const responseHeaders = upstream.headers as Headers & { getSetCookie?: () => string[] };
        const cookies = responseHeaders.getSetCookie?.() ?? (upstream.headers.get('set-cookie') ? [upstream.headers.get('set-cookie')!] : []);
        cookies.forEach((cookie) => {
            const rewritten = cookie.replace(/Path=\/api\/v1\/auth\/refresh/gi, 'Path=/api/proxy/auth/refresh');
            res.headers.append('set-cookie', rewritten);
        });
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
export async function PATCH(req: NextRequest, ctx: ProxyCtx) {
    return proxy('PATCH', req, ctx);
}
export async function DELETE(req: NextRequest, ctx: ProxyCtx) {
    return proxy('DELETE', req, ctx);
}
export async function OPTIONS() {
    return new NextResponse(null, { status: 204 });
}
