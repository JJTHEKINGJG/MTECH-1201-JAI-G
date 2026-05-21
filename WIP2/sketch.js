/*
Name: Jai Gaston WIP2-Jai G 
Title: Traffic Escape 

Instructions:
Move mouse left/right to control car
Avoid enemy cars
Click to restart when game over
*/



let player;
let enemies = [];
let gameOver = false;
let score = 0;

function setup() {
createCanvas(800, 600);

// player car
player = new Car(width / 2, 500, 0, 0, 255);

// enemy cars
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

// score
if (gameOver === false) {
score++;
}

// show score
fill(255);
textSize(20);
textAlign(LEFT);
text("Score: " + score, 20, 30);

// game running
if (gameOver === false) {

// player
player.move();
player.display();

// enemies
for (let i = 0; i < enemies.length; i++) {

enemies[i].move();
enemies[i].display();

// collision
if (dist(player.x, player.y, enemies[i].x, enemies[i].y) < 60) {
gameOver = true;
}
}

} else {

// game over text
fill(255);

textAlign(CENTER);

textSize(40);
text("GAME OVER", width / 2, height / 2);

textSize(20);
text("Click to Restart", width / 2, height / 2 + 50);
}
}

// PLAYER CLASS
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

// keep car on road
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

// body
fill(this.r, this.g, this.b);
rect(-40, -20, 80, 40);

// top
rect(-20, -40, 40, 20);

// wheels
fill(0);
circle(-25, 25, 20);
circle(25, 25, 20);

pop();
}
}

// ENEMY CLASS
class EnemyCar {

constructor(x, y, r, g, b) {

this.x = x;
this.y = y;

this.r = r;
this.g = g;
this.b = b;

this.speed = random(6, 12);
}

move() {

// move down
this.y += this.speed;

// slowly increase speed
this.speed += 0.001;

// reset enemy
if (this.y > height + 50) {

this.y = -100;

this.x = random(200, 600);
}
}

display() {

push();

translate(this.x, this.y);

// body
fill(this.r, this.g, this.b);
rect(-40, -20, 80, 40);

// top
rect(-20, -40, 40, 20);

// wheels
fill(0);
circle(-25, 25, 20);
circle(25, 25, 20);

pop();
}
}

// restart game
function restartGame() {

gameOver = false;

score = 0;

enemies[0].y = -100;
enemies[1].y = -300;
enemies[2].y = -500;
}

// click to restart
function mousePressed() {

if (gameOver === true) {

restartGame();
}
} 
