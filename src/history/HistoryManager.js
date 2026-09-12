export class HistoryManager {
  constructor() {
    this.entries = [];
    this.pointer = -1;
  }

  push(snapshot) {
    this.entries = this.entries.slice(0, this.pointer + 1);
    this.entries.push(snapshot);
    this.pointer = this.entries.length - 1;
  }

  undo() {
    if (this.pointer <= 0) return null;
    this.pointer -= 1;
    return this.entries[this.pointer];
  }

  redo() {
    if (this.pointer >= this.entries.length - 1) return null;
    this.pointer += 1;
    return this.entries[this.pointer];
  }
}
