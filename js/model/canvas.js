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
    this.imageData = null;
    this.bitmap = null;

    // checking if the initialized canvas is empty or a image layer
    if (!isEmptyLayer) {
      this.image = new Image();
      this.image.src = src;

      // setting onload for image of this object
      this.image.onload = () => {
        // taking image ko height width
        var imageWidth = this.image.width;
        var imageHeight = this.image.height;

        // finding ratio
        this.imageRatio = imageWidth / imageHeight;

        // finding canvas ko resolution to set
        this.calculatedWidth = (canvasDivHolder.clientWidth * 0.9).toFixed(0);
        this.calculatedHeight = (
          this.calculatedWidth / this.imageRatio
        ).toFixed(0);

        // setting up this canvas
        this.canvas.width = this.calculatedWidth;
        this.canvas.height = this.calculatedHeight;
        this.canvas.style.width = this.calculatedWidth + "px";
        this.canvas.style.height = this.calculatedHeight + "px";

        // TODO: yeslai photoshop.js bata handle garne only once when creating first layer
        // setting canvas-div ko widthharu
        if (!isEmptyLayer) {
          canvasDiv.setAttribute(
            "style",
            `height: ${this.calculatedHeight}px; width: ${this.calculatedWidth}px;`
          );
          // console.log(`height: ${this.calculatedHeight}px; width: ${this.calculatedWidth}px;`);
        }

        // draw image on canvas
        this.ctx.drawImage(
          this.image,
          this.position.x,
          this.position.y,
          parseInt(this.canvas.style.width),
          parseInt(this.canvas.style.height)
        );
      };
    } else {
      // create transparent canvas
      this.canvas.width = startLayerWidth;
      this.canvas.height = startLayerHeight;
      this.canvas.style.width = startLayerWidth + "px";
      this.canvas.style.height = startLayerHeight + "px";
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
    return [
      parseInt(this.canvas.style.width),
      parseInt(this.canvas.style.height),
    ];
  }

  resize(mouseDownVector, mouseX, mouseY) {
    let resizeImage = (image) => {
      let canvasResolution = this.getCanvasResolution();
      let dx = 0,
        dy = 0,
        dw = canvasResolution[0],
        dh = canvasResolution[1];

      // top
      if (mouseDownVector.y < 10) {
        dh -= mouseY;
        dy = mouseY;
      }

      // bottom
      if (mouseDownVector.y > canvasResolution[1] - 10) {
        dh = mouseY;
      }

      // left
      if (mouseDownVector.x < 10) {
        dw -= mouseX;
        dx = mouseX;
      }

      if (mouseDownVector.x > canvasResolution[0] - 10) {
        dw = mouseX;
      }

      this.ctx.drawImage(image, dx, dy, dw, dh);
    };

    this.ctx.clearRect(
      0,
      0,
      this.getCanvasResolution()[0],
      this.getCanvasResolution()[1]
    );

    resizeImage(this.bitmap);
  }

  rotate(mouseDownVector, mouseX, mouseY) {
    let canvasResolution = this.getCanvasResolution();

    let rotateImage = (image) => {
      let mouseDownLineSlope =
        (canvasResolution[0] / 2 - mouseDownVector.x) /
        (canvasResolution[1] / 2 - mouseDownVector.y);

      let currentMouseLineSlope =
        (canvasResolution[0] / 2 - mouseX) / (canvasResolution[1] / 2 - mouseY);

      let m2 = mouseDownLineSlope;
      let m1 = currentMouseLineSlope;

      let tanTheta = (m2 - m1) / (1 + m1 * m2);
      let angleInRadians = Math.atan(tanTheta);

      this.ctx.save();
      this.ctx.clearRect(0, 0, canvasResolution[0], canvasResolution[1]);
      this.ctx.translate(canvasResolution[0] / 2, canvasResolution[1] / 2);
      this.ctx.rotate(angleInRadians);
      this.ctx.drawImage(
        image,
        -(canvasResolution[0] / 2),
        -(canvasResolution[1] / 2)
      );
      this.ctx.restore();
    };

    rotateImage(this.bitmap);
  }
}
