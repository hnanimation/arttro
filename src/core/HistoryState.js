export class HistoryState {
  constructor(limit = 30) {
    this.limit = limit;
    this.undoStack = [];
    this.redoStack = [];
  }

  normalize(snapshot) {
    if (snapshot === undefined || snapshot === null) {
      return null;
    }
    return JSON.parse(JSON.stringify(snapshot));
  }

  commit(snapshot) {
    const normalized = this.normalize(snapshot);
    if (!normalized) return null;

    const current = this.current();
    if (current && JSON.stringify(current) === JSON.stringify(normalized)) {
      return current;
    }

    this.undoStack.push(normalized);
    if (this.undoStack.length > this.limit) {
      this.undoStack.shift();
    }
    this.redoStack.length = 0;
    return normalized;
  }

  current() {
    return this.undoStack.length ? this.undoStack[this.undoStack.length - 1] : null;
  }

  undo() {
    if (!this.undoStack.length) {
      return null;
    }

    const current = this.undoStack.pop();
    this.redoStack.push(current);
    return this.undoStack.length ? this.undoStack[this.undoStack.length - 1] : null;
  }

  redo() {
    if (!this.redoStack.length) {
      return null;
    }

    const next = this.redoStack.pop();
    this.undoStack.push(next);
    return next;
  }
}
