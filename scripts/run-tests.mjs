import { run } from "node:test";
import { spec } from "node:test/reporters";
import fs from "node:fs";
import path from "node:path";

function findTestFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory() && entry.name !== "node_modules" && entry.name !== ".next") {
      findTestFiles(fullPath, fileList);
    } else if (entry.isFile() && (entry.name.endsWith(".test.ts") || entry.name.endsWith(".test.js"))) {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

const testFiles = [
  ...findTestFiles(path.resolve(process.cwd(), "core")),
  ...findTestFiles(path.resolve(process.cwd(), "components")),
  ...findTestFiles(path.resolve(process.cwd(), "lib")),
];

console.log(`Found ${testFiles.length} test file(s):`);
testFiles.forEach((file) => console.log(`  - ${path.relative(process.cwd(), file)}`));

run({ files: testFiles })
  .on("test:fail", () => {
    process.exitCode = 1;
  })
  .compose(new spec())
  .pipe(process.stdout);
