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

let activeInput = null;   // input DOM quando edita no desktop
let editingStat = null;   // "vida" | "sanidade" | "pe"
let canvas;

function preload() {
  logo = loadImage("logo.jpg");
  glowImg = loadImage("glow.png");
  fonte = loadFont("fonte.ttf");
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  fileInput = createFileInput(handleFile);
  fileInput.hide();
  textFont(fonte);
  textAlign(CENTER, CENTER);
  imageMode(CENTER);

  atualizarTamanhos();

  // Touch instantâneo só no canvas (evita interferir com inputs)
  canvas.elt.addEventListener("touchstart", (e) => {
    // evita scroll/zoom enquanto toca no canvas
    e.preventDefault();
    const rect = canvas.elt.getBoundingClientRect();
    const t = e.touches[0];
    const x = t.clientX - rect.left;
    const y = t.clientY - rect.top;
    checarInteracoes(x, y, true);
  }, { passive: false });
}

function draw() {
  background("black");

  // logo canto superior direito
  const logoX = width - logoSize / 2 - baseSize * 0.05;
  const logoY = logoSize / 2 + baseSize * 0.05;
  image(logo, logoX, logoY, logoSize, logoSize);

  // quadrado canto superior esquerdo
  const squareX = baseSize * 0.05;
  const squareY = baseSize * 0.05;
  stroke(255);
  noFill();
  rect(squareX, squareY, squareSize, squareSize);

  if (uploadedImg) {
    image(uploadedImg, squareX + squareSize / 2, squareY + squareSize / 2, squareSize, squareSize);
  }

  // parte central
  const centerX = width / 2;
  const startY  = height * 0.25;
  const spacingY = height * 0.25;

  // glow
  const glowSize = baseSize * 0.4;
  image(glowImg, centerX, startY, glowSize, glowSize);
  image(glowImg, centerX, startY + spacingY, glowSize, glowSize);
  image(glowImg, centerX, startY + spacingY * 2, glowSize, glowSize);

  fill(255);

  // números
  const numberSize = baseSize * 0.18;
  textSize(numberSize);
  text(vida, centerX, startY);
  text(sanidade, centerX, startY + spacingY);
  text(pe, centerX, startY + spacingY * 2);

  // labels
  textSize(baseSize * 0.08);
  text("Vida", centerX, startY + baseSize * 0.1);
  text("Sanidade", centerX, startY + spacingY + baseSize * 0.1);
  text("PE", centerX, startY + spacingY * 2 + baseSize * 0.1);

  // botões (+ / -)
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
  checarInteracoes(mouseX, mouseY, false);
}

