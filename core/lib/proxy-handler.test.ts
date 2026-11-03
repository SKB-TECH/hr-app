import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { NextRequest } from "next/server";
import { proxy } from "./proxy-handler";

describe("OAuth callback proxy redirects", () => {
  it("uses the public forwarded origin when the internal request URL is localhost", async () => {
    const originalFetch = globalThis.fetch;
    globalThis.fetch = async () =>
      new Response(null, {
        status: 302,
        headers: {
          location: "https://localhost:3000/sign-in?error=oauth_callback_failed",
        },
      });

    try {
      const request = new NextRequest(
        "https://localhost:3000/api/proxy/auth/google/callback?state=invalid",
        {
          headers: {
            host: "localhost:3000",
            "x-forwarded-host": "fast2hire.com",
            "x-forwarded-proto": "https",
          },
        },
      );

      const response = await proxy("GET", request);

      assert.equal(response.status, 302);
      assert.equal(
        response.headers.get("location"),
        "https://fast2hire.com/sign-in?error=oauth_callback_failed",
      );
    } finally {
      globalThis.fetch = originalFetch;
    }
  });
});
