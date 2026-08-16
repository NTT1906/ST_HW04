# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: fr01_registration.spec.js >> FR-01 — Account Registration (Data-Driven) >> BVA-TC002: Password boundary: Min (8 characters)
- Location: ../tests/FR01/scripts/fr01_registration.spec.js:35:9

# Error details

```
TimeoutError: browserType.launch: Timeout 180000ms exceeded.
Call log:
  - <launching> /home/arie/.cache/ms-playwright/firefox-1538/firefox/firefox -no-remote -headless -profile /tmp/playwright_firefoxdev_profile-xvU4TJ -juggler-pipe -silent
  - <launched> pid=15082
  - [pid=15082][err] *** You are running in headless mode.
  - [pid=15082][out] Crash Annotation GraphicsCriticalError: |[0][GFX1-]: RenderCompositorSWGL failed mapping default framebuffer, no dt (t=0.340193) [GFX1-]: RenderCompositorSWGL failed mapping default framebuffer, no dt

```