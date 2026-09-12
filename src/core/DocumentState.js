export class DocumentState {
  constructor() {
    this.layers = [];
    this.activeLayer = 0;
    this.selection = null;
    this.history = [];
  }

  addLayer(layer) {
    this.layers.push(layer);
    return this.layers.length - 1;
  }

  setActiveLayer(index) {
    if (this.layers[index]) {
      this.activeLayer = index;
    }
  }

  snapshot() {
    return JSON.parse(JSON.stringify({
      layers: this.layers,
      activeLayer: this.activeLayer,
      selection: this.selection
    }));
  }
}
