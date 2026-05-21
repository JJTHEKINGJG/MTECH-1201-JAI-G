/*
Name: Jai Gaston
Title: Simple Mouse Pattern

Instructions:
- Move your mouse around
- Click to change the shape
*/

let circles = true;

function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(220);

  // first loop
  for (let x = 50; x < width; x += 50) {

    // second loop
    for (let y = 50; y < height; y += 50) {

      fill(mouseX / 2, mouseY / 2, 150);

      // conditional statement
      if (circles) {
        ellipse(x, y, 30, 30);
      } else {
        rect(x, y, 30, 30);
      }
    }
  }
}

// click changes shapes
function mousePressed() {
  circles = !circles;
}