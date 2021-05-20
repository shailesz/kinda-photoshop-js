import { LayerManager } from "./layer_manager.js";
import { ToolManager } from "./tool_manager.js";

export class Photoshop {
  constructor() {
    this.layerManager = new LayerManager("../images/2.png");
    this.toolManager = new ToolManager();

    // brush tool with white color for now
    // this.toolManager.brushTool.brush(this.layerManager.selectedLayer);

    // eraser tool
    // this.toolManager.eraserTool.erase(this.layerManager.selectedLayer);


    newLayerButton.addEventListener("click", () => {
      this.layerManager.addLayer();
    });
  }
}
