export class LayerRenderer {
  constructor() {
    this.defaultBlendMode = 'source-over';
  }

  renderLayer(ctx, layer, compositeAlpha = 1) {
    if (!ctx || !layer) return;
    ctx.save();
    ctx.globalAlpha = compositeAlpha;
    ctx.globalCompositeOperation = layer.blendMode || this.defaultBlendMode;
    if (layer.canvas) {
      ctx.drawImage(layer.canvas, 0, 0);
    }
    ctx.restore();
  }
}
