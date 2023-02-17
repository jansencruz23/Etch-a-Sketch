const mildBlack = "#303030";

//#region --selecting HTML elements
const container = document.querySelector("#container");
const squares = document.querySelectorAll("#container div");
const btn = document.querySelector("#btn");
const range = document.querySelector("#range");
const rangeOutput = document.querySelector("#rangeValue");
const reset = document.querySelector(".reset");
const rgb = document.querySelector(".rgb");
const black = document.querySelector(".black");
const color = document.querySelector("#color");
const eraser = document.querySelector(".eraser");
//#endregion

let div = document.createElement("p");
let isRgb = false;
let isCustomColor = false;
let isEraser = false;

//starting point
changeDimension(range.value, mildBlack);

//event for choosing a custom color
color.addEventListener('input', () => {
    isCustomColor = true;
    isRgb = false;
    isEraser = false;
    color.style.backgroundColor = color.value;
});

//event for clicking the black button
black.addEventListener('click', () => {
    isRgb = false;
    isCustomColor = false;
    isEraser = false;
    rgb.classList.remove("selected");
    black.classList.add("selected");
    eraser.classList.remove("selected");
    color.value = mildBlack;
    color.style.backgroundColor = mildBlack;
});

//eventt after clicking rbg button
rgb.addEventListener('click', () => {
    isRgb = true;
    isCustomColor = false;
    isEraser = false;
    rgb.classList.add("selected");
    black.classList.remove("selected");
    eraser.classList.remove("selected");
});

//event for the eraser button
eraser.addEventListener('click', () => {
    isEraser = true;
    isRgb = false;
    isCustomColor = false;
    rgb.classList.remove("selected");
    black.classList.remove("selected");
    eraser.classList.add("selected");
    color.value = "#ffffff";
    color.style.backgroundColor = "white";
});

//event for resetting the grid
reset.addEventListener('click', () => {
    changeDimension(range.value);
    color.style.backgroundColor = mildBlack;
    color.value = mildBlack;
});

//event in changing the range slider
range.addEventListener('input', () => {
    rangeOutput.textContent = `${range.value} x ${range.value}`;
    changeDimension(range.value);
});

//function for getting the chosen custom color
function customColor() {
    return color.value;
}

//function for generating a random color
function generateRandomColor(){
    let maxVal = 0xFFFFFF;
    let randomNumber = Math.random() * maxVal;

    randomNumber = Math.floor(randomNumber);
    randomNumber = randomNumber.toString(16);

    let randColor = randomNumber.padStart(6, 0);
    return `#${randColor}`;
}

//function for changing the number of rows and columns in the grid
function changeDimension(cells, cellColor = mildBlack){
    container.innerHTML = "";
    for(let i = 1; i <= (cells * cells); i++){
        const div = document.createElement("div");
        div.style.backgroundColor = "white";
    
        div.addEventListener('mouseover', () => {
            if(isRgb){
                let custColor = generateRandomColor();
                div.style.backgroundColor = custColor;
                color.style.backgroundColor = custColor;
                color.value = custColor;
            }
            else if(isEraser)
                div.style.backgroundColor = "white";
            else if(isCustomColor)
                div.style.backgroundColor = customColor();
            else
                div.style.backgroundColor = cellColor;
        });
        container.style.gridTemplateColumns = `repeat(${cells}, 1fr)`;
        container.style.gridTemplateRows = `repeat(${cells}, 1fr)`;
        container.appendChild(div);
    }
}