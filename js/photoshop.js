var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");

var canvasDiv = document.querySelector(".canvas");
var canvasDivHolder = document.querySelector(".canvas-holder");
var menuBarFile = document.querySelector("#menu-bar-file");
var fileButton = document.querySelector("#file-button");
var newButton = document.querySelector("#file-button-dropdown-new");
var openButton = document.querySelector("#file-button-dropdown-open");
var openInput = document.querySelector("#file-open-input");
canvasDiv.appendChild(canvas);

canvas.offsetTop = 0;
canvas.offsetLeft = 0;

var image = new Image();
// image.src = "./images/2.png";
image.onload = () => {
  // taking image ko height width
  var imageWidth = image.width;
  var imageHeight = image.height;

  // finding ratio
  var imageRatio = imageWidth / imageHeight;

  // finding canvas ko resolution
  var calculatedWidth = (canvasDivHolder.clientWidth * 0.9).toFixed(0); // covering 90% of the canvas holder
  var calculatedHeight = (calculatedWidth / imageRatio).toFixed(0); // image ratio anusar

  // setting canvas-div ko widthharu
  canvasDiv.setAttribute(
    "style",
    `height: ${calculatedHeight}px; width: ${calculatedWidth}px;`
  );

  // setting canvas ko width haru
  canvas.width = calculatedWidth;
  canvas.height = calculatedHeight;

  console.log("image ko: ", image.width, image.height);
  console.log("calculated ko: ", calculatedWidth, calculatedHeight);
  console.log("canvas ko:", canvas.width, canvas.height);
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
};

// trying to open files
let showDropdown = () => {
  let dropdown = document.querySelector("#file-button-dropdown");

  if (dropdown.className === "menu-option-dropdown lsn") {
    dropdown.className += " show";
  } else {
    dropdown.className = "menu-option-dropdown lsn";
  }
};

// dropdown for file
fileButton.addEventListener("click", showDropdown);

newButton.addEventListener("click", () => {

});

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
