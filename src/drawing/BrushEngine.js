export class BrushEngine {
  constructor() {
    this.brushOpacity = 1;
    this.brushSize = 10;
  }

  setOpacity(value) {
    this.brushOpacity = Math.max(0, Math.min(1, value));
  }

  setSize(value) {
    this.brushSize = Math.max(1, value);
  }

  drawStroke(ctx, points, color, options = {}) {
    if (!ctx || points.length < 2) return;

    ctx.save();
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = color;
    ctx.lineWidth = options.size ?? this.brushSize;
    ctx.globalAlpha = options.opacity ?? this.brushOpacity;
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);

    for (let i = 1; i < points.length; i++) {
      ctx.lineTo(points[i].x, points[i].y);
    }

    ctx.stroke();
    ctx.restore();
  }
}
