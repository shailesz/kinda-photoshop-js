import Canvas from "./canvas.js";
import Toolbar from "./tool.js";

/**
 *
 */
export default class LayerManager {
  constructor(backgroundImageSrc) {
    this.myLayers = [];
    this.backgroundLayer = new Canvas(backgroundImageSrc, false);

    // pushing background layer to myLayers
    this.myLayers.push(this.backgroundLayer);
    new Toolbar()
    this.setup();
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

  setup() {
    this.isBrushActive = false;

    var startDraw = (e) => {
      this.isBrushActive = true;
      draw(e);
    };

    var endDraw = () => {
      this.isBrushActive = false;
      this.backgroundLayer.ctx.beginPath();
    };

    var draw = (e) => {
      if (!this.isBrushActive) {
        return;
      }

      // variables here
      this.backgroundLayer.ctx.strokeStyle = "black";
      this.backgroundLayer.ctx.lineWidth = 10;
      this.backgroundLayer.ctx.lineCap = "round";

      this.backgroundLayer.ctx.lineTo(e.offsetX, e.offsetY);
      this.backgroundLayer.ctx.stroke();
      this.backgroundLayer.ctx.beginPath();
      this.backgroundLayer.ctx.moveTo(e.offsetX, e.offsetY);
    };

    // event listeners
    this.backgroundLayer.canvas.addEventListener("mousedown", startDraw);
    this.backgroundLayer.canvas.addEventListener("mouseup", endDraw);
    this.backgroundLayer.canvas.addEventListener("mousemove", draw);

    this.update();
  }

  update() {
    requestAnimationFrame(() => {
      this.update();
    });
  }
}
