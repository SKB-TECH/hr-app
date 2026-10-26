import { describe, it } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import robots from "../../app/robots";
import sitemap from "../../app/sitemap";

describe("SEO & Crawler Compliance", () => {
  it("robots.ts allows root crawling and disallows internal dashboards & API", () => {
    const robotsConfig = robots();
    assert.ok(robotsConfig.rules, "robots should have rules defined");
    
    const rules = Array.isArray(robotsConfig.rules)
      ? robotsConfig.rules[0]
      : robotsConfig.rules;

    assert.equal(rules.allow, "/", "Root path must be crawlable");
    assert.ok(Array.isArray(rules.disallow), "Disallowed routes should be an array");
    assert.ok(rules.disallow?.includes("/api/"), "API routes must be disallowed");
    assert.ok(rules.disallow?.includes("/candidate/"), "Candidate dashboard must be disallowed");
    assert.ok(rules.disallow?.includes("/company/"), "Company dashboard must be disallowed");
    assert.equal(robotsConfig.sitemap, "https://fast2hire.com/sitemap.xml");
  });

  it("sitemap.ts generates localized entries for all public landing routes", () => {
    const sitemapEntries = sitemap();
    assert.ok(Array.isArray(sitemapEntries), "Sitemap must return an array of entries");
    assert.ok(sitemapEntries.length >= 8, "Sitemap should cover multi-locale routes");

    const urls = sitemapEntries.map((e) => e.url);
    assert.ok(urls.some((u) => u.includes("/en")), "English root must exist in sitemap");
    assert.ok(urls.some((u) => u.includes("/fr")), "French root must exist in sitemap");
    assert.ok(urls.some((u) => u.includes("/jobs")), "Jobs page must exist in sitemap");
    assert.ok(urls.some((u) => u.includes("/companies")), "Companies page must exist in sitemap");
  });

  it("required local static brand & landing imagery exists on disk", () => {
    const publicDir = path.resolve(process.cwd(), "public");
    const requiredAssets = [
      "background.png",
      "images/hero2.png",
      "images/image.png",
      "images/image1.png",
      "images/image2.png",
      "images/image3.png",
      "images/image4.png",
      "images/image5.png",
      "images/landingImg.png",
      "logo/logow.png",
      "logo/dashboard-preview.png",
      "logo/favicon.jpeg",
    ];

    for (const asset of requiredAssets) {
      const fullPath = path.join(publicDir, asset);
      assert.ok(
        fs.existsSync(fullPath),
        `Asset ${asset} must exist in public/ directory`
      );
      const stats = fs.statSync(fullPath);
      assert.ok(stats.size > 0, `Asset ${asset} must not be empty`);
    }
  });
});
