import assert from 'node:assert/strict';
import fs from 'node:fs';

const html = fs.readFileSync(new URL('../artto_v50.html', import.meta.url), 'utf8');

assert.match(html, /startRotation|rotation\s*=|getAngle\s*\(/, 'Touch rotation support is missing from the canvas gesture logic');
assert.match(html, /rotate\s*\(/, 'Canvas transform should include rotation when using multi-touch gestures');

console.log('touch-rotation-ok');