// Unifica clique/touch
function checarInteracoes(x, y, isTouch) {
  const centerX = width / 2;
  const startY  = height * 0.25;
  const spacingY = height * 0.25;

  // 1) Clique nos NÚMEROS -> abrir editor
  const numberSize = baseSize * 0.18;
  textSize(numberSize);

  const stats = [
    { nome: "vida",      get: () => vida,      set: (v) => vida = v,      y: startY },
    { nome: "sanidade",  get: () => sanidade,  set: (v) => sanidade = v,  y: startY + spacingY },
    { nome: "pe",        get: () => pe,        set: (v) => pe = v,        y: startY + spacingY * 2 },
  ];

  for (const st of stats) {
    const valorStr = st.get().toString();
    const bboxW = textWidth(valorStr);
    const bboxH = numberSize; // aproximação suficiente pra clique
    const left = centerX - bboxW / 2;
    const right = centerX + bboxW / 2;
    const top = st.y - bboxH / 2;
    const bottom = st.y + bboxH / 2;

    if (x >= left && x <= right && y >= top && y <= bottom) {
      abrirEditorNumero(st, centerX, st.y, isTouch);
      return; // evita cair nos botões no mesmo toque
    }
  }

  // 2) Botões +/-
  if (x > centerX + baseSize * 0.25 - buttonSize / 2 &&
      x < centerX + baseSize * 0.25 + buttonSize / 2 &&
      y > startY - buttonSize / 2 &&
      y < startY + buttonSize / 2) {
    vida++; return;
  }
  if (x > centerX - baseSize * 0.25 - buttonSize / 2 &&
      x < centerX - baseSize * 0.25 + buttonSize / 2 &&
      y > startY - buttonSize / 2 &&
      y < startY + buttonSize / 2) {
    vida--; return;
  }

  if (x > centerX + baseSize * 0.25 - buttonSize / 2 &&
      x < centerX + baseSize * 0.25 + buttonSize / 2 &&
      y > startY + spacingY - buttonSize / 2 &&
      y < startY + spacingY + buttonSize / 2) {
    sanidade++; return;
  }
  if (x > centerX - baseSize * 0.25 - buttonSize / 2 &&
      x < centerX - baseSize * 0.25 + buttonSize / 2 &&
      y > startY + spacingY - buttonSize / 2 &&
      y < startY + spacingY + buttonSize / 2) {
    sanidade--; return;
  }

  if (x > centerX + baseSize * 0.25 - buttonSize / 2 &&
      x < centerX + baseSize * 0.25 + buttonSize / 2 &&
      y > startY + spacingY * 2 - buttonSize / 2 &&
      y < startY + spacingY * 2 + buttonSize / 2) {
    pe++; return;
  }
  if (x > centerX - baseSize * 0.25 - buttonSize / 2 &&
      x < centerX - baseSize * 0.25 + buttonSize / 2 &&
      y > startY + spacingY * 2 - buttonSize / 2 &&
      y < startY + spacingY * 2 + buttonSize / 2) {
    pe--; return;
  }

  // 3) Upload imagem
  const squareX = baseSize * 0.05;
  const squareY = baseSize * 0.05;
  if (x > squareX && x < squareX + squareSize &&
      y > squareY && y < squareY + squareSize) {
    if (activeInput) fecharEditor();
    fileInput.elt.click();
  }
}

function abrirEditorNumero(statObj, cx, cy, isTouch) {
  // No celular, usar prompt (mais confiável do que input overlay)
  if (isTouch || ("ontouchstart" in window)) {
    const atual = statObj.get();
    const val = window.prompt(`Novo valor para ${statObj.nome}:`, atual);
    if (val !== null) {
      const n = parseInt(val, 10);
      if (!Number.isNaN(n)) statObj.set(n);
    }
    return;
  }

  // Desktop: input DOM sobre o número
  fecharEditor();

  const rect = canvas.elt.getBoundingClientRect();
  activeInput = createInput(statObj.get().toString());
  activeInput.style("position", "absolute");
  activeInput.style("z-index", "9999");
  activeInput.style("font-size", baseSize * 0.1 + "px");
  activeInput.style("text-align", "center");
  activeInput.size(baseSize * 0.3, baseSize * 0.15);

  // posiciona centralizado no número
  const left = rect.left + window.scrollX + cx - (baseSize * 0.3) / 2;
  const top  = rect.top  + window.scrollY + cy - (baseSize * 0.15) / 2;
  activeInput.position(left, top);

  editingStat = statObj;
  activeInput.elt.focus();
  activeInput.elt.select();

  const salvar = () => {
    const n = parseInt(activeInput.value(), 10);
    if (!Number.isNaN(n)) editingStat.set(n);
    fecharEditor();
  };

  activeInput.elt.addEventListener("keydown", (e) => {
    if (e.key === "Enter") salvar();
    if (e.key === "Escape") fecharEditor();
  });
  activeInput.elt.addEventListener("blur", salvar);
}

function fecharEditor() {
  if (activeInput) {
    activeInput.remove();
    activeInput = null;
  }
  editingStat = null;
}

function handleFile(file) {
  if (file.type === "image") uploadedImg = loadImage(file.data);
  else uploadedImg = null;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  atualizarTamanhos();
  // se houver input aberto, reposiciona ou fecha
  fecharEditor();
}

function atualizarTamanhos() {
  baseSize = min(width, height);
  squareSize = baseSize * 0.25;
  buttonSize = baseSize * 0.15;
  logoSize   = baseSize * 0.2;
}
