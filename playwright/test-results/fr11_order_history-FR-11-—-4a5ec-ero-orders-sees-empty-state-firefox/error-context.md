# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: fr11_order_history.spec.js >> FR-11 — Order History View (Data-Driven) >> TC-DT-002: User with zero orders sees empty state
- Location: ../tests/FR11/scripts/fr11_order_history.spec.js:123:9

# Error details

```
Error: browserType.launch: Failed to launch the browser process.
Browser logs:

<launching> /home/arie/.cache/ms-playwright/firefox-1538/firefox/firefox -no-remote -headless -profile /tmp/playwright_firefoxdev_profile-5gLGUR -juggler-pipe -silent
<launched> pid=15785
[pid=15785][err] *** You are running in headless mode.
[pid=15785][out] Crash Annotation GraphicsCriticalError: |[0][GFX1-]: RenderCompositorSWGL failed mapping default framebuffer, no dt (t=5.3273) [GFX1-]: RenderCompositorSWGL failed mapping default framebuffer, no dt
[pid=15785] <gracefully close start>
[pid=15785] <kill>
[pid=15785] <will force kill>
[pid=15785] <process did exit: exitCode=null, signal=SIGKILL>
[pid=15785] starting temporary directories cleanup
Call log:
  - <launching> /home/arie/.cache/ms-playwright/firefox-1538/firefox/firefox -no-remote -headless -profile /tmp/playwright_firefoxdev_profile-5gLGUR -juggler-pipe -silent
  - <launched> pid=15785
  - [pid=15785][err] *** You are running in headless mode.
  - [pid=15785][out] Crash Annotation GraphicsCriticalError: |[0][GFX1-]: RenderCompositorSWGL failed mapping default framebuffer, no dt (t=5.3273) [GFX1-]: RenderCompositorSWGL failed mapping default framebuffer, no dt
  - [pid=15785] <gracefully close start>
  - [pid=15785] <kill>
  - [pid=15785] <will force kill>
  - [pid=15785] <process did exit: exitCode=null, signal=SIGKILL>
  - [pid=15785] starting temporary directories cleanup
  - [pid=15785] <forcefully close>
  - [pid=15785] <kill>
  - [pid=15785] <skipped force kill spawnedProcess.killed=false processClosed=true>
  - [pid=15785] finished temporary directories cleanup
  - [pid=15785] <gracefully close end>

```