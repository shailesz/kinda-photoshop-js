import * as tool from "./tool";

export default class Toolbar {
  constructor() {
    new tool.MoveTool();
    new tool.BrushTool();
  }
}
