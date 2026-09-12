# Artto Project Roadmap and Progress Log

## 1. Project objective
Artto is a browser-based offline drawing and animation application designed to work without a server for the core workflow. It should be lightweight, installable as a PWA, run on desktop and mobile devices, and evolve into a fully featured digital drawing and animation tool.

## 2. Required features
The following features are required for the core product:

### Core drawing features
- Offline operation
- Browser-based canvas drawing
- Brush tool
- Eraser tool
- Size control
- Brush opacity control
- Color selection
- Fill tool
- Selection tools
- Move selection
- Layer system
- Layer visibility toggle
- Layer opacity control
- Blend modes
- Undo / redo
- Local save/load
- PNG export

### Accessibility and portability
- Works on desktop, tablet, and mobile
- Supports mouse, touch, stylus
- No complex setup for normal use
- Direct file opening or installable PWA

### Project distribution
- Single file use possible
- PWA install option
- Local project persistence
- Minimal external dependency for daily work

## 3. Planned future features
The following features are planned after the core product is stable:

### Drawing enhancements
- Better pressure handling
- Smoother brush curves
- More brush presets
- More advanced selection tools
- Better fill and mask algorithms
- More transformation tools

### Animation features
- Frames and timeline
- Onion skin
- Playback controls
- FPS tuning
- Looping animation
- Import/export sprite sheets
- GIF/WebM export

### Product maturity features
- Better history system
- Better performance under large canvases
- Improved keyboard shortcuts
- Better UI/UX polish
- Project autosave
- Backup and restore system
- Batch export

## 4. Current status summary
Status: Core prototype exists, but it is not yet a production-grade architecture.

### Architecture status
- Basic drawing prototype: Completed
- Layers: Completed at a prototype level
- Layer opacity: Present
- Blend modes: Present
- Selection: Present at prototype level
- Undo / redo: Present but snapshot logic is still limited
- Save/load: Present
- PNG export: Present
- PWA support: Not yet implemented as a full installable app shell
- Mobile optimization: Partial
- Animation system: Not started

## 5. Known issues and risks
### High-priority issues
- All logic is concentrated in one HTML file, which reduces maintainability.
- History and snapshot logic are not yet fully reliable for all document states.
- Selection editing is not robust enough for large or complex arrangements.
- Brush opacity and layer opacity are coupled in the rendering flow.
- Fill logic can be inconsistent with complex selection and transparency boundaries.
- UI logic and rendering logic are not fully separated.

### Medium-priority issues
- Touch support is not fully reliable or intentionally limited in some code paths.
- PWA installation is not set up yet.
- No modular file structure yet.
- No dedicated state manager or renderer abstraction.
- No dedicated animation architecture yet.

### Low-priority issues
- Some behavior depends on the current file structure rather than a reusable architecture.
- Performance may degrade with large or complex artwork.
- History may not capture every editing operation accurately in future feature growth.

## 6. Fix status and correction percentage
The following assessment reflects the current state as of 2026-09-12.

### Core drawing functionality
- Brush: 85%
- Eraser: 80%
- Layers: 75%
- Layer opacity: 80%
- Blend modes: 75%
- Selection: 60%
- Undo / redo: 55%
- Save / load: 75%
- Export PNG: 80%
- Offline concept: 70%

### Architecture maturity
- Single-file prototype quality: 70%
- Modularity readiness: 25%
- State separation readiness: 30%
- PWA readiness: 0%
- Animation readiness: 0%

### Overall estimated completion
- Core drawing feature completion: 72%
- Architecture maturity: 35%
- Future animation readiness: 20%

## 7. Correction history
### 2026-09-12
- Reviewed current drawing implementation and identified architecture gaps.
- Confirmed that brush opacity, layer opacity, blend mode, selection, and undo/redo are implemented in one file.
- Identified that the architecture is prototype-level rather than production-level.
- Recorded project requirements and future roadmap.
- Documented that the app should remain offline-first and PWA-friendly.
- Added failed fix attempts and root-cause notes for stability issues encountered while improving the current prototype.

### Failed fix attempts and likely causes
#### Attempt: History snapshot hardening
- Issue: Undo/redo sometimes restored stale or inconsistent state because the previous snapshot did not fully represent active layer and selection state.
- Result: Partially improved, but the approach remained dependent on a single document snapshot model.
- Likely cause: The state model was still coupled to UI-derived values and not isolated as a formal document state.

#### Attempt: Selection state reset on tool change
- Issue: Old selection boxes remained active when switching tools or starting a new selection.
- Result: Selection reset behavior improved, but selection still relies on direct DOM box manipulation and is not fully robust for complex interactions.
- Likely cause: Selection state is still tied to transient DOM/UI elements instead of a dedicated selection model.

#### Attempt: Fill guard protection for empty layer and transparent boundaries
- Issue: Fill operations could fail or behave inconsistently when no layer existed or when the clicked region was nearly transparent.
- Result: Failure guard added and some edge cases were reduced, but the fill algorithm still depends on composite image boundaries and is not fully deterministic for all selections.
- Likely cause: The fill algorithm uses an image-composite boundary check rather than a dedicated mask model with explicit alpha semantics.

#### Attempt: Touch/debug variable declaration fix
- Issue: Missing variables for the touch debug HUD caused startup/runtime errors under certain conditions.
- Result: Runtime issue resolved in the direct case.
- Likely cause: The script defined some variables in a later section of the file and expected them to already exist at initialization.

### Correction status for this date
- Requirements documented: 100%
- Architecture diagnosis completed: 100%
- Risk list documented: 100%
- Roadmap created: 100%
- Failed fix review added: 100%
- Implementation re-architecture not started yet: 0%

## 8. Recommended next step
The next step should be to create a modular architecture before adding animation features. The app should be refactored into separate modules for:
- app shell
- document state
- layers
- store/history
- drawing engine
- compositor
- selection
- input
- storage
- PWA registration

## 9. Final notes
This project is viable as an offline drawing app, but the current implementation is not yet ready for full long-term expansion without a structural refactor. The main risk is architectural entanglement rather than lack of concept.

The best next move is to stabilize the drawing engine and state model first, then add animation and PWA packaging afterward.
