//Jai 



let bmw;
let House;
let sunColor = [255, 204, 0];
let lastSunTime = 0;
let sunInterval = 3000; // 3 seconds
let sunSize = 80;

function preload() {
  // Load images from data folder
  carImg = loadImage("data/bmw.webp");    // put a car image in your data folder
  houseImg = loadImage("data/House.webp"); // put a house image in your data folder
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textSize(24);
  textAlign(CENTER, CENTER);
}

function draw() {
  background(135, 206, 235); // sky blue

  // Timed event: sun pulsates every 3 seconds
  if (millis() - lastSunTime > sunInterval) {
    lastSunTime = millis();
    sunSize = random(60, 120);
  }

  // Draw sun
  fill(sunColor);
  noStroke();
  ellipse(width - 100, 100, sunSize);

  // Draw house
  imageMode(CENTER);
  image(houseImg, width / 2, height / 2 + 50, 200, 200);

  // Conditional statement: car changes color if on left or right half
  if (mouseX < width / 2) {
    tint(255, 0, 0); // red car
  } else {
    tint(0, 255, 0); // green car
  }

  // Draw car at mouse horizontal position, fixed vertical
  image(carImg, mouseX, height - 100, 150, 75);

  // Display instructions
  fill(0);
  noTint();
  text("Move your mouse to drive the car. Press 'h' to change house color.", width / 2, 50);
}

// Change house color when 'h' is pressed
function keyPressed() {
  if (key === 'h' || key === 'H') {
    houseImg.filter(INVERT); // simple effect to change house color
  }
}

// Make canvas responsive
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}