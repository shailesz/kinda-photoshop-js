import { LayerManager } from "./layer_manager.js";
import { ToolManager } from "./tool_manager.js";

export class Photoshop {
  constructor() {
    this.toolCallback = (tool) => {
      // deactivate previous tool
      this.toolManager.selectedTool.deactivate(this.layerManager.selectedLayer);

      // select new tool
      this.toolManager.selectTool(tool);

      if (this.toolManager.selectedTool == this.toolManager.eyedropperTool) {
        // activate eyedropper tool
        this.toolManager.selectedTool.activate(this.layerManager.myLayers);
      } else {
        // activate new tool
        this.toolManager.selectedTool.activate(this.layerManager.selectedLayer);
      }
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

      // TODO: export tool
      this.toolManager.ExportTool.export(this.layerManager.myLayers);
    });

    this.colorSelectorGradient();
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

  colorSelectorGradient() {
    let ctx = colorSelectorGradientCanvas.getContext("2d");
    let sliderCtx = colorSelectorGradientSliderCanvas.getContext("2d");
    let colorSelectorGradientColor = this.toolManager.brushTool.color;
    let mouseLocationGetter = (e, element) => {
      return {
        x: e.clientX - element.getBoundingClientRect().left,
        y: e.clientY - element.getBoundingClientRect().top,
      };
    };
    let updateGradient = () => {
      ctx.clearRect(
        0,
        0,
        colorSelectorGradientCanvas.width,
        colorSelectorGradientCanvas.height
      );
      let gradient1 = ctx.createLinearGradient(
        0,
        0,
        colorSelectorGradientCanvas.width,
        colorSelectorGradientCanvas.height
      );

      let gradient2 = ctx.createLinearGradient(
        0,
        0,
        0,
        colorSelectorGradientCanvas.height
      );

      primarySelectedColor.style.background = this.toolManager.brushTool.color;

      gradient1.addColorStop(0, "white");
      gradient1.addColorStop(1, colorSelectorGradientColor);
      gradient2.addColorStop(0, "transparent");
      gradient2.addColorStop(1, "black");

      ctx.fillStyle = gradient1;
      ctx.fillRect(
        0,
        0,
        colorSelectorGradientCanvas.width,
        colorSelectorGradientCanvas.height
      );

      ctx.fillStyle = gradient2;
      ctx.fillRect(
        0,
        0,
        colorSelectorGradientCanvas.width,
        colorSelectorGradientCanvas.height
      );
      requestAnimationFrame(() => {
        updateGradient();
      });
    };

    let updateGradientSlider = () => {
      sliderCtx.clearRect(
        0,
        0,
        colorSelectorGradientSliderCanvas.width,
        colorSelectorGradientSliderCanvas.height
      );
      let gradient = sliderCtx.createLinearGradient(
        0,
        0,
        colorSelectorGradientSliderCanvas.width,
        colorSelectorGradientSliderCanvas.height
      );

      gradient.addColorStop(0, "red");
      gradient.addColorStop(1 / 6, "orange");
      gradient.addColorStop(2 / 6, "yellow");
      gradient.addColorStop(3 / 6, "green");
      gradient.addColorStop(4 / 6, "blue");
      gradient.addColorStop(5 / 6, "Indigo");
      gradient.addColorStop(1, "violet");

      sliderCtx.fillStyle = gradient;
      sliderCtx.fillRect(
        0,
        0,
        colorSelectorGradientSliderCanvas.width,
        colorSelectorGradientSliderCanvas.height
      );
    };

    let updateColor = (e, canvas) => {
      let mouseDownVector = mouseLocationGetter(e, canvas);
      let ctx = canvas.getContext("2d");
      let pixelData = ctx.getImageData(
        mouseDownVector.x,
        mouseDownVector.y,
        1,
        1
      );

      let color = `rgb(${pixelData.data[0]}, ${pixelData.data[1]}, ${pixelData.data[2]})`;
      if (canvas === colorSelectorGradientSliderCanvas) {
        colorSelectorGradientColor = color;
      } else if (canvas === colorSelectorGradientCanvas) {
        this.toolManager.updatePrimaryColor(color);
      }
    };

    // selector height/width
    colorSelectorGradientCanvas.height =
      colorSelectorGradientCanvas.offsetHeight;
    colorSelectorGradientCanvas.width = colorSelectorGradientCanvas.offsetWidth;

    // slider height/width
    colorSelectorGradientSliderCanvas.height =
      colorSelectorGradientSliderCanvas.offsetHeight;
    colorSelectorGradientSliderCanvas.width =
      colorSelectorGradientSliderCanvas.offsetWidth;

    colorSelectorGradientCanvas.addEventListener("mousedown", (e) => {
      updateColor(e, colorSelectorGradientCanvas);
    });

    colorSelectorGradientSliderCanvas.addEventListener("mousedown", (e) => {
      updateColor(e, colorSelectorGradientSliderCanvas);
    });

    updateGradient();
    updateGradientSlider();
  }
}
