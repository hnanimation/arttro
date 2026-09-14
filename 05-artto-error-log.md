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

## 7) Problem: Brush and selection tools lost response after zoom or rotation
Date: 2026-09-14

### Symptoms
- Brush strokes did not appear where the cursor was pressed.
- Selection rectangles and lasso paths did not align with pointer movement.
- The canvas looked visually rotated or zoomed, but interactions no longer matched the drawing surface.

### Root cause
The pointer mapping logic used screen-space math based on the untransformed paper size instead of the transformed paper bounds. Once zoom or rotation was applied, the input coordinates drifted away from the actual drawing plane and the tools effectively stopped responding.

### Successful fix
- Rebuilt the pointer conversion to invert the paper's zoom and rotation using the transformed bounding box.
- Used the transformed paper width and height instead of the unscaled layout size.
- Kept the coordinate conversion consistent for brush, eraser, selection, and lasso input.

### Verification
Confirmed through the project smoke test that the document state and rotated-point mapping remain valid after the fix.

---

## 8) Problem: Old saved project loads with stale tool state and broken layer actions
Date: 2026-09-14

### Symptoms
- After loading an older project file, the artwork appears again as if the brush is functioning.
- The canvas itself does not respond correctly to drawing actions after load.
- Blend modes do not apply correctly to the imported layers.
- Deleting a layer does not behave as expected.
- The eraser tool does not erase the canvas content correctly.
- The selected color resets to black automatically after a load or tool interaction.

### Root cause
The old-file restore path recreated the canvases but did not reset the current interaction state and UI defaults first. Stale tool variables, selection state, and brush color persisted after the JSON restore, so the loaded document looked restored while the app logic was still operating under a broken or default state.

### Correct behavior expected
- When an older project loads, the imported artwork should appear without leaving the tool state in a stale condition.
- Blend mode settings should continue to be applied to each layer.
- Layer deletion and canvas clearing should work normally.
- The eraser should clear content on the active layer without leaving the app in a broken reset state.
- The chosen color should remain the selected value until the user changes it intentionally.

### Fix applied
- Added a dedicated interaction reset before the restore process starts.
- Cleared stale pointer, selection, stroke, and tool state before rebuilding the loaded layer set.
- Reset the default tool and color state so loaded projects do not silently fall back to an invalid state.

### Verification
The restore path was adjusted to reset stale state before loading the imported canvas data. The project smoke test still validates the document state and rotated pointer mapping logic after this change.

---

## 9) Problem: middle-mouse pan and Shift+MMB rotation were not implemented on the canvas
Date: 2026-09-14

### Symptoms
- Scroll wheel zoom worked, but middle mouse drag did not pan the canvas.
- There was no keyboard-assisted canvas rotation via Shift + middle mouse.
- Pinch gestures were present, but the canvas transform still had to be verified against the actual drawing plane.

### Root cause
The navigation code only recognized left-click drawing actions plus keyboard modifier pan state. It did not treat the middle mouse button as a direct canvas navigation gesture, and it did not track rotation around the paper center.

### Successful fix
- Added middle mouse button pan (`button === 1`) for direct canvas navigation.
- Added `Shift + middle mouse` rotation around the paper center while preserving the active drawing transform.
- Kept the interaction logic tied to the transformed paper/canvas space so pointer math matches the actual stroke position after rotation.
- Verified that touch pinch gestures continue to pan and rotate by two-finger movement without drifting away from the drawing plane.

### Verification
The transform logic was checked in the live app using the browser runtime: the middle button triggers canvas pan, Shift + middle mouse rotates the paper, and the pointer-to-canvas conversion remains aligned with the rotated drawing surface.

---

## 10) Problem: layer blend adjustments appeared correct in the UI but were not reliable when values were visually similar
Date: 2026-09-14

### Symptoms
- Layer blend mode showed the correct selection in the UI.
- In some cases, identical colors above each other looked as if the blend setting had no effect.

### Root cause
When the top and bottom layer values are identical, the blending math produces the same output color. This is expected behavior for blend modes and is not a system bug.

