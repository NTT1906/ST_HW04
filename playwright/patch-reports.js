/**
 * patch-reports.js
 *
 * Post-processing script: patches every generated Playwright HTML report
 * to inject a visible "Run by: 23127255" banner + ISO timestamp.
 *
 * Run AFTER all playwright test executions complete.
 * Usage: node patch-reports.js
 *
 * Student ID: 23127255
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const STUDENT_ID = '23127255';
const TIMESTAMP = new Date().toISOString();

// Map: report folder → display label
const REPORTS = [
  { folder: path.resolve(__dirname, '../tests/FR01/reports/chromium'), label: 'FR-01 | Chromium' },
  { folder: path.resolve(__dirname, '../tests/FR01/reports/firefox'),  label: 'FR-01 | Firefox' },
  { folder: path.resolve(__dirname, '../tests/FR01/reports/webkit'),   label: 'FR-01 | WebKit' },
  { folder: path.resolve(__dirname, '../tests/FR11/reports/chromium'), label: 'FR-11 | Chromium' },
  { folder: path.resolve(__dirname, '../tests/FR11/reports/firefox'),  label: 'FR-11 | Firefox' },
  { folder: path.resolve(__dirname, '../tests/FR11/reports/webkit'),   label: 'FR-11 | WebKit' },
  { folder: path.resolve(__dirname, '../tests/FR14/reports/chromium'), label: 'FR-14 | Chromium' },
  { folder: path.resolve(__dirname, '../tests/FR14/reports/firefox'),  label: 'FR-14 | Firefox' },
  { folder: path.resolve(__dirname, '../tests/FR14/reports/webkit'),   label: 'FR-14 | WebKit' },
];

const BANNER_STYLE = `
<style id="student-id-style">
  #student-id-banner {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 99999;
    background: linear-gradient(90deg, #1a56db 0%, #1e40af 100%);
    color: #ffffff;
    font-family: 'Courier New', Courier, monospace;
    font-size: 13px;
    font-weight: bold;
    padding: 6px 20px;
    text-align: center;
    letter-spacing: 0.5px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.3);
  }
  body { margin-top: 38px !important; padding-top: 0 !important; }
</style>
`;

function makeBanner(label, ts) {
  return `<div id="student-id-banner">
  ✅ Run by: <span style="color:#fbbf24">${STUDENT_ID}</span>
  &nbsp;&nbsp;|&nbsp;&nbsp; ${label}
  &nbsp;&nbsp;|&nbsp;&nbsp; ${ts}
</div>`;
}

let patchedCount = 0;

for (const { folder, label } of REPORTS) {
  const htmlPath = path.join(folder, 'index.html');
  if (!fs.existsSync(htmlPath)) {
    console.warn(`⚠️  Not found (run may have failed): ${htmlPath}`);
    continue;
  }

  let html = fs.readFileSync(htmlPath, 'utf-8');

  // Skip if already patched
  if (html.includes('student-id-banner')) {
    console.log(`ℹ️  Already patched: ${htmlPath}`);
    patchedCount++;
    continue;
  }

  // Replace <title>
  html = html.replace(
    /<title>.*?<\/title>/s,
    `<title>Playwright Report — Run by: ${STUDENT_ID} | ${label} | ${TIMESTAMP}</title>`
  );

  // Inject style + banner right after <body>
  html = html.replace(
    /(<body[^>]*>)/,
    `$1\n${BANNER_STYLE}\n${makeBanner(label, TIMESTAMP)}`
  );

  // Also inject a comment at top of <head> for grep-ability
  html = html.replace(
    /(<head[^>]*>)/,
    `$1\n<!-- RUN-BY: ${STUDENT_ID} | ${label} | ${TIMESTAMP} -->`
  );

  fs.writeFileSync(htmlPath, html, 'utf-8');
  console.log(`✅ Patched: ${htmlPath}`);
  patchedCount++;
}

console.log(`\nDone. ${patchedCount} / ${REPORTS.length} reports processed.`);
console.log(`Run by: ${STUDENT_ID} | ${TIMESTAMP}`);
