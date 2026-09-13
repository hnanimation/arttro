import { SelectionState } from './SelectionState.js';
import { HistoryState } from './HistoryState.js';
import { ViewportState } from './ViewportState.js';

export class DocumentState {
  constructor() {
    this.layers = [];
    this.activeLayer = 0;
    this.selection = new SelectionState();
    this.history = new HistoryState(30);
    this.viewport = new ViewportState();
  }

  createLayer(config = {}) {
    const layer = {
      name: config.name || `Layer ${this.layers.length + 1}`,
      visible: config.visible !== false,
      blendMode: config.blendMode || 'source-over',
      opacity: Number.isFinite(config.opacity) ? config.opacity : 1,
      canvas: config.canvas || null
    };

    this.layers.push(layer);
    return layer;
  }

  addLayer(layer) {
    return this.createLayer(layer || {});
  }

  setActiveLayer(index) {
    if (this.layers[index]) {
      this.activeLayer = index;
    }
  }

  setSelection(selection) {
    this.selection.set(selection);
    return this.selection.snapshot();
  }

  setViewport(viewport) {
    this.viewport = viewport instanceof ViewportState ? viewport : new ViewportState(viewport || {});
    return this.viewport;
  }

  clearSelection() {
    this.selection.clear();
  }

  snapshot() {
    return JSON.parse(JSON.stringify({
      layers: this.layers,
      activeLayer: this.activeLayer,
      selection: this.selection.snapshot(),
      viewport: this.viewport.toJSON()
    }));
  }

  seedDefaultLayer() {
    if (this.layers.length === 0) {
      this.createLayer({ name: 'Layer 1', visible: true, blendMode: 'source-over', opacity: 1 });
    }
    this.activeLayer = 0;
  }
}
