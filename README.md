# Artto

Artto is an offline-first browser drawing and animation application. It is designed to run without a server for normal use, work on desktop and mobile devices, and later evolve into a more complete animation editor.

## Project goals
- Work fully offline after loading the app shell
- Be easy to open directly from a file or install as a PWA
- Support mouse, touch, and stylus input
- Provide layers, opacity, blending, selection, undo/redo, and export
- Expand into animation tools later without rewriting the whole project

## Current status
This repository currently contains a prototype drawing app and supporting project documentation. The core drawing interactions exist, but the architecture still needs a stronger separation between state, drawing, rendering, selection, and history.

## Directory structure
- `artto_v50.html` — current prototype app
- `docs/` — project documentation and review notes
- `src/` — planned modular structure for future architecture
- `assets/` — static assets and icons

## Planned architecture
- `src/app` — application bootstrap and UI wiring
- `src/core` — document, layer, history, project state
- `src/drawing` — brush, eraser, stroke, renderer
- `src/compositing` — layer opacity and blend modes
- `src/selection` — selection state and operations
- `src/input` — mouse, touch, pointer handling
- `src/storage` — local project save/load and export
- `src/animation` — future timeline and frame system

## Important note
The current code is intentionally a prototype and should not yet be treated as a final production architecture. The next step is refactoring around a clean state model and modular renderer before adding more advanced animation features.

## Quick start
1. Open `artto_v50.html` directly in a browser.
2. Or host the folder in a simple static environment.
3. For future PWA usage, add service worker and manifest support.

## Project documentation
See the markdown files in the root for:
- project instructions
- roadmap and status
- project tracker
- summary notes

## License
This project is currently a prototype and documentation package. Add a suitable license before publishing or distributing it publicly.
