import { LayerManager } from "./layer_manager.js";
import { ToolManager } from "./tool_manager.js";

export class Photoshop {
  constructor() {
    let toolCallback = (tool) => {
      // deactivate previous tool
      this.toolManager.selectedTool.deactivate(this.layerManager.selectedLayer);

      // select new tool
      this.toolManager.selectTool(tool);

      // activate new tool
      this.toolManager.selectedTool.activate(this.layerManager.selectedLayer);
    };

    let addLayerCallback = (previousLayer, selectedLayer) => {
      // deactivate tool for previous layer
      this.toolManager.selectedTool.deactivate(previousLayer);

      // activate tool for new layer
      this.toolManager.selectedTool.activate(selectedLayer);
    };

    let addNewLayer = () => {
      this.layerManager.addLayer(null, addLayerCallback);

      return this.layerManager.selectedLayer;
    };

    // creating layer manager and tool manager
    this.layerManager = new LayerManager("../../images/2.png");
    this.toolManager = new ToolManager(toolCallback, addNewLayer);

    // add first layer an select it
    this.layerManager.addLayer(
      this.layerManager.backgroundLayer,
      addLayerCallback
    );

    // select a tool, this activates the tool
    this.toolManager.selectedTool.activate(this.layerManager.selectedLayer);

    // this.toolManager.selectedTool.select(this.layerManager.selectedLayer);

    // naya layer add garne thau ho yo chai
    addLayerButton.addEventListener("click", () => {
      addNewLayer();
    });

    // delete garne thau ho yo chai
    removeLayerButton.addEventListener("click", () => {
      // this.layerManager.removeLayer();
      console.log(this.layerManager.selectedLayer);
    });
  }

  // tool and layer activator
  activator() {
    this.toolManager.selectedTool.activate(this.layerManager.selectedLayer);
  }

  // tool and layer deactivator
  deactivator() {
    this.toolManager.selectedTool.deactivate(this.layerManager.selectedLayer);
  }
}
