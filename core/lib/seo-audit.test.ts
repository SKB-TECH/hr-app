import { describe, it } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import robots from "../../app/robots";
import sitemap from "../../app/sitemap";
import {
  FALLBACK_COMPANY_JOBS,
  normalizeCompanyJob,
  sanitizeAndDeduplicateJobs,
} from "../services/jobs/normalize-company-job";
import { filterJobsList } from "../services/jobs/get-jobs.service";

describe("SEO & Crawler Compliance", () => {
  it("robots.ts allows root crawling and disallows internal dashboards & API", () => {
    const robotsConfig = robots();
    assert.ok(robotsConfig.rules, "robots should have rules defined");

    const rules = Array.isArray(robotsConfig.rules)
      ? robotsConfig.rules[0]
      : robotsConfig.rules;

    assert.equal(rules.allow, "/", "Root path must be crawlable");
    assert.ok(
      Array.isArray(rules.disallow),
      "Disallowed routes should be an array"
    );
    assert.ok(
      rules.disallow?.includes("/api/"),
      "API routes must be disallowed"
    );
    assert.ok(
      rules.disallow?.includes("/candidate/"),
      "Candidate dashboard must be disallowed"
    );
    assert.ok(
      rules.disallow?.includes("/company/"),
      "Company dashboard must be disallowed"
    );
    assert.equal(robotsConfig.sitemap, "https://fast2hire.com/sitemap.xml");
  });

  it("sitemap.ts generates localized entries for all public landing and policy routes", () => {
    const sitemapEntries = sitemap();
    assert.ok(
      Array.isArray(sitemapEntries),
      "Sitemap must return an array of entries"
    );
    assert.ok(
      sitemapEntries.length >= 16,
      "Sitemap should cover multi-locale routes including policy pages"
    );

    const urls = sitemapEntries.map((e) => e.url);
    assert.ok(
      urls.some((u) => u.includes("/en")),
      "English root must exist in sitemap"
    );
    assert.ok(
      urls.some((u) => u.includes("/fr")),
      "French root must exist in sitemap"
    );
    assert.ok(
      urls.some((u) => u.includes("/jobs")),
      "Jobs page must exist in sitemap"
    );
    assert.ok(
      urls.some((u) => u.includes("/companies")),
      "Companies page must exist in sitemap"
    );
    assert.ok(
      urls.some((u) => u.includes("/privacy")),
      "Privacy route must exist in sitemap"
    );
    assert.ok(
      urls.some((u) => u.includes("/terms")),
      "Terms route must exist in sitemap"
    );
    assert.ok(
      urls.some((u) => u.includes("/gdpr")),
      "GDPR route must exist in sitemap"
    );
    assert.ok(
      urls.some((u) => u.includes("/cookies")),
      "Cookies route must exist in sitemap"
    );
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

describe("Job Data Sanitization, Deduplication & Filtering", () => {
  it("removes duplicate Senior Full-Stack Developer (Infinity Company) entries and fixes Designer UX/UI (Copy)", () => {
    const rawItems = [
      normalizeCompanyJob({
        id: "dup-1",
        title: "Senior Full-Stack Developer",
        companyName: "Infinity Company",
        location: "Remote",
        category: "HUMAN_RESOURCE",
        description: "Full-stack engineering role",
      }),
      normalizeCompanyJob({
        id: "dup-2",
        title: "Senior Full-Stack Developer",
        companyName: "Infinity Company",
        location: "Remote",
        category: "Engineering",
        description: "Duplicate full-stack engineering role",
      }),
      normalizeCompanyJob({
        id: "ux-copy",
        title: "Designer UX/UI (Copy)",
        companyName: "Infinity Company",
        location: "Paris, France",
        category: "HUMAN_RESOURCE",
        description: "Develop backend microservices in Java and Spring Boot",
      }),
      normalizeCompanyJob({
        id: "ux-main",
        title: "Designer UX/UI",
        companyName: "PixelForge Studio",
        location: "Paris, France",
        category: "HUMAN_RESOURCE",
        description: "Manage HR payroll and developer backend services",
      }),
    ];

    const cleaned = sanitizeAndDeduplicateJobs(rawItems);
    const fullStackMatches = cleaned.filter(
      (j) =>
        j.title === "Senior Full-Stack Developer" &&
        j.companyName === "Infinity Company"
    );
    assert.equal(
      fullStackMatches.length,
      1,
      "Should deduplicate Senior Full-Stack Developer at Infinity Company"
    );
    assert.equal(fullStackMatches[0].category, "Engineering");

    const uxCopyJob = cleaned.find((j) => j.id === "ux-copy");
    assert.ok(uxCopyJob, "UX/UI copy job should be normalized, not lost");
    assert.equal(uxCopyJob.title, "Senior Product Designer (UX/UI)");
    assert.equal(uxCopyJob.category, "Design");
    assert.ok(
      uxCopyJob.description?.includes("interaction design") ||
        uxCopyJob.description?.includes("UX/UI"),
      "Description should match realistic UX/UI responsibilities"
    );

    const uxMainJob = cleaned.find((j) => j.id === "ux-main");
    assert.ok(uxMainJob);
    assert.equal(uxMainJob.category, "Design");

    const ids = new Set(cleaned.map((j) => j.id));
    assert.equal(ids.size, cleaned.length, "All job IDs must be unique");
  });

  it("filters jobs by keyword, location, and category", () => {
    const designJobs = filterJobsList(FALLBACK_COMPANY_JOBS, {
      category: "Design",
    });
    assert.ok(designJobs.length >= 2);
    assert.ok(designJobs.every((j) => j.category === "Design"));

    const searchJobs = filterJobsList(FALLBACK_COMPANY_JOBS, {
      search: "Full-Stack",
      location: "Remote",
    });
    assert.equal(searchJobs.length, 1);
    assert.equal(searchJobs[0].title, "Senior Full-Stack Developer");
  });
});
