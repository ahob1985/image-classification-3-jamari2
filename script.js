// Author: Aaron Hobson

// Global UI Variables
let canvasDiv;
let canvas;
let textDiv;
let textP;

// Global ML Variables
let mobilenet;
let video;
let isModelReady;

function setup() {
  // create UI
  canvasDiv = createDiv();
  canvas = createCanvas(640, 480);
  canvas.parent(canvasDiv);
  textDiv = createDiv();
  textP = createP("Model leading, please wait...");
  textP.parent(textDiv);
  // begin capturing webcam video 
  video = createCapture(VIDEO);
  video.style("display", "none");
  // initialize ml variables 
  isModelReady = false;
  mobilenet = ml5.imageClassifier("MobileNet", modelReady);
}

function draw() {
  image(video, 0, 0);
  if(isModelReady) {
    mobilenet.classify(canvas, gotResults);
  }
}

function modelReady() {
  isModelReady = true;
}

function gotResults(error, results) {
  if(error) {
    console.error(error);
  } else {
    let label = results[0].label;
    let confidence = round(results[0].confidence, 2);
    textP.html("Label: " + label + " - Confidence: " + confidence);
  }
}
