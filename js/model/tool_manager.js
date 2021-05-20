import { MoveTool, BrushTool, EraserTool, EyedropperTool } from "./tools.js";

export class ToolManager {
  constructor() {
    this.moveTool = new MoveTool();
    this.brushTool = new BrushTool();
    this.eraserTool = new EraserTool();
    this.eyedropperTool = new EyedropperTool();

    this.selectedTool = this.moveTool;
  }
}