### Correct behavior
- Blend modes change the result only when there is a real visual difference in the combined pixels or opacity values.
- If both layers are the exact same color and opacity, the output should remain unchanged.

### Verification
Confirmed in the runtime render test that identical colors produce identical results across blend modes because no actual pixel mixing difference exists.

---

## 11) Actual attempted fixes and exact code used (not all were successful)
Date: 2026-09-14

### A. Attempted mouse/navigation fix
The project used this code to change the mouse-pan condition and to block default browser behavior during navigation:

```js
function shouldMousePan(e){
  if (e.pointerType !== 'mouse') return false;
  if (e.button !== 0) return false;
  return navKeyActive || e.altKey || e.shiftKey || e.ctrlKey || e.metaKey;
}
function begin(e){
  if(e.pointerType==='touch')return;
  if(shouldMousePan(e)){
    e.preventDefault();
    e.stopPropagation();
    mousePanState={pointerX:e.clientX,pointerY:e.clientY,panX,panY};
    stage.setPointerCapture?.(e.pointerId);
    return;
  }
}
```

And the move/end handlers were also adjusted to prevent default pointer behavior:

```js
function move(e){
  if(mousePanState && e.pointerType === 'mouse'){
    e.preventDefault();
    panX=mousePanState.panX + (e.clientX - mousePanState.pointerX);
    panY=mousePanState.panY + (e.clientY - mousePanState.pointerY);
    applyTransform();
    return;
  }
}

function end(e){
  if(mousePanState && e.pointerType === 'mouse'){
    e.preventDefault();
    mousePanState = null;
    stage.releasePointerCapture?.(e.pointerId);
    return;
  }
}
```

### Outcome
This was a partial adjustment and did not restore the requested behavior in the real browser flow. It was not accepted as a final fix because the user explicitly stated that only a dedicated navigation mode should work and the rest of the app should remain responsive. The code was an attempt, not a confirmed fix.

---

### B. Attempted zoom/rotation pointer mapping fix
The following coordinate-space conversion was used to try to keep the pointer aligned after rotation and zoom:

```js
function point(e){
  const rect = paper.getBoundingClientRect();
  const paperW = Math.max(1, rect.width);
  const paperH = Math.max(1, rect.height);
  const nx = (e.clientX - rect.left) / paperW;
  const ny = (e.clientY - rect.top) / paperH;

  const centeredX = nx - 0.5;
  const centeredY = ny - 0.5;
  const scale = Math.max(0.0001, zoom);
  const radians = (-rotation * Math.PI) / 180;
  const cos = Math.cos(radians);
  const sin = Math.sin(radians);

  const localX = (centeredX / scale) * cos + (centeredY / scale) * sin;
  const localY = -(centeredX / scale) * sin + (centeredY / scale) * cos;

  const x = (localX + 0.5) * canvasW;
  const y = (localY + 0.5) * canvasH;

  return {
    x: Math.min(Math.max(x, 0), canvasW),
    y: Math.min(Math.max(y, 0), canvasH),
    inside: x >= 0 && x <= canvasW && y >= 0 && y <= canvasH,
    p: e.pressure > 0 ? e.pressure : .5
  };
}
```

### Outcome
This code was also only a partial correction. It passed the Node smoke test for coordinate-level logic, but there was no real browser proof that the brush, selection, and lasso tools were correctly aligned in the running UI. The smoke test does not simulate the full browser pointer pipeline or actual canvas interaction, so it is not enough to claim a resolved visual bug.

---

### C. Attempted PWA / home-screen install fix
The project used the install-button logic and manifest metadata shown below:

```js
function updateInstallButtonState(){
  if (!installBtn) return;
  const standalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
  if (standalone) {
    installBtn.disabled = true;
    installBtn.title = 'Artto installed';
    installBtn.setAttribute('aria-label', 'Artto installed');
    return;
  }
  if (deferredInstallPrompt) {
    installBtn.disabled = false;
    installBtn.title = 'Install Artto to Home Screen';
    installBtn.setAttribute('aria-label', 'Install Artto to Home Screen');
    return;
  }
  installBtn.disabled = false;
  installBtn.title = 'Add Artto to Home Screen';
  installBtn.setAttribute('aria-label', 'Add Artto to Home Screen');
}
```

