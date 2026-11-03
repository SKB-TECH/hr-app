import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { humanizeEmploymentType, resolveJobCategory } from "./format";

describe("humanizeEmploymentType", () => {
  it("formats FULL_TIME to Full Time", () => {
    assert.equal(humanizeEmploymentType("FULL_TIME"), "Full Time");
  });

  it("formats PART_TIME to Part Time", () => {
    assert.equal(humanizeEmploymentType("PART_TIME"), "Part Time");
  });

  it("formats CONTRACT to Contract", () => {
    assert.equal(humanizeEmploymentType("CONTRACT"), "Contract");
  });
});

describe("resolveJobCategory", () => {
  it("corrects misassigned HUMAN_RESOURCE on developer roles to Engineering", () => {
    assert.equal(
      resolveJobCategory("HUMAN_RESOURCE", "Senior Full-Stack Developer"),
      "Engineering",
    );
  });

  it("corrects misassigned HUMAN_RESOURCE on UX/UI designer roles to Design", () => {
    assert.equal(
      resolveJobCategory("HUMAN_RESOURCE", "Designer UX/UI"),
      "Design",
    );
  });

  it("humanizes valid HUMAN_RESOURCE for HR roles to Human Resources", () => {
    assert.equal(
      resolveJobCategory("HUMAN_RESOURCE", "HR Talent Acquisition Partner"),
      "Human Resources",
    );
  });
});
