import { Canvas } from "./canvas.js";

/**
 *
 */
export class LayerManager {
  constructor(image) {
    this.myLayers = {};
    this.count = 0;
    this.backgroundLayer = image;
    this.selectedLayer = null;
    this.artboardWidth = null;
    this.artboardHeight = null;
  }

  // currently adding transparent layer
  // also pushing it to this.myLayers
  addLayer(imgData = null, cb) {
    let newLayer = imgData
      ? new Canvas(imgData, false)
      : new Canvas(null, true, this.artboardWidth, this.artboardHeight);

    // setting artboard dimentions
    if (newLayer.image) {
      newLayer.image.addEventListener("load", () => {
        this.artboardWidth = newLayer.calculatedWidth;
        this.artboardHeight = newLayer.calculatedHeight;
      });
    }

    // pushing to object
    newLayer.layerName += this.count;
    this.myLayers[this.count] = newLayer;

    // select the new layer
    this.selectedLayer = newLayer;

    // giving new layer name
    let layersListLi = document.querySelectorAll("#layers-list>li");
    let newElement = document.createElement("li");
    newElement.innerText = newLayer.layerName;

    let manageSelectedEffect = (element) => {
      let getPreviousSelected = document.querySelector("#selected-layer");
      if (getPreviousSelected) {
        getPreviousSelected.removeAttribute("id");
      }
      element.id = "selected-layer";
    };

    manageSelectedEffect(newElement);

    // click on layer to change layer handler
    newElement.addEventListener("click", () => {
      cb(this.selectedLayer, newLayer);
      this.selectedLayer = newLayer;
      manageSelectedEffect(newElement);
    });

    // adding layer to the document
    if (!layersListLi[0]) {
      layersList.appendChild(newElement);
    } else {
      layersList.insertBefore(newElement, layersListLi[0]);
    }

    this.count += 1;
  }

  removeLayer() {
    console.log("remove bhayo yo");
  }

  listLayers() {
    for (let i = 0; i < Object.keys(this.myLayers).length; i++) {
      let layer = this.myLayers[i];
      console.log(layer);
    }
  }
}
