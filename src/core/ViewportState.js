export class ViewportState {
  constructor({ zoom = 1, rotation = 0, panX = 0, panY = 0 } = {}) {
    this.zoom = Number.isFinite(zoom) ? zoom : 1;
    this.rotation = Number.isFinite(rotation) ? rotation : 0;
    this.panX = Number.isFinite(panX) ? panX : 0;
    this.panY = Number.isFinite(panY) ? panY : 0;
  }

  clone() {
    return new ViewportState({
      zoom: this.zoom,
      rotation: this.rotation,
      panX: this.panX,
      panY: this.panY
    });
  }

  applyToElement(element) {
    if (!element) return;
    element.style.transform = `translate(${this.panX}px, ${this.panY}px) rotate(${this.rotation}deg) scale(${this.zoom})`;
    element.style.transformOrigin = 'center center';
  }

  toJSON() {
    return {
      zoom: this.zoom,
      rotation: this.rotation,
      panX: this.panX,
      panY: this.panY
    };
  }
}