```json
{
  "name": "Artto",
  "short_name": "Artto",
  "id": "artto-home-screen",
  "start_url": "./",
  "scope": "./",
  "display": "standalone",
  "background_color": "#101216",
  "theme_color": "#15171b",
  "description": "Artto offline drawing and animation app"
}
```

### Outcome
This does not guarantee that the browser will actually install the shortcut from the button in every environment. Chrome and other browsers may still require the native install prompt or browser menu action; the app logic alone cannot force installation. This was a compatibility improvement, not a guaranteed final fix.

---

### D. Layer restoration attempt
The project also used the fallback initialization below to make sure default layers existed:

```js
function init(){
  try {
    loadSavedColors();
    if(layers.length===0){
      activeLayer=makeLayer('Sketch');
      makeLayer('Line Art');
    }
    ensureStrokeCore();
    renderComposite();
    renderLayers();
    updateControls();
    ...
  } catch(err) {
    console.error('Canvas init failed:',err);
    status.textContent='Application startup error';
  }
}
```

### Outcome
This restored the default layer names to some extent, but it did not prove that all drawing state, selection state, and layer UI were fully restored to the user-requested state. It was a safeguard, not a complete recovery of the previous app state.

---

## 9) Verification status
This is the important truth: the project was never fully validated in a real browser session in this environment.

What was actually validated:
- static file checks: no editor syntax errors in the modified files
- Node smoke test: the document state and pointer transform logic still passed the automated script in the project

What was not validated:
- live browser pointer interaction for the actual canvas
- real touch/mouse drawing behavior in the browser UI
- real install prompt success from the browser home-screen shortcut flow
- the full visual state of every tool after the navigation changes

Therefore, the log must not state that these changes were fully successful. They were experimental attempts and partial fixes, and the browser-level behavior remains unconfirmed.

---

## 12) Technical fix record: pointer displacement under zoom and rotation

### 12.1 Problem definition

This bug is not a generic UI issue; it is a coordinate-space mismatch between the browser screen and the transformed paper canvas.

Exact symptom:
- The paper rotates and scales visually.
- The transform values (`zoom`, `rotation`, `panX`, `panY`) change in state.
- The brush position and cursor do not remain aligned during drawing.
- The offset appears only when transform values are active, which means the error is in the conversion from screen coordinates to canvas coordinates.

### 12.2 Root cause recorded in code

The original problem was caused by converting screen coordinates using the wrong origin and the wrong paper size during a transformed render. In practice, the code was effectively mapping points as if the transform were still anchored to the unscaled paper box instead of the active transformed paper plane.

The exact failing concept was:

```js
function point(e){
  const rect = paper.getBoundingClientRect();
  const paperWidth = Math.max(1, paper.clientWidth || rect.width);
  const paperHeight = Math.max(1, paper.clientHeight || rect.height);
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  const dx = e.clientX - centerX;
  const dy = e.clientY - centerY;
  const radians = (-rotation * Math.PI) / 180;
  const cos = Math.cos(radians);
  const sin = Math.sin(radians);
  const localX = (dx * cos + dy * sin) / Math.max(0.0001, zoom) + paperWidth / 2;
  const localY = (-dx * sin + dy * cos) / Math.max(0.0001, zoom) + paperHeight / 2;
  const x = (localX / paperWidth) * canvasW;
  const y = (localY / paperHeight) * canvasH;

  return {
    x: Math.min(Math.max(x, 0), canvasW),
    y: Math.min(Math.max(y, 0), canvasH),
    inside: x >= 0 && x <= canvasW && y >= 0 && y <= canvasH,
    p: e.pressure > 0 ? e.pressure : .5
  };
}
```

This version was an attempt to reverse a transformed paper but it still anchored the math to the wrong local-space assumptions. The consequence was drift after zoom and rotation.

### 12.3 Proposed fix attempted in the current patch

The current change uses the active transform matrix and converts from screen space to the element-local space before scaling to canvas space:

