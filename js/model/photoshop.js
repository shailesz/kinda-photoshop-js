import { LayerManager } from "./layer_manager.js";
import { ToolManager } from "./tool_manager.js";

export class Photoshop {
  constructor() {
    this.toolCallback = (tool) => {
      // deactivate previous tool
      this.toolManager.selectedTool.deactivate(this.layerManager.selectedLayer);

      // select new tool
      this.toolManager.selectTool(tool);

      // activate new tool
      this.toolManager.selectedTool.activate(this.layerManager.selectedLayer);
    };

    this.addLayerCallback = (previousLayer, selectedLayer) => {
      // deactivate tool for previous layer
      this.toolManager.selectedTool.deactivate(previousLayer);

      // activate tool for new layer
      this.toolManager.selectedTool.activate(selectedLayer);
    };

    // creating layer manager and tool manager
    this.layerManager = new LayerManager();
    this.toolManager = new ToolManager(this.toolCallback, this.addNewLayer);

    // add first layer an select it
    this.layerManager.addLayer(
      this.layerManager.backgroundLayer,
      this.addLayerCallback
    );

    // select a tool, this activates the tool
    this.toolManager.selectedTool.activate(this.layerManager.selectedLayer);
    // this.toolManager.resizeTool.activate(this.layerManager.selectedLayer);

    this.uiButtons();

    // naya layer add garne thau ho yo chai
    addLayerButton.addEventListener("click", () => {
      let oldLayer = this.addNewLayer();
      this.addLayerCallback(oldLayer, this.layerManager.selectedLayer);
    });

    // delete garne thau ho yo chai
    removeLayerButton.addEventListener("click", () => {
      // this.layerManager.removeLayer();
      // console.log(this.layerManager.selectedLayer);

      // TODO: resize tool
      // this.toolCallback(this.toolManager.resizeTool);

      // TODO: rotate tool
      // this.toolCallback(this.toolManager.rotateTool)

      this.toolManager.ExportTool.export(this.layerManager.myLayers);
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

  addNewLayer(layer = null) {
    this.layerManager.addLayer(layer, this.addLayerCallback);

    return this.layerManager.selectedLayer;
  }

  uiButtons() {
    // ui ko components here
    let showDropdown = (selector) => {
      let dropdown = document.querySelector(selector);

      if (dropdown.className === "menu-option-dropdown lsn") {
        dropdown.className += " show";
      } else {
        dropdown.className = "menu-option-dropdown lsn";
      }
    };

    let openImage = () => {
      // file ko
      let fileButton = document.querySelector("#file-button");
      let newButton = document.querySelector("#file-button-dropdown-new");
      let openInput = document.querySelector("#file-open-input");

      // trying to open files

      // dropdown for file
      fileButton.addEventListener("click", () => {
        showDropdown("#file-button-dropdown");
      });

      newButton.addEventListener("click", () => {});

      // openInput
      openInput.addEventListener(
        "change",
        (e) => {
          const reader = new FileReader();

          reader.onload = () => {
            console.log(reader.result);
            image.src = reader.result;
            ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
            console.log(image.src);
          };
          reader.readAsDataURL(openInput.files[0]);
          console.log(openInput.files[0]);
        },
        false
      );
    };

    let insertImage = () => {
      // image ko
      let imageButton = document.querySelector("#image-button");
      let imageDropdown = document.querySelector("#image-button-dropdown");
      let insertInput = document.querySelector("#image-insert-input");

      imageDropdown.style.left =
        imageButton.getBoundingClientRect().left + "px";

      imageButton.addEventListener("click", () => {
        showDropdown("#image-button-dropdown");
      });

      // insertInput
      insertInput.addEventListener(
        "change",
        (e) => {
          let reader = new FileReader();

          reader.onloadend = () => {
            this.addNewLayer(reader.result);
          };
          reader.readAsDataURL(insertInput.files[0]);
        },
        false
      );
    };

    let resizeImage = () => {
      resizeButton.addEventListener("click", () => {
        this.toolCallback(this.toolManager.resizeTool);
      });
    };

    openImage();
    insertImage();
    resizeImage();
  }
}
