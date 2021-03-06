import {
  MoveTool,
  BrushTool,
  EraserTool,
  SelectionTool,
  EyedropperTool,
  TextTool,
  ResizeTool,
  RotateTool,
  ExportTool,
} from "./tools.js";

export class ToolManager {
  constructor(callback, addNewLayerCallback) {
    this.myTools = [];
    this.callback = callback; // TODO: refactor this callback name
    this.addNewLayerCallback = addNewLayerCallback;
    let updatePrimaryColorCallback = (color) => {
      this.updatePrimaryColor(color);
    };

    this.brushTool = this.pushTool(new BrushTool());
    this.eraserTool = this.pushTool(new EraserTool());
    this.moveTool = this.pushTool(new MoveTool());
    this.selectionTool = this.pushTool(new SelectionTool());
    this.eyedropperTool = this.pushTool(
      new EyedropperTool(updatePrimaryColorCallback)
    );
    this.textTool = this.pushTool(new TextTool(this.addNewLayerCallback));
    this.resizeTool = new ResizeTool();
    this.rotateTool = new RotateTool();
    this.ExportTool = new ExportTool();

    this.selectedTool = this.brushTool;

    this.generateToolBox();
  }

  // change selected tool
  selectTool(tool) {
    this.selectedTool = tool;
  }

  updatePrimaryColor(color) {
    this.brushTool.color = color;
  }

  /*
   *  takes tool and pushes it to myArray and returns the tool
   */
  pushTool(tool) {
    this.myTools.push(tool);
    return tool;
  }

  /**
   *
   * @param {tool} tool to be added in the toolbox
   *
   * generate tool with event listeners
   */
  generateTool(tool) {
    // creating li for tool
    let newTool = document.createElement("li");
    // creating img for tool
    let newIcon = document.createElement("img");
    newIcon.classList.add(tool.class);
    newIcon.src = tool.toolboxImgSrc;
    newIcon.alt = tool.altText;

    // appending items
    newTool.appendChild(newIcon);

    // callback for when tool selected
    newTool.addEventListener("click", () => {
      // remove id of deactivated tool
      let temp = document.querySelector("#selected-tool");
      temp.removeAttribute("id");

      // add id of activated tool
      newTool.setAttribute("id", "selected-tool");
      this.callback(tool);
    });

    // append tool to toolbox
    toolbox.appendChild(newTool);
  }

  /**
   *  generates toolbox UI
   */
  generateToolBox() {
    for (let tool of this.myTools) {
      this.generateTool(tool);
    }
    let defaultSelectedTool = document.querySelector(".tools>li");
    if (defaultSelectedTool) {
      defaultSelectedTool.id = "selected-tool";
    }
  }
}
