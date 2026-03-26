/* 
Name: Jai G
Title: Interactive Worlds – Follow Me Car Project

Instructions:
- Click Mouse to shrink house ( House Scene)
- Click Mouse to reduce amount of stars (Space Scene)
- Click on the menu to choose a scene
- Move your mouse to guide the car (Car Scene)
- Click to change colors
- Press "S" to stop the sun rotation
- Press "G" to start the sun rotation
- Press "M" to return to menu
- Press "R" to restart
*/



// what screen we are on
let state = "menu";
let timer = 0;

// car stuff
let carX;
let carY;
let speed = 0.05;

let r = 255;
let g = 0;
let b = 0;

// sun stuff
let sunAngle = 0;
let sunMoving = true;
let sunR = 255;
let sunG = 204;
let sunB = 0;

// house + space
let houseSize = 1;
let starAmount = 50;

function setup() {
  createCanvas(800, 600);
  carX = width / 2;
  carY = height / 2 + 80;
}

function draw() {

  if (state == "menu") {
    showMenu();
  }

  if (state == "car") {
    showCarScene();
  }

  if (state == "house") {
    showHouseScene();
  }

  if (state == "space") {
    showSpaceScene();
  }

  if (state == "gameOver") {
    showGameOver();
  }
}

// -------- MENU --------
function showMenu() {
  background(50);

  fill(255);
  textSize(36);
  text("Interactive Worlds", 230, 150);

  textSize(20);
  text("Car Scene", 320, 250);
  text("House Scene", 310, 300);
  text("Space Scene", 310, 350);

  text("Click to choose", 300, 450);
}

// -------- CAR SCENE --------
function showCarScene() {
  background(135, 206, 235);
  timer++;

  // sun
  push();
  translate(700, 100);

  if (sunMoving == true) {
    sunAngle = sunAngle + 0.02;
  }

  rotate(sunAngle);

  fill(sunR, sunG, sunB);
  ellipse(0, 0, 120, 120);

  stroke(255);
  line(0, -80, 0, -140);
  line(0, 80, 0, 140);
  line(-80, 0, -140, 0);
  line(80, 0, 140, 0);

  pop();

  // road
  fill(80);
  rect(0, height/2 + 40, width, 120);

  // car follows mouse
  carX = carX + (mouseX - carX) * speed;
  carY = carY + (mouseY - carY) * speed;

  // keep car on road
  carX = constrain(carX, 60, width - 60);
  carY = constrain(carY, height/2 + 60, height/2 + 140);

  drawCar(carX, carY);

  fill(0);
  textSize(16);
  text("Press M for Menu", 20, 20);

  if (timer > 600) {
    state = "gameOver";
  }
}

// -------- HOUSE --------
function showHouseScene() {
  background(180, 220, 180);

  push();
  translate(width/2, height/2);
  scale(houseSize);

  fill(150, 75, 0);
  rect(-100, -50, 200, 150);

  fill(200, 0, 0);
  triangle(-100, -50, 100, -50, 0, -120);

  pop();

  fill(0);
  text("Press M for Menu", 20, 20);
}

// -------- SPACE --------
function showSpaceScene() {
  background(0);

  for (let i = 0; i < starAmount; i++) {
    let x = random(width);
    let y = random(height);
    fill(255);
    circle(x, y, 3);
  }

  fill(255);
  text("Press M for Menu", 20, 20);
}

// -------- GAME OVER --------
function showGameOver() {
  background(0);

  fill(255, 0, 0);
  textSize(40);
  text("Game Over", 260, 250);

  fill(255);
  textSize(20);
  text("Press R to Restart", 260, 300);
}

// -------- DRAW CAR --------
function drawCar(x, y) {
  push();
  translate(x, y);

  fill(r, g, b);
  rect(-50, -20, 100, 40);

  fill(r - 50, g, b);
  rect(-25, -40, 50, 25);

  fill(0);
  ellipse(-30, 25, 30);
  ellipse(30, 25, 30);

  stroke(255);

  // rims
  line(-30, 25, -30, 10);
  line(-30, 25, -20, 20);
  line(-30, 25, -40, 20);
  line(-30, 25, -20, 30);
  line(-30, 25, -40, 30);

  line(30, 25, 30, 10);
  line(30, 25, 40, 20);
  line(30, 25, 20, 20);
  line(30, 25, 40, 30);
  line(30, 25, 20, 30);

  pop();
}

// -------- MOUSE --------
function mousePressed() {

  // menu clicks
  if (state == "menu") {
    if (mouseY > 230 && mouseY < 260) {
      state = "car";
      timer = 0;
    }

    else if (mouseY > 280 && mouseY < 310) {
      state = "house";
    }

    else if (mouseY > 330 && mouseY < 360) {
      state = "space";
    }
  }

  // car clicks
  else if (state == "car") {
    r = random(50,255);
    g = random(50,255);
    b = random(50,255);

    sunR = random(200,255);
    sunG = random(150,255);
    sunB = random(0,200);

    speed = speed + 0.02;
  }

  // house clicks (shrink)
  else if (state == "house") {
    houseSize = houseSize - 0.1;

    if (houseSize < 0.3) {
      houseSize = 0.3;
    }
  }

  // space clicks (slower = less stars)
  else if (state == "space") {
    starAmount = starAmount - 5;

    if (starAmount < 10) {
      starAmount = 10;
    }
  }
}

// -------- KEYS --------
function keyPressed() {

  if (key == 'm' || key == 'M') {
    state = "menu";
  }

  if (key == 'r' || key == 'R') {
    resetGame();
  }

  if (key == 's' || key == 'S') {
    sunMoving = false;
  }

  if (key == 'g' || key == 'G') {
    sunMoving = true;
  }
}

// -------- RESET --------
function resetGame() {
  state = "menu";
  timer = 0;
  speed = 0.05;
  houseSize = 1;
  starAmount = 50;
}
