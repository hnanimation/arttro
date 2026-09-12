export class SelectionManager {
  constructor() {
    this.selection = null;
  }

  begin(x, y) {
    this.selection = {
      x,
      y,
      width: 0,
      height: 0,
      active: true
    };
  }

  update(x, y) {
    if (!this.selection) return null;
    const dx = x - this.selection.x;
    const dy = y - this.selection.y;
    this.selection.width = dx;
    this.selection.height = dy;
    return this.selection;
  }

  end() {
    const result = this.selection ? { ...this.selection } : null;
    this.selection = null;
    return result;
  }
}
