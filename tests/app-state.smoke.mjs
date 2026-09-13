import assert from 'node:assert/strict';
import { App } from '../src/app/App.js';

const app = new App();
app.init();

assert.equal(app.state.isReady, true, 'App should mark itself ready after init');
assert.ok(app.state.document, 'App should create a document state object');
assert.ok(Array.isArray(app.state.document.layers), 'Document state should expose layers as an array');
assert.equal(app.state.document.layers.length, 1, 'App should seed a default layer');

const created = app.state.document.createLayer({ name: 'Layer 2', opacity: 0.5 });
assert.equal(created.name, 'Layer 2', 'Creating a layer should use the supplied name');
assert.equal(created.opacity, 0.5, 'Layer opacity should be preserved');
assert.equal(app.state.document.layers.length, 2, 'Document state should keep newly created layers');

app.state.document.setSelection({ x: 10, y: 12, w: 20, h: 30 });
assert.deepEqual(app.state.document.selection.snapshot(), { x: 10, y: 12, w: 20, h: 30 }, 'Selection should be stored in document state');

const snapshot = app.state.document.snapshot();
app.state.document.history.commit(snapshot);
assert.ok(app.state.document.history.current(), 'History should record a committed snapshot');
assert.equal(app.state.document.history.undoStack.length, 1, 'History should track undo entries');

console.log('smoke-ok');
