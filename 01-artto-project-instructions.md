# Artto Project Instructions

## Goal
Artto is a browser-based offline drawing and animation application. It should run without a server for normal use, be installable as a PWA, and remain usable on desktop, tablet, and mobile devices.

## Core principles
- Offline-first workflow
- No mandatory cloud dependency for core features
- Works from a local HTML entry file or installed PWA
- Device agnostic: mouse, touch, stylus, tablet, desktop
- Scalable from drawing app to animation editor
- Keep app shell lightweight and installable

## Product vision
The application should support:
- Drawing
- Brush and eraser
- Layers
- Layer opacity
- Blend modes
- Selection tools
- Undo / redo
- Local save and load
- PNG export
- Future animation timeline and frame editing

## Architecture priorities
1. Core document state
2. Drawing engine
3. Layer compositor
4. Selection system
5. History and project persistence
6. Input abstraction
7. PWA shell
8. Animation system

## Design rules
- Do not mix UI logic directly with drawing engine logic.
- Keep a clear state model separate from rendering.
- Brush opacity and layer opacity are different concepts and must remain separate.
- Blend modes belong to the layer compositor, not the brush.
- History should track document state or layer snapshots, not only DOM state.
- Selection should be managed as a dedicated state system.
- Do not prioritize animation until drawing, layers, and history are stable.

## Project phases
### Phase 1: MVP
- Canvas drawing
- Brush and eraser
- Size and opacity
- Layers
- Layer opacity
- Blend modes
- Selection tools
- Undo / redo
- Save/load JSON
- Export PNG
- PWA installability

### Phase 2: Enhancement
- Better input handling
- Touch and stylus support
- Improved performance
- Better local storage strategy
- Save slots and project naming

### Phase 3: Animation
- Frames and timeline
- Playback controls
- Onion skin
- Looping animation
- GIF / video export

## Reference projects to review
- Klecks
- Celstomp
- Nanimate
- offline-sketch
- miniPaint
- Piskel
- Wick Editor
- Excalidraw
- tldraw
- SVG-Edit
- Paper.js
- Fabric.js
- Konva.js

## Review approach for references
- Learn architecture, not copy code.
- Focus on the relevant subsystem: brush, layers, history, selection, timeline.
- Identify how different projects separate state from rendering.
- Evaluate licensing before reusing code.

## Licenses and usage policy
- Treat third-party reference projects as learning sources, not code templates.
- Respect project licenses before copying or adapting code.
- Prefer original implementation for the final app architecture.
- If code is reused, keep attribution and license compliance.

## Recommended folder structure
artto/
  index.html
  manifest.json
  sw.js
  assets/
  src/
    app/
    core/
    drawing/
    compositing/
    selection/
    input/
    storage/
    animation/

## Delivery target
The app should be easy to use:
- Open the file directly, or
- Install as a PWA from the repository, or
- Use a simple static hosting method if needed

The project should never require a complex setup for normal usage.
