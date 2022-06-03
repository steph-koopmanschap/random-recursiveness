/*
// NAME: White Noise Generator
// CONTRIBUTORS: Steph Koopmanschap
// VERSION: 1.0
*/

//Screen Settings
var ScreenWidth = 800;
var ScreenHeight = 600;
var MainScreen;
var Canvas2D;

var inputElements = document.getElementsByClassName("input");
var outputElement = document.getElementById("out");
outputElement.style.listStyleType = "none"; 

//returns a random integer between min and max
function randIntRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function startIterating(iter=50, seed=[0, ScreenWidth]) {
    let randNumbers = seed;

    for(let i = 0; i < iter; i++)
    {
        //Create 2 random numbers
        randNumbers = [randIntRange(randNumbers[0], randNumbers[1]), randIntRange(randNumbers[0], randNumbers[1])];
        //re-order random numbers so lowest generated random number is always first.
        if (randNumbers[0] > randNumbers[1]) {
            let temp = randNumbers[1];
            randNumbers[1] = randNumbers[0];
            randNumbers[0] = temp;
        }
        //calculate difference between random numbers
        let radius = Math.abs((randNumbers[0] - randNumbers[1]) / 2);

        console.log("--------------------------");
        console.log("Iterating...");
        logWeb("--------------------------");
        logWeb("Iterating...");
        sendOutput(seed, radius, randNumbers, i, iter);

        if (radius < 1.5) {
            console.log("!!!!!!!!!!!!!!!!!!!!!!!");
            console.log("Can't iterate further. Random numbers too small");
            logWeb("!!!!!!!!!!!!!!!!!!!!!!!");
            logWeb("Can't iterate further. Random numbers too small");
            sendOutput(seed, radius, randNumbers, i, iter);

            return 0;
        }
        //draw a circle at x, y  which is the random numbers with a radius that is the half the distance of the numbers
        let x = randNumbers[0];
        let y = randNumbers[1];
        //force drawing inside of screen
        if (x > ScreenWidth) {
            x = ScreenWidth;
        }
        if (x < 0) {
            x = 0;
        }
        if (y < 0) {
            y = 0;
        }
        
        Canvas2D.strokeStyle = "white";
        Canvas2D.beginPath();
        Canvas2D.arc(x, y, radius, 0, 2 * Math.PI);
        Canvas2D.stroke();
        Canvas2D.closePath();
    }
}

function sendOutput(seed, radius, randNumbers, i, iter) {
    let leftover = iter-i;
    console.log("Initial seed: " + seed);
    console.log("Radius: " + radius);
    console.log("Current random numbers: " + randNumbers);
    console.log("Current iteration: " + i);
    console.log("Iterations left over: " + leftover);

    logWeb("Initial seed: " + seed);
    logWeb("Radius: " + radius);
    logWeb("Current random numbers: " + randNumbers);
    logWeb("Current iteration: " + i);
    logWeb("Iterations left over: " + leftover);
}

//Add "Console" functionality to web page
function logWeb(text) {
    let newLine = document.createElement("li");
    newLine.innerHTML = text;
    outputElement.appendChild(newLine);
}

function clearLogWeb() {
    for(let i = 0; i < outputElement.children.length; i++) {
        outputElement.children[i].remove();
    }
}

function clearCanvas() {
    Canvas2D.fillStyle = "black";
    Canvas2D.clearRect(0, 0, ScreenWidth, ScreenHeight);
}

function getInput() {
    //Clear the screen of the previous iterations
    clearCanvas();
    //Clear the log of the previous iterations
    clearLogWeb();

    let minimum = parseInt(inputElements[0].value);
    let maximum = parseInt(inputElements[1].value);
    let iter = parseInt(inputElements[2].value);

    console.log("Selected inputs: ");
    console.log("min: " + minimum);
    console.log("max: " + maximum);
    console.log("iterations: " + iter);
    console.log("====================");

    logWeb("Selected inputs: ");
    logWeb("min: " + minimum);
    logWeb("max: " + maximum);
    logWeb("iterations: " + iter);
    logWeb("====================");

    startIterating(iter, [minimum, maximum]);
}

//Initialize Screen
function initScreen() {
    //create the screen
    MainScreen = document.createElement("canvas");
    MainScreen.width = ScreenWidth;
    MainScreen.height = ScreenHeight;
    MainScreen.style.margin = "10px";
    MainScreen.style.border = "4px solid orange";
    MainScreen.style.backgroundColor = "black";
    Canvas2D = MainScreen.getContext("2d");
    document.body.insertBefore(MainScreen, document.body.childNodes[3]);
}

initScreen();

//Event listeners
//document.getElementById("startBtn").addEventListener('onclick', getInput());

