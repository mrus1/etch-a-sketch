let box;
let size;
let defaultSize = true;
let onOf = true;
let container = document.querySelector(".draw-panel");
let btnSize = document.querySelector("#btnSize");
let btnColor = document.querySelector("#btnColor");
let btnReset = document.querySelector("#btnReset");

//changes color on "hover"
container.addEventListener("mouseover", changeColor);

// color switcher button listener
btnColor.addEventListener("click", () => {switchColor()});

// reset button listener
btnReset.addEventListener("click", () => {resetPanel()});

// Set drawing panel dimensions depends on screen size
function calibrate(){
  zeroWidth = document.querySelector('.draw-panel').offsetWidth;
  zeroHeight = window.innerHeight;
  firstWidth = zeroWidth;
  hundred = zeroHeight*0.13;
  firstHeight = zeroHeight - hundred;
};

function createGrid(size){
  calibrate();
  for(let i = 0; i < size; i++){
    //if size = 20, creates 20 empty div's in y (vertical) direction in html under container div
    const y = document.createElement("div");
    y.setAttribute("id", "rowDiv");
    y.classList.add("rows");
    y.style.width = `${firstWidth}px`;
    y.style.height = `${firstHeight / size}px`;
    container.appendChild(y);

    //if size = 20, creates 20 boxes in x (horizontaly) in html under y div
    for(let j = 0; j < size; j++){
      const box = document.createElement('div');
      box.setAttribute('id', 'innerBox');
      box.classList.add('box');
      //width and height must be the same number as container in style.css!!!
      box.style.width = `${firstWidth / size}px`;
      box.style.height = `${firstHeight / size}px`;

      y.appendChild(box);
    }
  }
};

//set button for selecting winning score
// btnInput.addEventListener("click",

function checkInput(){
  let inputType = Math.floor(parseInt(prompt("Select New Size: ")));
  if(typeof inputType == "number" && 151 > inputType && inputType > 0){
    return inputType;
  } else {
    alert("Next time try a NUMBER from 1 to 150.")
  }
};

//size of colored squares
function getSize() {
  if(defaultSize === true){
    let gridAmount = 16;
    size = gridAmount;
    defaultSize = false;
    createGrid(gridAmount);
  } else {
    // gridAmount = prompt("Enter new grid size between 1 and 100: ", 16);
    gridAmount = checkInput();
    size = gridAmount;
    createGrid(gridAmount);
  }
};
// need to run this func to draw starting draw grid
getSize();

//function for changing color on hover
function changeColor(e){
  let target = e.target;
  if(onOf === true){
    target.style.backgroundColor = "black";
  } else {
  // target.style.backgroundColor = getRandomColor();
    target.style.backgroundColor = getRandomColor();
  }
};

// function for color switcher button - from default to random color
function switchColor(){
  if(onOf === true){
    btnColor.setAttribute("style", "background-color: red; border: thick solid blue");
    onOf = false;
  } else {
    btnColor.setAttribute("style", "background-color: #fcf650; border: none");
    // btnColor.style.backgroundColor = "#fcf650";
    // btnColor.style.border = "none"
    onOf = true;
  }
};

//Random color generator
function getRandomColor() {
  function c() {
    var hex = Math.floor(Math.random()*256).toString(16);
    return ("0"+String(hex)).substr(-2); // pad with zero
  }
  return "#"+c()+c()+c();
};



// resets (removes) and builds new penel
function resetPanel(){
  let i = 0;
  while(i < size){
    let rowsDiv = document.querySelector("#rowDiv");
    rowsDiv.remove();
    i++;
  }
  calibrate();
  getSize();
  container.style.backgroundColor = "white";
};
