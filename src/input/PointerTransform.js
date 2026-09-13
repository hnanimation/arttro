export function normalizePointerPosition(clientX, clientY, rect) {
  const safeRect = rect || { left: 0, top: 0, width: 1, height: 1 };
  const px = Math.min(Math.max(clientX - safeRect.left, 0), safeRect.width);
  const py = Math.min(Math.max(clientY - safeRect.top, 0), safeRect.height);
  return { px, py };
}

export function screenToCanvasPoint(clientX, clientY, viewport, rect, canvasWidth, canvasHeight) {
  const safeRect = rect || { left: 0, top: 0, width: 1, height: 1 };
  const { px, py } = normalizePointerPosition(clientX, clientY, safeRect);
  const centerX = safeRect.left + safeRect.width / 2;
  const centerY = safeRect.top + safeRect.height / 2;
  const dx = clientX - centerX;
  const dy = clientY - centerY;

  const zoom = Number.isFinite(viewport?.zoom) ? viewport.zoom : 1;
  const rotation = Number.isFinite(viewport?.rotation) ? viewport.rotation : 0;
  const radians = (-rotation * Math.PI) / 180;
  const cos = Math.cos(radians);
  const sin = Math.sin(radians);

  const localX = (dx / Math.max(0.0001, zoom)) * cos - (dy / Math.max(0.0001, zoom)) * sin;
  const localY = (dx / Math.max(0.0001, zoom)) * sin + (dy / Math.max(0.0001, zoom)) * cos;

  const paperW = Math.max(1, safeRect.width);
  const paperH = Math.max(1, safeRect.height);
  const mappedX = localX + paperW / 2;
  const mappedY = localY + paperH / 2;

  const x = (mappedX / paperW) * canvasWidth;
  const y = (mappedY / paperH) * canvasHeight;

  return {
    x: Math.min(Math.max(x, 0), canvasWidth),
    y: Math.min(Math.max(y, 0), canvasHeight),
    inside: x >= 0 && x <= canvasWidth && y >= 0 && y <= canvasHeight,
    localX: mappedX,
    localY: mappedY,
    px,
    py
  };
}
