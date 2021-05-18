import Canvas from "./model/canvas.js";

var layer = new Canvas();

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