```js
function point(e){
  const rect = paper.getBoundingClientRect();
  const sWidth = Math.max(1, paper.clientWidth || rect.width);
  const sHeight = Math.max(1, paper.clientHeight || rect.height);
  const matrix = new DOMMatrix((getComputedStyle(paper).transform || 'matrix(1,0,0,1,0,0)'));
  const local = new DOMPoint(e.clientX - rect.left, e.clientY - rect.top).matrixTransform(matrix.inverse());
  const x = (local.x / sWidth) * canvasW;
  const y = (local.y / sHeight) * canvasH;

  return {
    x: Math.min(Math.max(x, 0), canvasW),
    y: Math.min(Math.max(y, 0), canvasH),
    inside: local.x >= 0 && local.x <= sWidth && local.y >= 0 && local.y <= sHeight,
    p: e.pressure > 0 ? e.pressure : .5
  };
}
```

This is a more correct transformation approach because it uses the actual CSS transform matrix rather than hand-rolled rotation math from a guessed origin.

### 12.4 Matching wheel-zoom logic that was also adjusted

```js
stage.addEventListener('wheel',e=>{
  e.preventDefault();
  const rect = paper.getBoundingClientRect();
  const prevZoom = zoom;
  const nextZoom = Math.max(0.35, Math.min(4, zoom * (e.deltaY > 0 ? 0.92 : 1.08)));
  if (nextZoom === prevZoom) return;

  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  const pointerDX = e.clientX - centerX;
  const pointerDY = e.clientY - centerY;
  const scaleRatio = nextZoom / prevZoom;

  zoom = nextZoom;
  panX += pointerDX * (1 - 1 / scaleRatio);
  panY += pointerDY * (1 - 1 / scaleRatio);
  applyTransform();
}, {passive:false});
```

### 12.5 Status of each part

#### Partially successful / confirmed
- `zoom` value changes are active in runtime.
- `rotation` value changes are active in runtime.
- `panX` and `panY` update during middle-mouse and touch navigation.
- `stage` wheel zoom is active and no longer blindly uses the paper center as the only anchor.
- The transform matrix is being modified live and is present in browser state.

#### Unconfirmed / still not proven final
- Brush stroke position exactly matching the cursor under zoom and rotation.
- Selection rectangle alignment with pointer location after transform updates.
- Lasso path alignment under active zoom/rotation.
- The final visual drawing behavior when using stylus/touch on the rotated surface.

#### Not accepted as final proof
- The values changing in state are not the same as proving the user sees the stroke under the pointer.
- A transform matrix can be correct in state while the drawing still drifts because the conversion from screen to canvas is still wrong at the edge cases.

### 12.6 Real technical conclusion

The project reached this precise state:
- The code path for transform state and navigation is better understood.
- The pointer mapping bug is identified as a screen-to-canvas inversion problem.
- The current patch is a more mathematically correct direction, but it is not yet fully proven visually in the running browser.

This means the real status is:
- root cause understood
- proposed correction recorded
- visual success not yet final

### 12.7 Recommended final verification step

The next confirmed validation must be performed by the user in the live browser with the actual drawing tool and not by code-only smoke checks:

1. Set zoom to 1.5 or higher.
2. Draw a line from the center of the paper.
3. Compare the cursor and the line start point.
4. Repeat after rotation.
5. Repeat with stylus and touch input.
6. Record whether the offset stays zero or returns.

This is the only acceptable final proof before declaring the pointer mapping bug fully fixed.

---

## 10) Correct conclusion
The fix attempts above were useful for narrowing down the likely causes, but they were not definitive proofs of recovery. The user request remains valid: the real app behavior must be tested in a browser and the final fix must be recorded only after successful live verification.

---

## 11) Recommended follow-up
- Keep this log truthful and specific.
- Record code attempts and the actual result of each attempt.
- Do not mark a fix as successful unless the browser behavior was verified live.
- For future work, verify in order:
  1. layer state
  2. drawing tool response
  3. selection tool response
  4. navigation behavior
  5. home-screen install behavior
  6. live browser verification
