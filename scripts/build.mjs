// guide.yaml -> dist/ (web app + print page share one data file + one theme).
import { readFileSync, writeFileSync, mkdirSync, cpSync, existsSync } from 'node:fs';
import { parse } from 'yaml';
import { renderFloorplan } from './floorplan.mjs';
const guide = parse(readFileSync('content/guide.yaml', 'utf8'));
const ids = new Set();
for (const s of guide.sections) for (const st of s.steps) {
  if (ids.has(st.id)) throw new Error(`duplicate step id: ${st.id}`);
  ids.add(st.id);
  if (st.photo && !existsSync('assets/' + st.photo)) console.warn(`! missing photo for ${st.id}: assets/${st.photo}`);
}
mkdirSync('dist', { recursive: true });
const svg = renderFloorplan(parse(readFileSync('content/floorplan.yaml', 'utf8')), parse(readFileSync('content/photos.yaml', 'utf8')));
mkdirSync('assets/floorplan', { recursive: true });
writeFileSync('assets/floorplan/floorplan.svg', svg);
writeFileSync('dist/guide.js', 'window.GUIDE = ' + JSON.stringify(guide, null, 2) + ';\n');
cpSync('src/shared.js', 'dist/shared.js');
cpSync('src/web/index.html', 'dist/index.html');
cpSync('src/web/app.js', 'dist/app.js');
cpSync('src/print/print.html', 'dist/print.html');
cpSync('theme', 'dist/theme', { recursive: true });
cpSync('assets', 'dist/assets', { recursive: true, filter: p => !p.includes('/photos/raw') });
console.log(`built ${ids.size} steps across ${guide.sections.length} sections -> dist/`);
