var interval;
var paused = true;

function startGame(strategy1, strategy2) {
  makeGameElements(strategy1, strategy2);

  document.addEventListener('keydown', bindPaddleKeys);
  document.addEventListener('keyup', bindPaddleKeysUp);

  resumeGame();
  paused = false;
}

function resumeGame() {
  interval = setInterval(newFrame, 1000 / FPS);
}

// ============================================================
// Keyboard bindings
// ============================================================

function bindPaddleKeys(e) {
  switch (e.key) {
    case "q":
      // paddle1 up
      paddle1.moveUp();
      break;
    case "a":
      // paddle1 down
      paddle1.moveDown();
      break;
    case "ArrowUp":
      // paddle2 up
      paddle2.moveUp();
      break;
    case "ArrowDown":
      // paddle2 down
      paddle2.moveDown();
      break;
    case " ":
      togglePause();
      break;
  }
}

function bindPaddleKeysUp(e) {
  if (e.key === "q" || e.key === "a") {
    paddle1.stop();
  }
  if (e.key === "ArrowUp" || e.key === "ArrowDown") {
    paddle2.stop();
  }
}

function movePaddleUp(paddle) {
  paddle.moveUp();
}

function movePaddleDown(paddle) {
  paddle.moveDown();
}

function movePaddle(paddle) {
  paddle.move();
}

// ============================================================
// newFrame() runs with set interval
// ============================================================

function newFrame() {
    updateGame();
    drawGame();
}

// ============================================================
// Helper functions
// ============================================================

function togglePause() {
  if (paused) {
    resumeGame();
    removePauseScreen();
    paused = false;
  } else {
    clearInterval(interval);
    drawPauseScreen();
    paused = true;
  }
}
