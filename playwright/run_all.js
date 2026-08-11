import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const configs = [
  { config: 'fr01.chromium.config.js', label: 'FR-01 Chromium' },
  { config: 'fr01.firefox.config.js',  label: 'FR-01 Firefox' },
  { config: 'fr01.webkit.config.js',   label: 'FR-01 WebKit' },
  { config: 'fr11.chromium.config.js', label: 'FR-11 Chromium' },
  { config: 'fr11.firefox.config.js',  label: 'FR-11 Firefox' },
  { config: 'fr11.webkit.config.js',   label: 'FR-11 WebKit' },
  { config: 'fr14.chromium.config.js', label: 'FR-14 Chromium' },
  { config: 'fr14.firefox.config.js',  label: 'FR-14 Firefox' },
  { config: 'fr14.webkit.config.js',   label: 'FR-14 WebKit' },
];

console.log('============================================================');
console.log(' HW04 Windows Multi-Browser Report Runner');
console.log(' Student ID: 23127255');
console.log('============================================================\n');

for (const { config, label } of configs) {
  console.log(`>>> Running: ${label} (${config})`);
  try {
    execSync(`npx playwright test --config=${config}`, {
      cwd: __dirname,
      stdio: 'inherit',
      shell: true
    });
  } catch (err) {
    console.log(`>>> Test run for ${label} finished (some tests may have failed as expected).`);
  }
}

console.log('\n============================================================');
console.log(' Patching HTML reports with "Run by: 23127255" banner...');
console.log('============================================================\n');

try {
  execSync('node patch-reports.js', {
    cwd: __dirname,
    stdio: 'inherit',
    shell: true
  });
} catch (err) {
  console.error('Error running patch-reports.js:', err);
}

console.log('\nALL 9 REPORTS GENERATED & PATCHED SUCCESSFULLY!');
