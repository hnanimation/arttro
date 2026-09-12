# Artto Project Tracker

## 1. Overview
Project name: Artto
Type: Offline drawing and animation web application
Primary goal: Create a browser-based drawing editor that works offline, supports all major devices, and can expand into a full animation editor.

## 2. Product definition
Artto is designed to be:
- offline-first
- lightweight
- installable as a PWA
- usable on mobile, tablet, and desktop
- easy to launch from a local file or a simple static site
- extensible into a full animation workflow

## 3. Target user experience
A user should be able to:
- open the app quickly
- draw using mouse, touch, or stylus
- manage layers
- modify opacity and blend mode
- use selection tools
- undo and redo actions
- save and load local projects
- export artwork
- later add animation frames and playback

## 4. Core feature checklist
### Required now
- [x] Offline concept defined
- [x] Basic canvas drawing
- [x] Brush tool
- [x] Eraser tool
- [x] Size control
- [x] Brush opacity
- [x] Color selection
- [x] Layers
- [x] Layer opacity
- [x] Blend modes
- [x] Selection tools
- [x] Undo / redo
- [x] Local save/load
- [x] PNG export
- [ ] PWA install support
- [ ] Mobile polish
- [ ] Better state management
- [ ] Clean modular architecture

### Planned later
- [ ] Frame-based animation
- [ ] Timeline
- [ ] Playback
- [ ] Onion skin
- [ ] GIF export
- [ ] WebM export
- [ ] More brush presets
- [ ] Better pressure handling
- [ ] Better fill tools
- [ ] Auto-save and backup
- [ ] Better performance optimization

## 5. Design standards
- No mandatory server dependency for daily work
- Keep artwork editing local to the device
- Maintain a clear separation between app state and rendering logic
- Separate brush opacity from layer opacity
- Treat blend modes as compositing logic, not brush logic
- History should capture state, not only UI changes
- Avoid overloading a single HTML file in the long term

## 6. Current implementation status
### Completed at prototype level
- Basic drawing behavior
- Layer creation and management
- Layer opacity control
- Blend modes
- Selection prototype
- Undo/redo prototype
- Save/load project prototype
- PNG export prototype

### Not yet complete
- Production-grade architecture
- PWA packaging
- Modular code organization
- Full cross-device robustness
- Animation system
- Structured long-term maintenance

## 7. Known issues
- Single-file implementation is too tightly coupled
- History snapshots are not fully robust
- Selection behavior is fragile in complex scenarios
- Fill and transparency logic may be inconsistent
- Mobile/touch handling is limited
- PWA is not yet implemented
- Layer and brush opacity remain intertwined in the current flow

## 8. Issue severity and repair status
### High severity
- [ ] Architecture modularization
- [ ] History reliability
- [ ] Selection robustness
- [ ] Clear separation of state from rendering

### Medium severity
- [ ] Touch support hardening
- [ ] Better fill stability
- [ ] Better local storage approach

### Low severity
- [ ] Performance tuning for large drawings
- [ ] UI polish and responsive improvements

## 9. Progress percentages
### Functional systems
- Drawing engine: 85%
- Layers: 75%
- Blend modes: 75%
- Selection: 60%
- Undo / redo: 55%
- Save/load: 75%
- Export: 80%
- Offline concept: 70%
- PWA support: 0%
- Animation support: 0%

### Architecture quality
- Prototype viability: 70%
- Production architecture: 25%
- Scalability for animation: 20%

## 10. Last update log
### 2026-09-12
- Reviewed the current drawing implementation.
- Confirmed that the app is functional as a prototype.
- Identified the key architectural weaknesses.
- Documented required features and future roadmap.
- Started tracking progress and issue backlog.

## 11. Recommended next development steps
1. Split the app into clear modules.
2. Define a document state model.
3. Separate renderer from UI and input logic.
4. Improve history and snapshot logic.
5. Stabilize selection and fill behavior.
6. Add PWA support.
7. Then add animation timeline and frame system.

## 12. Final status
The project is promising and feasible, but it is still in the prototype-to-architecture transition stage. The important next step is not adding more features, but stabilizing the foundation before building the animation layer.
