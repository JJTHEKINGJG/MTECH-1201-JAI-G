/*
Name: Jai Gaston FP-JAIG
Title: Traffic Escape - Final Project

Instructions:
- Move your mouse left and right to control the blue car
- Avoid enemy cars
- Survive as long as possible
- Click to restart after crashing
*/

let player;
let enemies = [];

let gameOver = false;
let score = 0;

let roadLines = [];

function setup() {
  createCanvas(800, 600);

  // player car
  player = new Car(width / 2, 500, 0, 0, 255);

  // enemy cars
  enemies.push(new EnemyCar(250, -100, 255, 0, 0));
  enemies.push(new EnemyCar(400, -300, 0, 255, 0));
  enemies.push(new EnemyCar(550, -500, 255, 255, 0));
  enemies.push(new EnemyCar(320, -700, 255, 100, 0));

  // road line positions
  for (let y = 0; y < height; y += 60) {
    roadLines.push(y);
  }
}

function draw() {

  // SKY
  background(135, 206, 235);

  // SUN
  fill(255, 204, 0);
  circle(700, 100, 100);

  // ROAD
  fill(70);
  rect(150, 0, 500, height);

  // MOVING ROAD LINES
  stroke(255);
  strokeWeight(6);

  for (let i = 0; i < roadLines.length; i++) {

    line(width / 2, roadLines[i], width / 2, roadLines[i] + 30);

    roadLines[i] += 8;

    // restart line at top
    if (roadLines[i] > height) {
      roadLines[i] = -30;
    }
  }

  noStroke();

  // SCORE
  if (!gameOver) {
    score++;
  }

  fill(255);
  textSize(24);
  text("Score: " + score, 20, 40);

  // GAME RUNNING
  if (!gameOver) {

    // player
    player.move();
    player.display();

    // enemy cars
    for (let i = 0; i < enemies.length; i++) {

      enemies[i].move();
      enemies[i].display();

      // collision detection
      if (dist(player.x, player.y, enemies[i].x, enemies[i].y) < 60) {
        gameOver = true;
      }
    }

  } else {

    // GAME OVER SCREEN
    fill(255);
    textAlign(CENTER);

    textSize(50);
    text("GAME OVER", width / 2, height / 2);

    textSize(30);
    text("Final Score: " + score, width / 2, height / 2 + 50);

    textSize(20);
    text("Click to Restart", width / 2, height / 2 + 100);
  }
}

// PLAYER CAR CLASS
class Car {

  constructor(x, y, r, g, b) {

    this.x = x;
    this.y = y;

    this.r = r;
    this.g = g;
    this.b = b;
  }

  move() {

    // follow mouse
    this.x = mouseX;

    // keep on road
    if (this.x < 200) {
      this.x = 200;
    }

    if (this.x > 600) {
      this.x = 600;
    }
  }

  display() {

    push();
    translate(this.x, this.y);

    // car body
    fill(this.r, this.g, this.b);
    rect(-40, -20, 80, 40, 10);

    // car top
    rect(-20, -40, 40, 20, 5);

    // windows
    fill(200);
    rect(-15, -35, 30, 15);

    // wheels
    fill(0);
    circle(-25, 25, 20);
    circle(25, 25, 20);

    pop();
  }
}

// ENEMY CAR CLASS
class EnemyCar {

  constructor(x, y, r, g, b) {

    this.x = x;
    this.y = y;

    this.r = r;
    this.g = g;
    this.b = b;

    this.speed = random(7, 12);
  }

  move() {

    // move downward
    this.y += this.speed;

    // slowly increase difficulty
    this.speed += 0.001;

    // reset enemy
    if (this.y > height + 60) {

      this.y = -100;

      // random lane positions
      let lanes = [250, 400, 550];
      let randomLane = int(random(lanes.length));

      this.x = lanes[randomLane];
    }
  }

  display() {

    push();
    translate(this.x, this.y);

    // body
    fill(this.r, this.g, this.b);
    rect(-40, -20, 80, 40, 10);

    // top
    rect(-20, -40, 40, 20, 5);

    // windows
    fill(200);
    rect(-15, -35, 30, 15);

    // wheels
    fill(0);
    circle(-25, 25, 20);
    circle(25, 25, 20);

    pop();
  }
}

// RESTART FUNCTION
function restartGame() {

  gameOver = false;

  score = 0;

  // reset enemies
  enemies[0].y = -100;
  enemies[1].y = -300;
  enemies[2].y = -500;
  enemies[3].y = -700;
}

// CLICK TO RESTART
function mousePressed() {

  if (gameOver) {
    restartGame();
  }
}