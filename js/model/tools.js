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
    this.selectionDiv = null;

    this.flipIsMouseInCanvas = () => {
      this.isMouseInCanvas = !this.isMouseInCanvas;
    };
  }

  activate(layer) {
    this.brush(layer);
  }

  deactivate(layer) {
    this.isMouseInCanvas = false;
    this.isToolActive = false;

    document.removeEventListener("mousedown", this.startDraw);

    if (this.selectionDiv) {
      this.selectionDiv.removeEventListener(
        "mouseenter",
        this.flipIsMouseInCanvas
      );
      this.selectionDiv.removeEventListener(
        "mouseout",
        this.flipIsMouseInCanvas
      );
    } else {
      canvasDiv.removeEventListener("mouseenter", this.flipIsMouseInCanvas);
      canvasDiv.removeEventListener("mouseout", this.flipIsMouseInCanvas);
    }
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

      let element = document.querySelector(".canvas");
      let mouseX = e.clientX - element.getBoundingClientRect().left;
      let mouseY = e.clientY - element.getBoundingClientRect().top;
      selectedLayer.ctx.lineTo(mouseX, mouseY);
      selectedLayer.ctx.stroke();
      selectedLayer.ctx.beginPath();
      selectedLayer.ctx.moveTo(mouseX, mouseY);
    };

    // event listeners
    document.addEventListener("mousedown", this.startDraw);

    this.selectionDiv = document.querySelector("#selection");
    if (this.selectionDiv) {
      this.selectionDiv.addEventListener(
        "mouseenter",
        this.flipIsMouseInCanvas
      );

      this.selectionDiv.addEventListener("mouseout", this.flipIsMouseInCanvas);
    } else {
      canvasDiv.addEventListener("mouseenter", this.flipIsMouseInCanvas);

      canvasDiv.addEventListener("mouseout", this.flipIsMouseInCanvas);
    }
  }
}

export class EraserTool extends Tool {
  constructor() {
    super();
    this.isMouseInCanvas = false;
    this.toolboxImgSrc = "./images/eraser.svg";
    this.altText = "Eraser";
    this.selectionDiv = null;
    this.flipIsMouseInCanvas = () => {
      this.isMouseInCanvas = !this.isMouseInCanvas;
    };
  }

  activate(layer) {
    this.eraser(layer);
  }

  deactivate(layer) {
    this.isMouseInCanvas = false;
    this.isToolActive = false;

    document.removeEventListener("mousedown", this.startErase);

    if (this.selectionDiv) {
      this.selectionDiv.removeEventListener(
        "mouseenter",
        this.flipIsMouseInCanvas
      );
      this.selectionDiv.removeEventListener(
        "mouseout",
        this.flipIsMouseInCanvas
      );
    } else {
      canvasDiv.removeEventListener("mouseenter", this.flipIsMouseInCanvas);
      canvasDiv.removeEventListener("mouseout", this.flipIsMouseInCanvas);
    }
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
      if (!this.isToolActive || !this.isMouseInCanvas) {
        return;
      }

      // variables here
      selectedLayer.ctx.globalCompositeOperation = "destination-out";
      selectedLayer.ctx.strokeStyle = "black";
      selectedLayer.ctx.lineWidth = 10;
      selectedLayer.ctx.lineCap = "round";

      let element = document.querySelector(".canvas");
      let mouseX = e.clientX - element.getBoundingClientRect().left;
      let mouseY = e.clientY - element.getBoundingClientRect().top;
      selectedLayer.ctx.lineTo(mouseX, mouseY);
      selectedLayer.ctx.stroke();
      selectedLayer.ctx.beginPath();
      selectedLayer.ctx.moveTo(mouseX, mouseY);
    };
    // event listeners
    document.addEventListener("mousedown", this.startErase);

    this.selectionDiv = document.querySelector("#selection");
    if (this.selectionDiv) {
      this.selectionDiv.addEventListener(
        "mouseenter",
        this.flipIsMouseInCanvas
      );

      this.selectionDiv.addEventListener("mouseout", this.flipIsMouseInCanvas);
    } else {
      canvasDiv.addEventListener("mouseenter", this.flipIsMouseInCanvas);

      canvasDiv.addEventListener("mouseout", this.flipIsMouseInCanvas);
    }
  }
}

