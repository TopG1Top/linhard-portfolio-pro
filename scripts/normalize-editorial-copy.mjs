// Mechanical punctuation cleanup of the website's authored, visible copy.
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

function walk(directory) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const file = join(directory, entry.name);
    if (entry.isDirectory()) { walk(file); continue; }
    if (!/\.(tsx|ts)$/.test(file) || file.endsWith("typography.ts") || file.endsWith(join("game", "page.tsx"))) continue;
    const source = readFileSync(file, "utf8");
    const updated = source
      .replace(/(\d+\.\d+)[\u2012-\u2015](\d+\.\d+)/g, "$1 bis $2")
      .replace(/(202\d)\s*[\u2012-\u2015]\s*heute/g, "$1 bis heute")
      .replace(/(\d+)[\u2012-\u2015](\d+)/g, "$1 / $2")
      .replace(/\s+[\u2012-\u2015]\s+(?=und\b)/g, " ")
      .replace(/\s+[\u2012-\u2015]\s+/g, ", ")
      .replace(/[\u2012-\u2015]/g, " / ");
    if (source !== updated) { writeFileSync(file, updated); console.log(file); }
  }
}
for (const directory of ["app", "components", "lib"]) walk(directory);
