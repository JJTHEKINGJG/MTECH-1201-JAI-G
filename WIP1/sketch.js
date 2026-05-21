/*
Name: Jai Gaston WIP1-JaiG
Title: Traffic Escape - WIP1

Instructions:
- Move your mouse left and right to control the car
- Avoid the enemy cars
- Click the mouse to restart if you crash
*/

let player;
let enemies = [];
let gameOver = false;

function setup() {
  createCanvas(800, 600);

  // player car
  player = new Car(width / 2, 500, 0, 0, 255);

  // enemy cars (start positions)
  enemies.push(new EnemyCar(200, -100, 255, 0, 0));
  enemies.push(new EnemyCar(400, -300, 0, 255, 0));
  enemies.push(new EnemyCar(600, -500, 255, 255, 0));
}

function draw() {

  // sky
  background(135, 206, 235);

  // road
  fill(80);
  rect(150, 0, 500, height);

  // road lines
  stroke(255);
  for (let y = 0; y < height; y += 60) {
    line(width / 2, y, width / 2, y + 30);
  }
  noStroke();

  if (!gameOver) {

    // player
    player.move();
    player.display();

    // enemies
    for (let i = 0; i < enemies.length; i++) {
      enemies[i].move();
      enemies[i].display();

      // collision check
      if (dist(player.x, player.y, enemies[i].x, enemies[i].y) < 60) {
        gameOver = true;
      }
    }

  } else {

    fill(255);
    textAlign(CENTER);
    textSize(40);
    text("GAME OVER", width / 2, height / 2);

    textSize(20);
    text("Click to Restart", width / 2, height / 2 + 50);
  }
}

// PLAYER CAR
class Car {
  constructor(x, y, r, g, b) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.g = g;
    this.b = b;
  }

  move() {
    this.x = mouseX;

    // keep on road
    if (this.x < 200) this.x = 200;
    if (this.x > 600) this.x = 600;
  }

  display() {
    push();
    translate(this.x, this.y);

    fill(this.r, this.g, this.b);
    rect(-40, -20, 80, 40);

    fill(this.r, this.g, this.b);
    rect(-20, -40, 40, 20);

    fill(0);
    circle(-25, 25, 20);
    circle(25, 25, 20);

    pop();
  }
}

// ENEMY CAR
class EnemyCar {
  constructor(x, y, r, g, b) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.g = g;
    this.b = b;

    // FASTER SPEED
    this.speed = random(6, 12);
  }

  move() {
    this.y += this.speed;

    // reset when off screen
    if (this.y > height + 50) {
      this.y = -100;
      this.x = random(200, 600);
    }
  }

  display() {
    push();
    translate(this.x, this.y);

    fill(this.r, this.g, this.b);
    rect(-40, -20, 80, 40);

    fill(this.r, this.g, this.b);
    rect(-20, -40, 40, 20);

    fill(0);
    circle(-25, 25, 20);
    circle(25, 25, 20);

    pop();
  }
}

// restart
function mousePressed() {
  if (gameOver) {
    gameOver = false;

    enemies[0].y = -100;
    enemies[1].y = -300;
    enemies[2].y = -500;
  }
}