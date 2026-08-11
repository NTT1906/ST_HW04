# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: fr11_order_history.spec.js >> FR-11 — Order History View (Data-Driven) >> TC-DT-001: Valid authenticated user views order history (nominal path)
- Location: ../tests/FR11/scripts/fr11_order_history.spec.js:123:9

# Error details

```
TimeoutError: browserType.launch: Timeout 180000ms exceeded.
Call log:
  - <launching> /home/arie/.cache/ms-playwright/firefox-1538/firefox/firefox -no-remote -headless -profile /tmp/playwright_firefoxdev_profile-0vslvc -juggler-pipe -silent
  - <launched> pid=15510
  - [pid=15510][err] *** You are running in headless mode.
  - [pid=15510][out] Crash Annotation GraphicsCriticalError: |[0][GFX1-]: RenderCompositorSWGL failed mapping default framebuffer, no dt (t=5.32143) [GFX1-]: RenderCompositorSWGL failed mapping default framebuffer, no dt

```