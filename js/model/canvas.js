class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

/*
 * creates a layer
 * @params src - the source of the image to be drawn
 * @params isEmptyLayer - bool value to denote if it is a image layer or an empty layer
 * @params startLayerWidth - Number value of width of canvas of the initial image aka background
 * @params startLayerHeight - Number value of the canvas of the initial image aka background
 */

export class Canvas {
  constructor(
    src,
    isEmptyLayer = true,
    startLayerWidth = null,
    startLayerHeight = null
  ) {
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.position = new Vector(0, 0);
    this.layerName = "Layer ";

    // checking if the initialized canvas is empty or a image layer
    if (!isEmptyLayer) {
      this.image = new Image();
      this.image.src = src;

      // taking image ko height width
      var imageWidth = this.image.width;
      var imageHeight = this.image.height;

      // finding ratio
      this.imageRatio = imageWidth / imageHeight;

      // finding canvas ko resolution to set
      this.calculatedWidth = (canvasDivHolder.clientWidth * 0.9).toFixed(0);
      this.calculatedHeight = (this.calculatedWidth / this.imageRatio).toFixed(
        0
      );

      // setting up this canvas
      this.canvas.width = this.calculatedWidth;
      this.canvas.height = this.calculatedHeight;

      // TODO: yeslai photoshop.js bata handle garne only once when creating first layer
      // setting canvas-div ko widthharu
      if (!isEmptyLayer) {
        canvasDiv.setAttribute(
          "style",
          `height: ${this.calculatedHeight}px; width: ${this.calculatedWidth}px;`
        );
        // console.log(`height: ${this.calculatedHeight}px; width: ${this.calculatedWidth}px;`);
      }

      // setting onload for image of this object
      this.image.onload = () => {
        // draw image on canvas
        this.ctx.drawImage(
          this.image,
          this.position.x,
          this.position.y,
          this.canvas.width,
          this.canvas.height
        );
      };
    } else {
      // create transparent canvas
      this.canvas.width = startLayerWidth;
      this.canvas.height = startLayerHeight;
      this.ctx.fillStyle = "transparent";
      this.ctx.fillRect(
        this.position.x,
        this.position.y,
        startLayerWidth,
        startLayerHeight
      );
    }
    canvasDiv.appendChild(this.canvas);
  }

  getCanvasResolution() {
    return [this.canvas.width, this.canvas.height];
  }
}
