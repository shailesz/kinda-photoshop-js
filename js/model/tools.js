class Tool {
  constructor() {
    this.class = "tools-icon";
    this.isToolActive = false;
  }
}

export class MoveTool extends Tool {
  constructor() {
    super();
    this.toolboxImgSrc = "./images/move.svg";
    this.altText = "Move";
  }

  activate(layer) {
    this.move(layer);
  }

  deactivate(layer) {
    layer.canvas.removeEventListener("mousedown", this.startMove);
  }

  move(selectedLayer) {
    var x = 0;
    var y = 0;

    this.startMove = (e) => {
      this.isToolActive = true;
      x = e.clientX;
      y = e.clientY;

      // // attach the listeners here
      document.addEventListener("mouseup", this.endMove);
      document.addEventListener("mousemove", this.reposition);
    };

    this.endMove = () => {
      this.isToolActive = false;

      // // remove listeners
      document.removeEventListener("mouseup", this.endMove);
      document.removeEventListener("mousemove", this.reposition);
    };

    this.reposition = (e) => {
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
    selectedLayer.canvas.addEventListener("mousedown", this.startMove);
  }
}

export class BrushTool extends Tool {
  constructor() {
    super();
    this.isMouseInCanvas = false;
    this.toolboxImgSrc = "./images/brush.svg";
    this.altText = "Brush";
  }

  activate(layer) {
    console.log("brush activate bhayo");
    this.brush(layer);
  }

  deactivate(layer) {
    console.log("brush deactivate bhayo");
    document.removeEventListener("mousedown", this.startDraw);
  }

  brush(selectedLayer) {
    this.startDraw = (e) => {
      if (this.isMouseInCanvas) {
        this.isToolActive = true;
        document.addEventListener("mouseup", this.endDraw);
        document.addEventListener("mousemove", this.draw);
        this.draw(e);
      }
    };

    this.endDraw = () => {
      this.isToolActive = false;
      selectedLayer.ctx.beginPath();
      document.removeEventListener("mouseup", this.endDraw);
      document.removeEventListener("mousemove", this.draw);
    };

    this.draw = (e) => {
      if (!this.isToolActive || !this.isMouseInCanvas) {
        return;
      }

      // variables here
      selectedLayer.ctx.globalCompositeOperation = "source-over";
      selectedLayer.ctx.strokeStyle = "yellow";
      selectedLayer.ctx.lineWidth = 10;
      selectedLayer.ctx.lineCap = "round";

      selectedLayer.ctx.lineTo(e.offsetX, e.offsetY);
      selectedLayer.ctx.stroke();
      selectedLayer.ctx.beginPath();
      selectedLayer.ctx.moveTo(e.offsetX, e.offsetY);
    };

    // event listeners
    document.addEventListener("mousedown", this.startDraw);
    canvasDiv.addEventListener("mouseenter", () => {
      this.isMouseInCanvas = true;
    });
    canvasDiv.addEventListener("mouseout", () => {
      this.isMouseInCanvas = false;
    });
  }
}

export class EraserTool extends Tool {
  constructor() {
    super();
    this.isMouseInCanvas = false;
    this.toolboxImgSrc = "./images/eraser.svg";
    this.altText = "Eraser";
  }

  activate(layer) {
    console.log("eraser activate garyo");
    this.eraser(layer);
  }

  deactivate(layer) {
    console.log("eraser deactivate garyo");
    document.removeEventListener("mousedown", this.startErase);
    this.isMouseInCanvas = false;
    this.isToolActive = false;
  }

