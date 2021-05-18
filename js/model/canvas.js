export default class Canvas {
  constructor() {
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.image = new Image();

    // setting onload for image of this object
    this.image.onload = () => {
      var canvasDiv = document.querySelector(".canvas");
      var canvasDivHolder = document.querySelector(".canvas-holder");
      
      // taking image ko height width
      var imageWidth = this.image.width;
      var imageHeight = this.image.height;

      // finding ratio
      var imageRatio = imageWidth / imageHeight;

      // finding canvas ko resolution to set
      var calculatedWidth = (canvasDivHolder.clientWidth * 0.9).toFixed(0);
      var calculatedHeight = (calculatedWidth / imageRatio).toFixed(0);

      // TODO: yeslai photoshop.js bata handle garne only once when creating first layer
      // setting canvas-div ko widthharu
      canvasDiv.setAttribute(
        "style",
        `height: ${calculatedHeight}px; width: ${calculatedWidth}px;`
      );

      // setting up this canvas
      this.canvas.width = calculatedWidth;
      this.canvas.height = calculatedHeight;

      console.log("image ko: ", this.image.width, this.image.height);
      console.log("calculated ko: ", calculatedWidth, calculatedHeight);
      console.log("canvas ko:", this.canvas.width, this.canvas.height);

      this.ctx.drawImage(
        this.image,
        0,
        0,
        this.canvas.width,
        this.canvas.height
      );

      canvasDiv.appendChild(this.canvas);
    };

    this.setup();
  }

  setup() {
    this.image.src = "./images/2.png";
    this.update();
  }

  update() {
    requestAnimationFrame(() => this.update());
  }
}
