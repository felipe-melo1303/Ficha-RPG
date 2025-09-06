let logo;
let uploadedImg;
let fileInput;
let squareSize = 130;
let fonte;

let vida = 50;
let sanidade = 50;
let pe = 50;

let buttonSize = 80;

let glowImg;

function preload() {
  logo = loadImage("logo.jpg");
  glowImg = loadImage("glow.png");
  fonte = loadFont("fonte.ttf");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  fileInput = createFileInput(handleFile);
  fileInput.hide();
  textFont(fonte);
  textAlign(CENTER, CENTER);
  imageMode(CENTER);
}

function draw() {
  background("black");
  let logoSize = 120;
  let logoX = width - logoSize / 2 - 20
  let logoY = logoSize / 2 + 20
  image(logo, logoX, logoY, logoSize, logoSize);
  

  let squareX = 10;
  let squareY = 10;
  stroke(255);
  noFill();
  rect(squareX, squareY, squareSize, squareSize);

  if (uploadedImg) {
    image(uploadedImg, squareX + squareSize / 2, squareY + squareSize / 2, squareSize, squareSize);
  }

  let centerX = width / 2;
  let startY = 200;
  let spacingY = 180;

  image(glowImg, centerX, startY - 20, 150, 150);
  image(glowImg, centerX, startY + spacingY - 20, 150, 150);
  image(glowImg, centerX, startY + spacingY * 2 - 20, 150, 150);

  fill("white");

  textSize(100);
  text(vida, centerX, startY - 20);
  text(sanidade, centerX, startY + spacingY - 20);
  text(pe, centerX, startY + spacingY * 2 - 20);

  textSize(50);
  text("Vida", centerX, startY + 50);
  text("Sanidade", centerX, startY + spacingY + 50);
  text("PE", centerX, startY + spacingY * 2 + 50);

  textSize(80);
  text("+", centerX + 100, startY);
  text("-", centerX - 100, startY);

  text("+", centerX + 100, startY + spacingY);
  text("-", centerX - 100, startY + spacingY);

  text("+", centerX + 100, startY + spacingY * 2);
  text("-", centerX - 100, startY + spacingY * 2);
}

function mousePressed() {
  let centerX = width / 2;
  let startY = 200;
  let spacingY = 180;
  

  if (mouseX > centerX + 100 - buttonSize / 2 && mouseX < centerX + 100 + buttonSize / 2 &&
      mouseY > startY - buttonSize / 2 && mouseY < startY + buttonSize / 2) {
    vida++;
  }
  if (mouseX > centerX - 100 - buttonSize / 2 && mouseX < centerX - 100 + buttonSize / 2 &&
      mouseY > startY - buttonSize / 2 && mouseY < startY + buttonSize / 2) {
    vida--;
  }

  if (mouseX > centerX + 100 - buttonSize / 2 && mouseX < centerX + 100 + buttonSize / 2 &&
      mouseY > startY + spacingY - buttonSize / 2 && mouseY < startY + spacingY + buttonSize / 2) {
    sanidade++;
  }
  if (mouseX > centerX - 100 - buttonSize / 2 && mouseX < centerX - 100 + buttonSize / 2 &&
      mouseY > startY + spacingY - buttonSize / 2 && mouseY < startY + spacingY + buttonSize / 2) {
    sanidade--;
  }

  if (mouseX > centerX + 100 - buttonSize / 2 && mouseX < centerX + 100 + buttonSize / 2 &&
      mouseY > startY + spacingY * 2 - buttonSize / 2 && mouseY < startY + spacingY * 2 + buttonSize / 2) {
    pe++;
  }
  if (mouseX > centerX - 100 - buttonSize / 2 && mouseX < centerX - 100 + buttonSize / 2 &&
      mouseY > startY + spacingY * 2 - buttonSize / 2 && mouseY < startY + spacingY * 2 + buttonSize / 2) {
    pe--;
  }

  if (mouseX > 10 && mouseX < 10 + squareSize && mouseY > 10 && mouseY < 10 + squareSize) {
    fileInput.elt.click();
  }
}

function handleFile(file) {
  if (file.type === "image") {
    uploadedImg = loadImage(file.data);
  } else {
    uploadedImg = null;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
