export class MoveTool {
  constructor() {
    this.isToolActive = false;
  }

  move(selectedLayer) {
    var x = 0;
    var y = 0;

    var startMove = (e) => {
      this.isToolActive = true;
      x = e.clientX;
      y = e.clientY;

      // // attach the listeners here
      document.addEventListener("mouseup", endMove);
      document.addEventListener("mousemove", reposition);
    };

    var endMove = () => {
      this.isToolActive = false;

      // // remove listeners
      document.removeEventListeners("mouseup", endMove);
      document.removeEventListeners("mousemove", reposition);
    };

    var reposition = (e) => {
      if (!this.isToolActive) {
        return;
      }
      // mouse kati move bhayo
      var dx = e.clientX - x;
      var dy = e.clientY - y;

      // reposition
      selectedLayer.canvas.style.top =
        selectedLayer.canvas.offsetTop + dy + "px";
      selectedLayer.canvas.style.left =
        selectedLayer.canvas.offsetLeft + dx + "px";

      // reassign mouse ko position
      x = e.clientX;
      y = e.clientY;
    };

    // event listener for when mouce moves
    selectedLayer.canvas.addEventListener("mousedown", startMove);
  }
}

export class BrushTool {
  constructor() {
    this.isToolActive = false;
  }

  brush(selectedLayer) {
    var startDraw = (e) => {
      this.isToolActive = true;
      draw(e);
    };

    var endDraw = () => {
      this.isToolActive = false;
      selectedLayer.ctx.beginPath();
    };

    var draw = (e) => {
      if (!this.isToolActive) {
        return;
      }

      // variables here
      selectedLayer.ctx.strokeStyle = "white";
      selectedLayer.ctx.lineWidth = 10;
      selectedLayer.ctx.lineCap = "round";

      selectedLayer.ctx.lineTo(e.offsetX, e.offsetY);
      selectedLayer.ctx.stroke();
      selectedLayer.ctx.beginPath();
      selectedLayer.ctx.moveTo(e.offsetX, e.offsetY);
    };

    // event listeners
    selectedLayer.canvas.addEventListener("mousedown", startDraw);
    selectedLayer.canvas.addEventListener("mouseup", endDraw);
    selectedLayer.canvas.addEventListener("mousemove", draw);
  }
}

export class EraserTool {
  constructor() {
    this.isToolActive = false;
  }

  erase(selectedLayer) {
    var startErase = (e) => {
      this.isToolActive = true;
      erase(e);
    };

    var endErase = () => {
      this.isToolActive = false;
      selectedLayer.ctx.beginPath();
    };

    var erase = (e) => {
      if (!this.isToolActive) {
        return;
      }

      // variables here
      selectedLayer.ctx.globalCompositeOperation = "destination-out";
      selectedLayer.ctx.lineWidth = 10;
      selectedLayer.ctx.lineCap = "round";

      selectedLayer.ctx.lineTo(e.offsetX, e.offsetY);
      selectedLayer.ctx.stroke();
      selectedLayer.ctx.beginPath();
      selectedLayer.ctx.moveTo(e.offsetX, e.offsetY);
    };

    // event listeners
    selectedLayer.canvas.addEventListener("mousedown", startErase);
    selectedLayer.canvas.addEventListener("mouseup", endErase);
    selectedLayer.canvas.addEventListener("mousemove", erase);
  }
}

export class EyedropperTool {
  constructor() {
    this.isToolActive = false;
  }

  eyedrop(artboard) {
    // TODO: eyedropper functionality 
    // getimage and getpx methods hune raicha
    // maybe combine all layers so that can accurately get the color of any layers that the mouse may hover
    // aaru ma ta single layer linthiyo aba that wont work fam
    // good luck :)
    
    // artboard.addEventListener("mousemove", (e) => {
    //   console.log("hello");

    // });
  }
}