  eraser(selectedLayer) {
    this.startErase = (e) => {
      if (this.isMouseInCanvas) {
        this.isToolActive = true;
        document.addEventListener("mouseup", this.endErase);
        document.addEventListener("mousemove", this.erase);
        this.erase(e);
      }
    };
    this.endErase = () => {
      this.isToolActive = false;
      selectedLayer.ctx.beginPath();
      document.removeEventListener("mouseup", this.endErase);
      document.removeEventListener("mousemove", this.erase);
    };
    this.erase = (e) => {
      if (!this.isToolActive && !this.isMouseInCanvas) {
        return;
      }

      // variables here
      selectedLayer.ctx.globalCompositeOperation = "destination-out";
      selectedLayer.ctx.strokeStyle = "black";
      selectedLayer.ctx.lineWidth = 10;
      selectedLayer.ctx.lineCap = "round";

      selectedLayer.ctx.lineTo(e.offsetX, e.offsetY);
      selectedLayer.ctx.stroke();
      selectedLayer.ctx.beginPath();
      selectedLayer.ctx.moveTo(e.offsetX, e.offsetY);
    };
    // event listeners
    document.addEventListener("mousedown", this.startErase);
    canvasDiv.addEventListener("mouseenter", () => {
      this.isMouseInCanvas = true;
    });
    canvasDiv.addEventListener("mouseout", () => {
      this.isMouseInCanvas = false;
    });
  }
}

export class SelectionTool extends Tool {
  constructor() {
    super();
    this.isMouseInCanvas = false;
    this.toolboxImgSrc = "../../images/selection.svg";
    this.altText = "Selection";
  }

  activate(layer) {
    this.select(layer);
  }

  deactivate(layer) {
    console.log("deactivate");
  }

  select(selectedLayer) {
    var element = document.querySelector(".canvas");
    this.mouseDownVector = {
      // mouse start
      x: 0,
      y: 0,
    };

    this.mousePositionVector = {
      // mouse realtime position
      x: 0,
      y: 0,
    };

    function setMousePosition(e) {
      mousePositionVector.x = ev.pageX + window.pageXOffset;
      mousePositionVector.y = ev.pageY + window.pageYOffset;
    }

    // mouse thichyo
    this.startSelection = (e) => {
      this.isToolActive = true;

      this.mouseDownVector.x = e.clientX;
      this.mouseDownVector.y = e.clientY;

      document.addEventListener("mouseup", this.endSelection);
      document.addEventListener("mousemove", this.selection);

      if (!document.querySelector("#selection")) {
        this.selectionDiv = document.createElement("div");
        this.selectionDiv.id = "selection";
        this.selectionDiv.style.top =
          parseInt(
            this.mouseDownVector.y - element.getBoundingClientRect().top
          ) + "px";
        this.selectionDiv.style.left =
          parseInt(
            this.mouseDownVector.x - element.getBoundingClientRect().left
          ) + "px";
        canvasDiv.appendChild(this.selectionDiv);
      } else {
        this.selectionDiv.style.top =
          parseInt(
            this.mouseDownVector.y - element.getBoundingClientRect().top
          ) + "px";
        this.selectionDiv.style.left =
          parseInt(
            this.mouseDownVector.x - element.getBoundingClientRect().left
          ) + "px";
        this.selectionDiv.style.width = "0px";
        this.selectionDiv.style.height = "0px";
      }
    };

    // mouse uthayo
    this.endSelection = (e) => {
      this.isToolActive = false;
      document.removeEventListener("mouseup", this.endSelection);
      document.removeEventListener("mousemove", this.selection);
    };

    // mouse hallayo
    this.selection = (e) => {
      if (!this.isToolActive) {
        return;
      }

      this.selectionDiv.style.width =
        Math.abs(e.clientX - this.mouseDownVector.x) + "px";

      this.selectionDiv.style.height =
        Math.abs(e.clientY - this.mouseDownVector.y) + "px";

      this.selectionDiv.style.left =
        e.clientX - this.mouseDownVector.x < 0
          ? parseInt(e.clientX - element.getBoundingClientRect().left) + "px"
          : parseInt(
              this.mouseDownVector.x - element.getBoundingClientRect().left
            ) + "px";

      this.selectionDiv.style.top =
        e.clientY - this.mouseDownVector.y < 0
          ? parseInt(e.clientY - element.getBoundingClientRect().top) + "px"
          : parseInt(
              this.mouseDownVector.y - element.getBoundingClientRect().top
            ) + "px";
    };

    document.addEventListener("mousedown", this.startSelection);

    // canvasDiv.addEventListener("mouseenter", () => {
    //   this.isMouseInCanvas = true;
    //   console.log('enter bhayo');
    // });

    // canvasDiv.addEventListener("mouseout", () => {
    //   this.isMouseInCanvas = false;
    //   console.log('exit bhayo');
    // });
  }
}

// TODO: this tool, make it fam
export class EyedropperTool extends Tool {
  constructor() {
    super();
    this.toolboxImgSrc = "./images/eyedropper.svg";
    this.altText = "Eyedropper";
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
