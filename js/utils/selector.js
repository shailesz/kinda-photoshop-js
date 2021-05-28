var canvasDiv = document.querySelector(".canvas");
var canvasDivHolder = document.querySelector(".canvas-holder");
var addLayerButton = document.querySelector("#add-layer");
var removeLayerButton = document.querySelector("#remove-layer");
var body = document.querySelector("body");

var layersList = document.querySelector("#layers-list");

// selecting toolbox
var toolbox = document.querySelector(".tools");

var canvasElement = document.querySelector("canvas");

var resizeButton = document.querySelector("#image-button-resize");

var colorSelectorGradientCanvas = document.querySelector(
  "#color-selector-gradient"
);
var primarySelectedColor = document.querySelector(".primary-selected-color");
var colorSelectorGradientSliderCanvas = document.querySelector(
  ".color-selector-slider"
);

console.log(colorSelectorGradientSliderCanvas);