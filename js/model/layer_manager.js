import { Canvas } from "./canvas.js";

/**
 *
 */
export class LayerManager {
  constructor(backgroundImageSrc) {
    this.myLayers = {};
    this.count = 0;
    this.backgroundLayer = new Canvas(backgroundImageSrc, false);
    this.selectedLayer = this.backgroundLayer;
  }

  // currently adding transparent layer
  // also pushing it to this.myLayers
  addLayer(layer = null, cb) {
    let newLayer = layer
      ? layer
      : new Canvas(
          null,
          true,
          this.backgroundLayer.calculatedWidth,
          this.backgroundLayer.calculatedHeight
        );

    newLayer.layerName += this.count;
    this.myLayers[this.count] = newLayer;

    this.selectedLayer = newLayer;

    let layersListLi = document.querySelectorAll("#layers-list>li");
    let newElement = document.createElement("li");
    newElement.innerText = newLayer.layerName;

    var manageSelectedEffect = (element) => {
      let getPreviousSelected = document.querySelector("#selected-layer");
      if (getPreviousSelected) {
        getPreviousSelected.removeAttribute("id");
      }
      element.id = "selected-layer";
    };

    manageSelectedEffect(newElement);

    newElement.addEventListener("click", () => {
      cb(this.selectedLayer, newLayer);
      this.selectedLayer = newLayer;
      manageSelectedEffect(newElement);
    });

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
}
