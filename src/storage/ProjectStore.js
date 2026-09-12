export class ProjectStore {
  constructor(storage = localStorage) {
    this.storage = storage;
  }

  save(key, value) {
    this.storage.setItem(key, JSON.stringify(value));
  }

  load(key) {
    const raw = this.storage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  }
}
