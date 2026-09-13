# Artto Error Log and Fix Tracker

## Overview
This log records the actual issues encountered during testing, deployment, and live-site verification for Artto. It is intended to document failures, root causes, and the fixes that succeeded so future changes can be reviewed quickly.

---

## 1) Problem: Local app looked broken after recent updates
Date: 2026-09-13

### Symptoms
- The app appeared to stop working after updates.
- The page was not reliably refreshing to the latest version.
- The live deployment looked stale or inconsistent.

### Root cause
The app itself was not the only issue. The GitHub Pages deployment and PWA shell configuration were inconsistent:
- the manifest was missing or mismatched
- the service worker cache was stale
- the app shell and published path were not aligned with GitHub Pages routing
- some required PWA asset references were missing

### Failed attempts
- Updated only the app logic without correcting deployment metadata.
- Kept using an older cache version and stale cache path assumptions.
- Left the manifest pointing to incorrect paths for /arttro/ hosting.

### Successful fix
- Added a correct manifest link to the app shell.
- Updated the manifest start_url and scope to match GitHub Pages hosting.
- Updated the service worker cache version and navigation handling.
- Added the missing icon files for the PWA shell.

### Verification
Confirmed in the live browser that the page loads successfully and the app renders with no JavaScript errors.

---

## 2) Problem: GitHub Pages deployment not resolving correct app shell
Date: 2026-09-13

### Symptoms
- The site did not reliably serve the intended app entry after upload.
- Pages opened in a broken or stale state.

### Root cause
The repository root and GitHub Pages subpath needed proper handling. The published project lives under /arttro/, so relative paths and manifest settings must be consistent with that structure.

### Failed attempts
- Keeping paths as if the site were at the repository root.
- Using a service worker and manifest configuration that assumed a different base path.

### Successful fix
- Set manifest scope and start_url to a GitHub Pages-safe configuration.
- Linked the manifest in the app entry pages.
- Ensured the service worker caches the correct files.

### Verification
The live page loads successfully at https://hnanimation.github.io/arttro/artto_v50.html and renders the UI without errors.

---

## 3) Problem: Missing PWA assets caused installability issues
Date: 2026-09-13

### Symptoms
- Browser installability and offline shell behavior were inconsistent.
- Missing icon support prevented PWA metadata from working properly.

### Root cause
The manifest referenced icon files that were not present in the project.

### Failed attempts
- Keeping manifest entries pointing to missing icon files.
- Relying on a stale or absent static asset set.

### Successful fix
Created the required icon assets in the project:
- assets/icons/icon-192.svg
- assets/icons/icon-512.svg

### Verification
The app loads successfully in the live browser and the manifest is acknowledged by the environment.

---

## 4) Problem: App looked broken after refresh because cache was stale
Date: 2026-09-13

### Symptoms
- Refreshes appeared to keep the old version.
- The app looked unchanged or broken despite file updates.

### Root cause
The service worker used a cache name and shell that did not match the current deployment state.

### Failed attempts
- Re-uploading files without updating the service worker cache version.
- Leaving the stale cache active in the browser.

### Successful fix
- Bumped the cache version to a new value.
- Added explicit activation and cleanup logic.
- Ensured navigation requests fall back correctly when offline or stale.

### Verification
A fresh load of the live page showed the updated UI and application state without JavaScript errors.

---

## 5) Successful final project state
Date: 2026-09-13

### Verified state
- App loads successfully from live GitHub Pages.
- No JavaScript page errors detected.
- Version label displays as v51.
- Status reads: Ink · Layer: Sketch.

### Final verified URL
https://hnanimation.github.io/arttro/artto_v50.html

### Final notes
The main app logic was not the core root cause. The real failure was tied to deployment, PWA shell, and stale cache configuration. Once those were corrected, the app returned to a working state.

---

## 6) Problem: Mouse navigation pan allowed browser default behavior
Date: 2026-09-14

### Symptoms
- Middle/right-click or modifier-based mouse navigation could trigger browser default actions.
- Panning felt inconsistent when the user tried to navigate the canvas with the mouse.

### Root cause
The mouse-pan branch was updating the paper transform but did not prevent the browser's default pointer behavior. That allowed context-menu or native navigation interference during canvas navigation.

### Successful fix
- Prevented default pointer behavior when mouse panning begins and while it continues.
- Captured the pointer during pan gestures to keep navigation stable.
- Released pointer capture when the gesture ends.

### Verification
Checked the input logic in the app code and validated the smoke test for document state and pointer transforms still passes after the fix.

---

## 7) Recommended follow-up
- Keep this log updated when future bugs are found.
- Always verify the live GitHub Pages URL after any manifest or service worker change.
- For any future deployment issue, check in order:
  1. manifest.json
  2. sw.js
  3. app entry page
  4. asset paths and icons
  5. mouse input and navigation behavior
  6. live browser verification
