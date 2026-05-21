/*
Name: Jai Gaston SS7-Jai G 
Title: Follow Me Cars OOP
Built From: Short Study #3

Instructions:
- Move your mouse to guide the cars
- Click to change the car colors
- Press S to stop the sun
- Press G to start the sun
*/
 

let cars = [];

let sunAngle = 0;
let sunMove = true;

function setup() {
  createCanvas(800, 600);

  // cars start in different places
  cars.push(new Car(150, 430, 255, 0, 0, -120));
  cars.push(new Car(400, 500, 0, 0, 255, 0));
  cars.push(new Car(650, 450, 0, 255, 0, 120));
}

function draw() {

  // sky
  background(135, 206, 235);

  // sun
  push();
  translate(700, 100);

  if (sunMove) {
    sunAngle += 0.02;
  }

  rotate(sunAngle);

  fill(255, 204, 0);
  circle(0, 0, 100);

  stroke(255);
  line(0, -70, 0, -120);
  line(0, 70, 0, 120);
  line(-70, 0, -120, 0);
  line(70, 0, 120, 0);

  pop();

  // road
  fill(80);
  rect(0, 380, width, 220);

  // show cars
  for (let i = 0; i < cars.length; i++) {
    cars[i].move();
    cars[i].display();
  }
}

// CAR CLASS
class Car {

  constructor(x, y, r, g, b, offset) {

    this.x = x;
    this.y = y;

    this.r = r;
    this.g = g;
    this.b = b;

    // keeps cars separated
    this.offset = offset;
  }

  // move car
  move() {

    // each car follows a different position
    this.x += ((mouseX + this.offset) - this.x) * 0.01;

    // keep cars on screen
    if (this.x < 60) {
      this.x = 60;
    }

    if (this.x > width - 60) {
      this.x = width - 60;
    }
  }

  // draw car
  display() {

    push();
    translate(this.x, this.y);

    fill(this.r, this.g, this.b);

    // car body
    rect(-50, -20, 100, 40);

    // top
    rect(-25, -40, 50, 20);

    // wheels
    fill(0);
    circle(-30, 25, 30);
    circle(30, 25, 30);

    pop();
  }

  // change color
  changeColor() {
    this.r = random(255);
    this.g = random(255);
    this.b = random(255);
  }
}

// click changes colors
function mousePressed() {

  for (let i = 0; i < cars.length; i++) {
    cars[i].changeColor();
  }
}

// stop/start sun
function keyPressed() {

  if (key === "s" || key === "S") {
    sunMove = false;
  }

  if (key === "g" || key === "G") {
    sunMove = true;
  }
}