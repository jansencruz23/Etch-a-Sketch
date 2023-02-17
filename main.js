const container = document.querySelector("#container");
const squares = document.querySelectorAll("#container div");
const btn = document.querySelector("#btn");
const range = document.querySelector("#range");
const rangeOutput = document.querySelector("#rangeValue");
const reset = document.querySelector(".reset");
const rgb = document.querySelector(".rgb");
const black = document.querySelector(".black");
const color = document.querySelector("#color");

let div = document.createElement("p");
let isRgb = false;
let isCustomColor = false;

range.addEventListener('input', () => {
    rangeOutput.textContent = `${range.value} x ${range.value}`;
    changeDimension(range.value);
});

rgb.addEventListener('click', () => {
    isRgb = true;
    isCustomColor = false;
});

color.addEventListener('change', () => {
    isCustomColor = true;
    isRgb = false;
});

black.addEventListener('click', () => {
    isRgb = false;
    isCustomColor = false;
});

function generateRandomColor(){
    let maxVal = 0xFFFFFF;
    let randomNumber = Math.random() * maxVal;

    randomNumber = Math.floor(randomNumber);
    randomNumber = randomNumber.toString(16);

    let randColor = randomNumber.padStart(6, 0);
    return `#${randColor}`;
}

changeDimension(range.value, "#303030");

reset.addEventListener('click', () => {
    changeDimension(range.value);
});

function changeDimension(cells, color = "#303030"){
    container.innerHTML = "";
    for(let i = 1; i <= (cells * cells); i++){
        const div = document.createElement("div");
        div.style.backgroundColor = "white";
    
        div.addEventListener('mouseover', () => {
            if(isRgb){
                div.style.backgroundColor = generateRandomColor();
            }else{
                div.style.backgroundColor = color;
            }

            if(isCustomColor){
                div.style.backgroundColor = customColor();
            }
            
        });
        container.style.gridTemplateColumns = `repeat(${cells}, 1fr)`;
        container.style.gridTemplateRows = `repeat(${cells}, 1fr)`;
        container.appendChild(div);
    }
}

function customColor() {
    return color.value;
}

function resetDimension() {
    container.innerHTML = "";
}