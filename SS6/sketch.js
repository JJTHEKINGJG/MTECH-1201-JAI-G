/*
Name: Jai Gaston 
Title: Simple Dot Trail

Instructions:
- Move your mouse
- Left click clears the dots
- Right click changes circle size
*/

let x = [];
let y = [];

let size = 10;

function setup() {
  createCanvas(400, 400);
  background(220);
}

function draw() {

  // add mouse position to arrays
  x.push(mouseX);
  y.push(mouseY);

  // draw dots
  for (let i = 0; i < x.length; i++) {

    fill(0);
    circle(x[i], y[i], size);

  }

  // keep only 50 dots
  if (x.length > 50) {
    x.shift();
    y.shift();
  }
}

// left click clears screen
function mousePressed() {

  if (mouseButton === LEFT) {
    background(220);

    x = [];
    y = [];
  }

  // right click changes size
  if (mouseButton === RIGHT) {
    size = random(5, 50);
  }
}

// stops right click menu
function contextMenu() {
  return false;
}