export class SelectionTool extends Tool {
  constructor() {
    super();
    this.isMouseInCanvas = false;
    this.toolboxImgSrc = "./images/selection.svg";
    this.altText = "Selection";
    this.flipIsMouseInCanvas = () => {
      this.isMouseInCanvas = !this.isMouseInCanvas;
    };
  }

  activate(layer) {
    this.select(layer);
  }

  deactivate(layer) {
    this.isMouseInCanvas = false;
    this.isToolActive = false;
    canvasDiv.removeEventListener("mousedown", this.startSelection);
  }

  select(selectedLayer) {
    var element = document.querySelector(".canvas");
    this.mouseDownVector = {
      // mouse start
      x: 0,
      y: 0,
    };

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
        canvasDiv.appendChild(this.selectionDiv);
      } else {
        this.selectionDiv.style.width = "0px";
        this.selectionDiv.style.height = "0px";
      }

      this.selectionDiv.style.top =
        parseInt(this.mouseDownVector.y - element.getBoundingClientRect().top) +
        "px";
      this.selectionDiv.style.left =
        parseInt(
          this.mouseDownVector.x - element.getBoundingClientRect().left
        ) + "px";
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

    canvasDiv.addEventListener("mousedown", this.startSelection);

    let selectionDiv = document.querySelector("#selection");
    if (selectionDiv) {
      selectionDiv.addEventListener("mouseenter", this.flipIsMouseInCanvas);
      selectionDiv.addEventListener("mouseout", this.flipIsMouseInCanvas);
    }

    canvasDiv.addEventListener("mouseenter", this.flipIsMouseInCanvas);
    canvasDiv.addEventListener("mouseout", this.flipIsMouseInCanvas);
  }
}

export class TextTool extends Tool {
  constructor(addNewLayerCallback) {
    super();
    this.toolboxImgSrc = "./images/text.svg";
    this.altText = "Text";
    this.addNewLayerCallback = addNewLayerCallback;
  }

  activate(layer) {
    console.log("text tool active");
    this.addText(layer);
  }
  deactivate() {
    console.log("texttool deactive");
    document.removeEventListener("mousedown", this.startText);
    canvasDiv.removeEventListener("mouseenter", this.flipIsMouseInCanvas);

    canvasDiv.removeEventListener("mouseout", this.flipIsMouseInCanvas);
  }

  addText(layer) {
    this.startText = (e) => {
      this.mouseDownVector = {
        x: e.offsetX,
        y: e.offsetY,
      };
      // setup text-box
      var element = document.createElement("div");
      element.className = "text-box";
      element.innerText = "Lorem";
      element.contentEditable = true;
      element.style.top = e.offsetY + "px";
      element.style.left = e.offsetX + "px";

      canvasDiv.appendChild(element);
      element = document.querySelector(".text-box");

      // autofocus and select the text-box
      setTimeout(function () {
        element.focus();
        window.getSelection().selectAllChildren(element);
      }, 0);

      document.removeEventListener("mousedown", this.startText);

      element.addEventListener("keydown", (keydownEvent) => {
        if (keydownEvent.key === "Enter") {
          this.endText();
        }
      });
    };

    this.endText = () => {
      let textBoxDiv = document.querySelector("[contenteditable]");
      let textContent = textBoxDiv.textContent;
      let newTextLayer = this.addNewLayerCallback();
      newTextLayer.ctx.fillStyle = "black";
      newTextLayer.ctx.font = "35px Arial";
      newTextLayer.ctx.textBaseline = "hanging";
      newTextLayer.ctx.fillText(
        textContent,
        this.mouseDownVector.x,
        this.mouseDownVector.y
      );
      textBoxDiv.remove();
    };

    document.addEventListener("mousedown", this.startText);

    canvasDiv.addEventListener("mouseenter", this.flipIsMouseInCanvas);

    canvasDiv.addEventListener("mouseout", this.flipIsMouseInCanvas);
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
