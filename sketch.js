function mousePressed() {
  checarBotoes(mouseX, mouseY);
}

function touchStarted() {
  checarBotoes(touchX, touchY);
  return false; // impede o scroll da página
}

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
