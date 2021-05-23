import { MoveTool, BrushTool, EraserTool, EyedropperTool } from "./tools.js";

export class ToolManager {
  constructor(callback) {
    this.myTools = [];
    this.callback = callback;
    // let moveToolElement = document.querySelector(".tools>li");
    // moveToolElement.id = "selected-tool";

    this.moveTool = this.pushTool(new MoveTool());
    this.brushTool = this.pushTool(new BrushTool());
    this.eraserTool = this.pushTool(new EraserTool());
    this.eyedropperTool = this.pushTool(new EyedropperTool());

    this.selectedTool = this.moveTool;

    this.generateToolBox();
  }

  selectTool(tool) {
    // console.log(tool);
    this.selectedTool = tool;
  }

  pushTool(tool) {
    this.myTools.push(tool);
    return tool;
  }

  generateTool(tool) {
    // creating li for tool
    var newTool = document.createElement("li");
    // creating img for tool
    var newIcon = document.createElement("img");
    newIcon.classList.add(tool.class);
    newIcon.src = tool.toolboxImgSrc;
    newIcon.alt = tool.altText;

    // appending items
    newTool.appendChild(newIcon);

    // callback for when tool selected
    newTool.addEventListener("click", () => {
      // this.selectTool(tool);
      this.callback(tool);
    });

    // append tool to toolbox
    toolbox.appendChild(newTool);
  }

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
