# Artto

Artto is a browser-based drawing and layout prototype focused on offline use, mouse and touch input, layers, selection, and simple project management. The project is designed to evolve from a lightweight drawing tool into a more complete creative editor.

## UI preview

![Artto UI preview](assets/screenshots/Screenshot%202026-09-13%20arrtro.png)

## Project goal
Artto aims to provide a fast and portable drawing workflow without requiring a backend. It is intended to work locally in the browser, support desktop and tablet workflows, and eventually grow toward animation and timeline-based editing.

## Current status
This repository contains a working prototype with an interactive drawing canvas and supporting project structure. The app is viable for testing, concept validation, and design exploration, while the architecture still needs additional cleanup and modular refactoring before major feature growth.

## Included files
- `artto_v50.html` — main interactive application prototype
- `manifest.json` — installable web app metadata
- `sw.js` — service worker for offline shell support
- `src/` — modular source structure for future refactoring
- `assets/` — icons and visual assets
- `README.md` — project overview and usage notes
- `LICENSE` — project legal terms
- `CONTRIBUTING.md` — contribution rules and ownership terms
- `COPYRIGHT.md` — ownership and usage restrictions
- `SECURITY.md` — vulnerability reporting policy
- planning files — roadmap, tracker, and project notes

## Features
- Brush and eraser tools
- Layer creation and management
- Layer opacity and blend modes
- Selection and move operations
- Undo and redo workflow
- Local save and load
- PNG export
- Mouse and touch navigation
- Offline-first browser behavior
- Future animation and frame-based workflow planning

## Quick start
1. Open `artto_v50.html` in a modern browser.
2. Or serve the project using a simple local web server.
3. For tablet or touch testing, run it on a browser-enabled device.

## Development direction
The project is intentionally kept in a prototype stage while the core interaction model is being refined. The next important steps are to clean up state management, input handling, history logic, and rendering structure before deeper animation work begins.

## Contributing
Contributions are welcome only through the official project workflow and only under the project owner’s review and approval.

Please read:
- [CONTRIBUTING.md](CONTRIBUTING.md)
- [COPYRIGHT.md](COPYRIGHT.md)
- [SECURITY.md](SECURITY.md)

Do not fork this project into a separate commercial or independent product.

## Legal and licensing status
This project is protected by a custom proprietary contribution policy. It is not a standard public open-source license and should not be treated as one.

The project owner retains full ownership of the software and all accepted contributions. No commercial use, redistribution, public fork, or independent release is permitted without prior written permission.

See:
- [LICENSE](LICENSE)
- [COPYRIGHT.md](COPYRIGHT.md)
- [CONTRIBUTING.md](CONTRIBUTING.md)

## Notes
This repository is intended for controlled project development and contribution, not for unrestricted public reuse or independent commercial deployment.
