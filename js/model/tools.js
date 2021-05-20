export class MoveTool {
  constructor() {
    console.log("move banyo");
  }
}

export class BrushTool {
  constructor() {
    this.isBrushActive = false;
  }

  brush(selectedLayer) {
    var startDraw = (e) => {
      this.isBrushActive = true;
      draw(e);
    };

    var endDraw = () => {
      this.isBrushActive = false;
      selectedLayer.ctx.beginPath();
    };

    var draw = (e) => {
      if (!this.isBrushActive) {
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
    this.isEraserActive = false;
  }

  erase(selectedLayer) {
    var startErase = (e) => {
      this.isEraserActive = true;
      erase(e);
    };

    var endErase = () => {
      this.isEraserActive = false;
      selectedLayer.ctx.beginPath();
    };

    var erase = (e) => {
      if (!this.isEraserActive) {
        return;
      }

      // variables here
      selectedLayer.ctx.globalCompositeOperation = 'destination-out';
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