# Artto

Artto is an offline-first browser-based drawing and animation prototype designed for desktop and tablet use. It runs as a lightweight HTML/CSS/JS app, supports touch and mouse input, and focuses on core creative workflows such as drawing, layers, opacity, blend modes, selection, undo/redo, project save/load, and export.

## UI preview

![Artto UI preview](assets/screenshots/Screenshot%202026-09-13%20arrtro.png)

## Project goal
Artto aims to become a simple but capable digital sketch and animation workspace that works without a backend and can later grow into a more complete frame-based editor.

## Current status
This repository contains a working prototype with the main drawing interface and supporting project documentation. The app is usable for experimentation and concept validation, while the architecture still needs cleanup and modular refactoring before large feature expansion.

## Included files
- `artto_v50.html` — current interactive app prototype
- `manifest.json` — app metadata for installable web app support
- `sw.js` — service worker for offline shell support
- `src/` — modular structure for future code organization
- `assets/` — icons and static app assets
- `*.md` files — roadmap, tracker, and project notes

## Features in progress
- Brush and eraser tools
- Layer management
- Layer opacity and blend modes
- Selection and move tools
- Undo/redo history
- Local save/load of projects
- PNG export
- Mouse and touch navigation support
- Future animation timeline and frame-based workflow

## Development direction
The project is intentionally structured as a prototype that can evolve into a cleaner architecture. The next important step is to separate state, rendering, input, and history clearly before expanding into animation features.

## Quick start
1. Open `artto_v50.html` directly in your browser.
2. Or serve the folder with a simple local web server.
3. For mobile or tablet testing, use a browser on the same network or publish the app to a static hosting service.

## Project documentation
This repository includes the planning and project tracking files that describe the roadmap, goals, and current status of the app.

## Contributing
Contributions are welcome. Please keep changes focused, document major behavior changes, and test interactions across desktop and touch devices before opening a pull request.

## License
This project is licensed under the MIT License. See the `LICENSE` file for details.
