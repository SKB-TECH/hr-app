import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { humanizeEmploymentType } from "./format";

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
