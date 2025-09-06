let logo;
let uploadedImg;
let fileInput;
let fonte;

let vida = 50;
let sanidade = 50;
let pe = 50;

let buttonSize;
let squareSize;
let logoSize;
let glowImg;

function preload() {
  logo = loadImage("logo.jpg");
  glowImg = loadImage("glow.png");
  fonte = loadFont("fonte.ttf");
}

function setup() {
  createCanvas(windowWidth, windowHeight); // ocupa toda a tela
  fileInput = createFileInput(handleFile);
  fileInput.hide();
  textFont(fonte);
  textAlign(CENTER, CENTER);
  imageMode(CENTER);

  atualizarTamanhos();
}

function draw() {
  background("black");

  // logo canto superior direito
  let logoX = width - logoSize / 2 - width * 0.03;
  let logoY = logoSize / 2 + width * 0.03;
  image(logo, logoX, logoY, logoSize, logoSize);

  // quadrado para foto canto superior esquerdo
  let squareX = width * 0.03;
  let squareY = width * 0.03;
  stroke(255);
  noFill();
  rect(squareX, squareY, squareSize, squareSize);

  if (uploadedImg) {
    image(uploadedImg, squareX + squareSize / 2, squareY + squareSize / 2, squareSize, squareSize);
  }

  // parte central
  let centerX = width / 2;
  let startY = height * 0.25;     // primeira linha
  let spacingY = height * 0.25;   // espaço entre linhas

  // glow atrás dos números
  let glowSize = width * 0.35;
  image(glowImg, centerX, startY, glowSize, glowSize);
  image(glowImg, centerX, startY + spacingY, glowSize, glowSize);
  image(glowImg, centerX, startY + spacingY * 2, glowSize, glowSize);

  fill("white");

  // números
  textSize(width * 0.15);
  text(vida, centerX, startY);
  text(sanidade, centerX, startY + spacingY);
  text(pe, centerX, startY + spacingY * 2);

  // labels
  textSize(width * 0.07);
  text("Vida", centerX, startY + height * 0.08);
  text("Sanidade", centerX, startY + spacingY + height * 0.08);
  text("PE", centerX, startY + spacingY * 2 + height * 0.08);

  // botões + e -
  textSize(width * 0.15);
  text("+", centerX + width * 0.25, startY);
  text("-", centerX - width * 0.25, startY);

  text("+", centerX + width * 0.25, startY + spacingY);
  text("-", centerX - width * 0.25, startY + spacingY);

  text("+", centerX + width * 0.25, startY + spacingY * 2);
  text("-", centerX - width * 0.25, startY + spacingY * 2);
}

function mousePressed() {
  let centerX = width / 2;
  let startY = height * 0.25;
  let spacingY = height * 0.25;

  // vida +
  if (mouseX > centerX + width * 0.25 - buttonSize / 2 &&
      mouseX < centerX + width * 0.25 + buttonSize / 2 &&
      mouseY > startY - buttonSize / 2 &&
      mouseY < startY + buttonSize / 2) {
    vida++;
  }
  // vida -
  if (mouseX > centerX - width * 0.25 - buttonSize / 2 &&
      mouseX < centerX - width * 0.25 + buttonSize / 2 &&
      mouseY > startY - buttonSize / 2 &&
      mouseY < startY + buttonSize / 2) {
    vida--;
  }

  // sanidade +
  if (mouseX > centerX + width * 0.25 - buttonSize / 2 &&
      mouseX < centerX + width * 0.25 + buttonSize / 2 &&
      mouseY > startY + spacingY - buttonSize / 2 &&
      mouseY < startY + spacingY + buttonSize / 2) {
    sanidade++;
  }
  // sanidade -
  if (mouseX > centerX - width * 0.25 - buttonSize / 2 &&
      mouseX < centerX - width * 0.25 + buttonSize / 2 &&
      mouseY > startY + spacingY - buttonSize / 2 &&
      mouseY < startY + spacingY + buttonSize / 2) {
    sanidade--;
  }

  // pe +
  if (mouseX > centerX + width * 0.25 - buttonSize / 2 &&
      mouseX < centerX + width * 0.25 + buttonSize / 2 &&
      mouseY > startY + spacingY * 2 - buttonSize / 2 &&
      mouseY < startY + spacingY * 2 + buttonSize / 2) {
    pe++;
  }
  // pe -
  if (mouseX > centerX - width * 0.25 - buttonSize / 2 &&
      mouseX < centerX - width * 0.25 + buttonSize / 2 &&
      mouseY > startY + spacingY * 2 - buttonSize / 2 &&
      mouseY < startY + spacingY * 2 + buttonSize / 2) {
    pe--;
  }

  // upload de imagem
  if (mouseX > width * 0.03 &&
      mouseX < width * 0.03 + squareSize &&
      mouseY > width * 0.03 &&
      mouseY < width * 0.03 + squareSize) {
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
  atualizarTamanhos();
}

function atualizarTamanhos() {
  squareSize = width * 0.2;   // quadrado proporcional
  buttonSize = width * 0.15;  // tamanho do botão
  logoSize   = width * 0.2;   // logo proporcional
}
