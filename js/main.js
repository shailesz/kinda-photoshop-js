import LayerManager from "./model/layer_manager.js";

var layerManager = new LayerManager("./images/2.png");

newLayerButton.addEventListener("click", () => {
  layerManager.addLayer();
});

// var startLayerWidth = 0;
// var startLayerHeight = 0;

// var startLayer = new Canvas("./images/2.png", false);

// myLayers.push(startLayer);

// console.log(startLayer.calculatedWidth, startLayer.calculatedHeight);

// startLayerWidth = startLayer.getCanvasResolution()[0];
// startLayerHeight = startLayer.getCanvasResolution()[1];

// console.log(startLayerWidth, startLayerHeight);

// var another_layer = new Canvas();

// ui ko components here

// var menuBarFile = document.querySelector("#menu-bar-file");
// var fileButton = document.querySelector("#file-button");
// var newButton = document.querySelector("#file-button-dropdown-new");
// var openButton = document.querySelector("#file-button-dropdown-open");
// var openInput = document.querySelector("#file-open-input");

// trying to open files

// let showDropdown = () => {
//   let dropdown = document.querySelector("#file-button-dropdown");

//   if (dropdown.className === "menu-option-dropdown lsn") {
//     dropdown.className += " show";
//   } else {
//     dropdown.className = "menu-option-dropdown lsn";
//   }
// };

// // dropdown for file
// fileButton.addEventListener("click", showDropdown);

// newButton.addEventListener("click", () => {});

// // openInput
// openInput.addEventListener(
//   "change",
//   (e) => {
//     const reader = new FileReader();

//     reader.onload = () => {
//       console.log(reader.result);
//       image.src = reader.result;
//       ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
//       console.log(image.src);
//     };
//     reader.readAsDataURL(openInput.files[0]);
//     console.log(openInput.files[0]);
//   },
//   false
// );
