export class SelectionState {
  constructor() {
    this.selection = null;
  }

  set(selection) {
    this.selection = selection ? JSON.parse(JSON.stringify(selection)) : null;
    return this.selection;
  }

  clear() {
    this.selection = null;
  }

  snapshot() {
    return this.selection ? JSON.parse(JSON.stringify(this.selection)) : null;
  }

  hasSelection() {
    return !!this.selection;
  }
}
