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
let baseSize;

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

  atualizarTamanhos();

  // 👇 escuta evento nativo de toque para ser instantâneo
  document.addEventListener("touchstart", (e) => {
    // previne zoom/scroll
    e.preventDefault();
    // pega coordenadas do primeiro dedo
    let touch = e.touches[0];
    let x = touch.clientX;
    let y = touch.clientY;
    checarBotoes(x, y);
  }, { passive: false });
}

function draw() {
  background("black");

  // logo canto superior direito
  let logoX = width - logoSize / 2 - baseSize * 0.05;
  let logoY = logoSize / 2 + baseSize * 0.05;
  image(logo, logoX, logoY, logoSize, logoSize);

  // quadrado canto superior esquerdo
  let squareX = baseSize * 0.05;
  let squareY = baseSize * 0.05;
  stroke(255);
  noFill();
  rect(squareX, squareY, squareSize, squareSize);

  if (uploadedImg) {
    image(uploadedImg, squareX + squareSize / 2, squareY + squareSize / 2, squareSize, squareSize);
  }

  // parte central
  let centerX = width / 2;
  let startY = height * 0.25;
  let spacingY = height * 0.25;

  // glow
  let glowSize = baseSize * 0.4;
  image(glowImg, centerX, startY, glowSize, glowSize);
  image(glowImg, centerX, startY + spacingY, glowSize, glowSize);
  image(glowImg, centerX, startY + spacingY * 2, glowSize, glowSize);

  fill("white");

  // números
  textSize(baseSize * 0.18);
  text(vida, centerX, startY);
  text(sanidade, centerX, startY + spacingY);
  text(pe, centerX, startY + spacingY * 2);

  // labels
  textSize(baseSize * 0.08);
  text("Vida", centerX, startY + baseSize * 0.1);
  text("Sanidade", centerX, startY + spacingY + baseSize * 0.1);
  text("PE", centerX, startY + spacingY * 2 + baseSize * 0.1);

  // botões
  textSize(baseSize * 0.15);
  text("+", centerX + baseSize * 0.25, startY);
  text("-", centerX - baseSize * 0.25, startY);

  text("+", centerX + baseSize * 0.25, startY + spacingY);
  text("-", centerX - baseSize * 0.25, startY + spacingY);

  text("+", centerX + baseSize * 0.25, startY + spacingY * 2);
  text("-", centerX - baseSize * 0.25, startY + spacingY * 2);
}

// mouse no PC
function mousePressed() {
  checarBotoes(mouseX, mouseY);
}

// função que centraliza a lógica
function checarBotoes(x, y) {
  let centerX = width / 2;
  let startY = height * 0.25;
  let spacingY = height * 0.25;

  // vida +
  if (x > centerX + baseSize * 0.25 - buttonSize / 2 &&
      x < centerX + baseSize * 0.25 + buttonSize / 2 &&
      y > startY - buttonSize / 2 &&
      y < startY + buttonSize / 2) {
    vida++;
  }
  // vida -
  if (x > centerX - baseSize * 0.25 - buttonSize / 2 &&
      x < centerX - baseSize * 0.25 + buttonSize / 2 &&
      y > startY - buttonSize / 2 &&
      y < startY + buttonSize / 2) {
    vida--;
  }

  // sanidade +
  if (x > centerX + baseSize * 0.25 - buttonSize / 2 &&
      x < centerX + baseSize * 0.25 + buttonSize / 2 &&
      y > startY + spacingY - buttonSize / 2 &&
      y < startY + spacingY + buttonSize / 2) {
    sanidade++;
  }
  // sanidade -
  if (x > centerX - baseSize * 0.25 - buttonSize / 2 &&
      x < centerX - baseSize * 0.25 + buttonSize / 2 &&
      y > startY + spacingY - buttonSize / 2 &&
      y < startY + spacingY + buttonSize / 2) {
    sanidade--;
  }

  // pe +
  if (x > centerX + baseSize * 0.25 - buttonSize / 2 &&
      x < centerX + baseSize * 0.25 + buttonSize / 2 &&
      y > startY + spacingY * 2 - buttonSize / 2 &&
      y < startY + spacingY * 2 + buttonSize / 2) {
    pe++;
  }
  // pe -
  if (x > centerX - baseSize * 0.25 - buttonSize / 2 &&
      x < centerX - baseSize * 0.25 + buttonSize / 2 &&
      y > startY + spacingY * 2 - buttonSize / 2 &&
      y < startY + spacingY * 2 + buttonSize / 2) {
    pe--;
  }

  // upload imagem
  if (x > baseSize * 0.05 &&
      x < baseSize * 0.05 + squareSize &&
      y > baseSize * 0.05 &&
      y < baseSize * 0.05 + squareSize) {
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
  baseSize = min(width, height); // base de escala
  squareSize = baseSize * 0.25;
  buttonSize = baseSize * 0.15;
  logoSize   = baseSize * 0.2;
}
