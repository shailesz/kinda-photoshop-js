import { Canvas } from "./canvas.js";

class Tool {
  constructor() {
    this.class = "tools-icon";
    this.isToolActive = false;
  }
}

export class MoveTool extends Tool {
  constructor() {
    super();
    this.toolboxImgSrc = "./images/move.png";
    this.altText = "Move";
  }

  activate(layer) {
    this.move(layer);
  }

  deactivate(layer) {
    layer.canvas.removeEventListener("mousedown", this.startMove);
  }

  move(selectedLayer) {
    let x = 0;
    let y = 0;

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
      let dx = e.clientX - x;
      let dy = e.clientY - y;

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
    this.toolboxImgSrc = "./images/brush.png";
    this.altText = "Brush";
    this.selectionDiv = null;
    this.color = "rgba(255,255,255)";

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
      selectedLayer.ctx.strokeStyle = this.color;
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
    this.toolboxImgSrc = "./images/eraser.png";
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
      selectedLayer.ctx.globalCompositeOperation = "source-over";
      selectedLayer.ctx.strokeStyle = "white";
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
    this.toolboxImgSrc = "./images/selection.png";
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
    let element = document.querySelector(".canvas");
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

      let removeElementCallback = (e) => {
        if (e.key === "Escape") {
          this.selectionDiv.remove();
          document.removeEventListener("keydown", removeElementCallback);
        }
      };

      document.addEventListener("keydown", removeElementCallback);

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
    this.toolboxImgSrc = "./images/text.png";
    this.altText = "Text";
    this.addNewLayerCallback = addNewLayerCallback;
  }

  activate(layer) {
    this.addText(layer);
  }
  deactivate() {
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
      let element = document.createElement("div");
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

      // document.removeEventListener("mousedown", this.startText);

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

export class ResizeTool {
  constructor() {}

  activate(layer) {
    this.resize(layer);
    layer.canvas.className = "resize";
  }

  deactivate() {}

  resize(layer) {
    let element = canvasDiv;

    let canvasSize = {
      width: layer.canvas.offsetWidth,
      height: layer.canvas.offsetHeight,
    };

    let mouseDownVector = {
      x: 0,
      y: 0,
    };

    let isTouchingBorder = (x, y) => {
      if (
        (y >= 0 && y <= 10) ||
        (y >= canvasSize.height - 10 && y <= canvasSize.height) ||
        (x >= 0 && x <= 10) ||
        (x >= canvasSize.width - 10 && x <= canvasSize.width)
      ) {
        return true;
      }
      return false;
    };

    let mouseLocationGetter = (e) => {
      return {
        x: e.clientX - element.getBoundingClientRect().left,
        y: e.clientY - element.getBoundingClientRect().top,
      };
    };

    this.startResize = async (e) => {
      mouseDownVector = mouseLocationGetter(e);

      if (isTouchingBorder(mouseDownVector.x, mouseDownVector.y)) {
        document.addEventListener("mouseup", this.endResize);
        document.addEventListener("mousemove", this.resizeActive);
      }

      layer.imageData = layer.ctx.getImageData(
        0,
        0,
        canvasSize.width,
        canvasSize.height
      );

      layer.bitmap = await createImageBitmap(layer.imageData);
    };

    this.endResize = (e) => {
      document.removeEventListener("mouseup", this.endResize);
      document.removeEventListener("mousemove", this.resizeActive);
      document.removeEventListener("mousedown", this.startResize);
    };

    this.resizeActive = (e) => {
      let mouseXY = mouseLocationGetter(e);
      layer.canvas.className = "";
      layer.resize(mouseDownVector, mouseXY.x, mouseXY.y);
    };

    document.addEventListener("mousedown", this.startResize);
  }
}

export class RotateTool {
  constructor() {}

  activate(layer) {
    this.rotate(layer);
  }
  deactivate() {}

  rotate(layer) {
    let element = canvasDiv;

    let canvasSize = {
      width: layer.canvas.offsetWidth,
      height: layer.canvas.offsetHeight,
    };

    let mouseDownVector = {
      x: 0,
      y: 0,
    };

    let mouseLocationGetter = (e) => {
      return {
        x: e.clientX - element.getBoundingClientRect().left,
        y: e.clientY - element.getBoundingClientRect().top,
      };
    };

    let isTouchingBorder = (x, y) => {
      if (
        (y >= 0 && y <= 10) ||
        (y >= canvasSize.height - 10 && y <= canvasSize.height) ||
        (x >= 0 && x <= 10) ||
        (x >= canvasSize.width - 10 && x <= canvasSize.width)
      ) {
        return true;
      }
      return false;
    };

    this.startRotate = async (e) => {
      mouseDownVector = mouseLocationGetter(e);

      if (isTouchingBorder(mouseDownVector.x, mouseDownVector.y)) {
        layer.imageData = layer.ctx.getImageData(
          0,
          0,
          canvasSize.width,
          canvasSize.height
        );

        layer.bitmap = await createImageBitmap(layer.imageData);

        document.addEventListener("mouseup", this.endRotate);
        document.addEventListener("mousemove", this.rotateActive);
      }
    };
    this.endRotate = () => {
      // document.removeEventListener("mousedown", this.startRotate);
      document.removeEventListener("mouseup", this.endRotate);
      document.removeEventListener("mousemove", this.rotateActive);
    };
    this.rotateActive = (e) => {
      let mouseXY = mouseLocationGetter(e);
      layer.rotate(mouseDownVector, mouseXY.x, mouseXY.y);
    };

    document.addEventListener("mousedown", this.startRotate);
  }
}

export class ExportTool {
  constructor() {}
  activate() {}
  deactivate() {}

  static combineLayers(layers) {
    let keys = Object.keys(layers);
    let tempWidth = layers[keys[0]].calculatedWidth;
    let tempHeight = layers[keys[0]].calculatedHeight;
    let tempCanvas = new Canvas(null, true, tempWidth, tempHeight, true);

    for (const key of keys) {
      let tempImageData = layers[key].canvas;
      tempCanvas.ctx.drawImage(tempImageData, 0, 0);
    }
    return tempCanvas;
  }

  export(layers) {
    let tempCanvas = ExportTool.combineLayers(layers);
    let link = document.createElement("a");
    link.download = "image.png";
    link.href = tempCanvas.canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    link.click();
  }
}

export class EyedropperTool extends Tool {
  constructor(updatePrimaryColorCallback) {
    super();
    this.toolboxImgSrc = "./images/eyedropper.png";
    this.altText = "Eyedropper";
    this.updatePrimaryColorCallback = updatePrimaryColorCallback;
  }

  activate(layers) {
    this.eyedrop(layers);
  }
  deactivate() {
    this.endTool();
  }

  eyedrop(layers) {
    let tempImage = ExportTool.combineLayers(layers);
    let element = canvasDiv;

    let mouseLocationGetter = (e) => {
      return {
        x: e.clientX - element.getBoundingClientRect().left,
        y: e.clientY - element.getBoundingClientRect().top,
      };
    };

    this.startTool = (e) => {
      let mouseDownVector = mouseLocationGetter(e);
      let pixelData = tempImage.ctx.getImageData(
        mouseDownVector.x,
        mouseDownVector.y,
        1,
        1
      );

      let color = `rgb(${pixelData.data[0]}, ${pixelData.data[1]}, ${pixelData.data[2]})`;
      this.updatePrimaryColorCallback(color);
      this.deactivate();
    };

    this.endTool = () => {
      document.removeEventListener("mousedown", this.startTool);
    };

    document.addEventListener("mousedown", this.startTool);
  }
}
