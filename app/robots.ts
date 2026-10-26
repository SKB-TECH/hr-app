import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/",
        "/candidate/",
        "/company/",
        "/forgot-password",
      ],
    },
    sitemap: "https://fast2hire.com/sitemap.xml",
  };
}
