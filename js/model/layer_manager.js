import { Canvas } from "./canvas.js";

/**
 *
 */
export class LayerManager {
  constructor(backgroundImageSrc) {
    this.myLayers = [];
    this.backgroundLayer = new Canvas(backgroundImageSrc, false);

    // pushing background layer to myLayers
    this.myLayers.push(this.backgroundLayer);

    this.selectedLayer = this.backgroundLayer;
    this.setup();
  }

  // currently adding transparent layer
  // also pushing it to this.myLayers
  addLayer() {
    this.myLayers.push(
      new Canvas(
        null,
        true,
        this.backgroundLayer.calculatedWidth,
        this.backgroundLayer.calculatedHeight
      )
    );
  }

  deleteLayer() {}

  convertToElement(layer) {
    // append lai yo 
    // let element = document.createElement("li");
    // element.innerText = "2";
    // layersList.appendChild(element);
    // layerLi = document.querySelectorAll("#layers-list>li");

    // insertbefore lai yo
    // let element2 = document.createElement("li");
    // element2.innerText = "1";
    // layersList.insertBefore(element2, layerLi[0]);
    // layerLi = document.querySelectorAll("#layers-list>li");


    // let element = document.createElement("li");
    // element.innerText = "1";
    // layersList.appendChild(element);
    // var layerLi = document.querySelector("#layers-list>li");
    // element.innerText = layer.layerName;
    return element;
  }

  setup() {
    this.update();
  }

  update() {
    for (let layer of this.myLayers) {
      // layerList.appendChild(this.convertToElement());
    }
    requestAnimationFrame(() => this.update());
  }
}
