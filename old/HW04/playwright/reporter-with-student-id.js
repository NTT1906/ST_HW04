/**
 * reporter-with-student-id.js
 *
 * A thin Playwright custom reporter that wraps the built-in HTML reporter
 * and injects "Run by: 23127255" + an ISO timestamp into every generated
 * report's <title> and <body> via a post-processing step on the index.html.
 *
 * Student ID: 23127255
 */

import { FullConfig, FullResult, Reporter, Suite, TestCase, TestResult } from '@playwright/test/reporter';
import fs from 'fs';
import path from 'path';

class StudentIdReporter {
  constructor(options = {}) {
    this.outputFolder = options.outputFolder || '../tests/playwright-report';
    this.studentId = '23127255';
    this.timestamp = new Date().toISOString();
    this.feature = options.feature || 'ALL';
    this.browser = options.browser || 'all';
  }

  onBegin(config, suite) {
    this._config = config;
    this._suite = suite;
    console.log(`\n[StudentID Reporter] Run by: ${this.studentId} | ${this.timestamp} | Feature: ${this.feature} | Browser: ${this.browser}\n`);
  }

  onEnd(result) {
    // Patch the generated index.html after Playwright writes it
    const htmlPath = path.resolve(this.outputFolder, 'index.html');
    if (!fs.existsSync(htmlPath)) return;

    let html = fs.readFileSync(htmlPath, 'utf-8');

    const banner = `
<!-- Run by: ${this.studentId} | ${this.timestamp} | Feature: ${this.feature} | Browser: ${this.browser} -->`;

    const titleTag = `<title>Playwright Test Report — Run by: ${this.studentId} | ${this.feature} | ${this.browser} | ${this.timestamp}</title>`;

    const badge = `<div id="student-id-badge" style="position:fixed;top:0;left:0;right:0;z-index:9999;background:#1a56db;color:#fff;font-family:monospace;font-size:14px;padding:6px 16px;text-align:center;">
  Run by: <strong>${this.studentId}</strong> &nbsp;|&nbsp; Feature: <strong>${this.feature}</strong> &nbsp;|&nbsp; Browser: <strong>${this.browser}</strong> &nbsp;|&nbsp; <span id="student-ts">${this.timestamp}</span>
</div>
<style>body { padding-top: 36px !important; }</style>`;

    // Replace <title>
    html = html.replace(/<title>.*?<\/title>/s, titleTag);

    // Inject banner comment after <html>
    html = html.replace(/(<html[^>]*>)/, `$1\n${banner}`);

    // Inject visible badge before </head>
    html = html.replace('</head>', `${badge}\n</head>`);

    fs.writeFileSync(htmlPath, html, 'utf-8');
    console.log(`\n[StudentID Reporter] ✅ Patched: ${htmlPath}`);
    console.log(`[StudentID Reporter]    Run by: ${this.studentId} | ${this.timestamp}\n`);
  }
}

export default StudentIdReporter;
