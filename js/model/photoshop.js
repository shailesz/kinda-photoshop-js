import { LayerManager } from "./layer_manager.js";
import { ToolManager } from "./tool_manager.js";

export class Photoshop {
  constructor() {
    this.layerManager = new LayerManager("../../images/2.png");
    this.toolManager = new ToolManager();

    var cb = (previousLayer, selectedLayer) => {
      console.log(selectedLayer);
      document.removeEventListener(
        "mousedown",
        this.toolManager.brushTool.startDraw
      );
      
    // brush tool with white color for now
    this.toolManager.brushTool.brush(selectedLayer);
    };

    this.layerManager.addLayer(this.layerManager.backgroundLayer, cb);

    // eraser tool
    // this.toolManager.eraserTool.erase(this.layerManager.selectedLayer);

    // move tool
    // this.toolManager.moveTool.move(this.layerManager.selectedLayer);

    // eyedropper tool
    // this.toolManager.eyedropperTool.eyedrop(canvasDiv);

    // brush tool with white color for now
    this.toolManager.brushTool.brush(this.layerManager.selectedLayer);

    // naya layer add garne thau ho yo chai
    addLayerButton.addEventListener("click", () => {
      this.layerManager.addLayer(null, cb);
      this.update();
    });

    // delete garne thau ho yo chai
    removeLayerButton.addEventListener("click", () => {
      // this.layerManager.removeLayer();
      console.log(this.layerManager.selectedLayer);
    });

    // this.update();
  }

  update() {
    // brush tool with white color for now
    this.toolManager.brushTool.brush(this.layerManager.selectedLayer);
  }
}
