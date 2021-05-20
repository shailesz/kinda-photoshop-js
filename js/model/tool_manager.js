import { MoveTool, BrushTool, EraserTool } from "./tools.js";

export class ToolManager {
  constructor() {
    this.moveTool = new MoveTool();
    this.brushTool = new BrushTool();
    this.eraserTool = new EraserTool();
    this.selectedTool = this.eraserTool;
  }
}
