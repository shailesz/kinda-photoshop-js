import Canvas from "./canvas.js";

/**
 *
 */
export default class LayerManager {
  constructor(backgroundImageSrc) {
    this.myLayers = [];
    this.backgroundLayer = new Canvas(backgroundImageSrc, false);

    // pushing background layer to myLayers
    this.myLayers.push(this.backgroundLayer);
  }

  // currently adding transparent layer
  // also pushing it to this.myLayers
  addLayer() {
    this.myLayers.push(
      new Canvas(
        null,
        true,
        this.backgroundLayer.calculatedWidth,
        this.backgroundLayer.calculatedHeight
      )
    );
  }

  deleteLayer() {}
}
