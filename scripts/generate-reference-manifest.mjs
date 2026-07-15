import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const refDir = path.resolve(__dirname, '../src/_reference_ui');
const outFile = path.join(refDir, 'manifest.ts');

function walk(dir) {
  let results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) results = results.concat(walk(full));
    else if (entry.name.endsWith('.tsx')) results.push(full);
  }
  return results;
}

const files = walk(refDir);
const groups = new Map();

for (const file of files) {
  const relative = path.relative(refDir, file).replace(/\\/g, '/');
  const [category] = relative.split('/');
  const name = relative
    .split('/')
    .pop()
    .replace(/\.tsx$/, '');
  if (!groups.has(category)) groups.set(category, []);
  groups.get(category).push({ name, path: relative });
}

const catalog = [...groups.entries()]
  .map(([category, items]) => ({
    category,
    items: items.sort((a, b) => a.name.localeCompare(b.name)),
  }))
  .sort((a, b) => a.category.localeCompare(b.category));

const header = `// File ini digenerate otomatis, jangan diedit manual.
// Regenerate: npm run generate:reference-manifest

export interface ReferenceUiItem {
  name: string;
  path: string;
}

export interface ReferenceUiGroup {
  category: string;
  items: ReferenceUiItem[];
}

export const referenceUiCatalog: ReferenceUiGroup[] = `;

fs.writeFileSync(outFile, header + JSON.stringify(catalog, null, 2) + ';\n', 'utf8');
console.log(
  `Generated ${outFile} with ${files.length} components across ${catalog.length} categories.`,
);
