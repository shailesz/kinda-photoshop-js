let canvasDiv = document.querySelector(".canvas");
let canvasDivHolder = document.querySelector(".canvas-holder");
let addLayerButton = document.querySelector("#add-layer");
let removeLayerButton = document.querySelector("#remove-layer");
let body = document.querySelector("body");

let layersList = document.querySelector("#layers-list");

// selecting toolbox
let toolbox = document.querySelector(".tools");

let canvasElement = document.querySelector("canvas");

let colorSelectorGradientCanvas = document.querySelector(
  "#color-selector-gradient"
);
let primarySelectedColor = document.querySelector(".primary-selected-color");
let colorSelectorGradientSliderCanvas = document.querySelector(
  ".color-selector-slider"
);

let saveButton = document.querySelector("#save-image");
let resizeButton = document.querySelector("#image-button-resize");
let rotateButton = document.querySelector("#image-button-rotate");
