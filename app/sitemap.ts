import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://fast2hire.com";
  const locales = ["en", "fr"];
  const publicRoutes = ["", "/jobs", "/companies", "/about", "/sign-in", "/sign-up"];

  return publicRoutes.flatMap((route) =>
    locales.map((locale) => ({
      url: `${baseUrl}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: route === "" || route === "/jobs" ? "daily" : "weekly",
      priority: route === "" ? 1.0 : route === "/jobs" ? 0.9 : 0.7,
    }))
  );
}
