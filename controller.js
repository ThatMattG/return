var interval;
var paused = true;
var gameScreenClickables = [];

function startGame(strategy1, strategy2) {
  makeGameElements(strategy1, strategy2);
  makeGraphicElements(gameScreenClickables);

  document.addEventListener('keydown', handleKeyDown);
  document.addEventListener('keyup', handleKeyUp);
  canv.addEventListener("pointerdown", handlePointerDown);
  canv.addEventListener("pointerup", handlePointerUp);
  canv.addEventListener("mousedown", handleGameMouseDown);
  canv.addEventListener("mouseup", handleGameMouseUp);
  // canv.addEventListener("touchstart", handleGameTouchDown);
  // canv.addEventListener("touchend", handleGameTouchUp);

  // $("*").on("touchstart touchend touchcancel touchmove", function(e) { e.preventDefault(); });

  resumeGame();
  paused = false;
}

function handlePointerDown(event) {
  // console.log(event);
  // console.log(event.data);

  let clickX = event.clientX;
  let clickY = event.clientY;
  handleGameInteraction(clickX, clickY, "handleClickDown");
}

function handlePointerUp(event) {
  // console.log(event);
  // console.log(event.data);

  let clickX = event.clientX;
  let clickY = event.clientY;
  handleGameInteraction(clickX, clickY, "handleClickUp");
}

// ============================================================
// Input handling
// ============================================================

function handleKeyDown(e) {
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

function handleKeyUp(e) {
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

function handleGameMouseDown(event) {
  clickX = event.pageX;
  clickY = event.pageY;

  handleGameInteraction(clickX, clickY, "handleClickDown", "mouse Down");
}


function handleGameMouseUp(event) {
  clickX = event.pageX;
  clickY = event.pageY;

  handleGameInteraction(clickX, clickY, "handleClickUp", "mouse Up");
}

function handleGameTouchDown(event) {
  newFrame();
  clickX = Math.round(event.changedTouches[0].pageX);
  clickY = Math.round(event.changedTouches[0].pageY);

  handleGameInteraction(clickX, clickY, "handleClickDown", "touch Down");
  newFrame();
}



function handleGameTouchUp(event) {
  clickX = Math.round(event.changedTouches[0].pageX);
  clickY = Math.round(event.changedTouches[0].pageY);

  handleGameInteraction(clickX, clickY, "handleClickUp", "touch Up");
}

function handleGameInteraction(clickX, clickY, handleMethod, calledFrom) {
  console.log(clickX, clickY, handleMethod, calledFrom);

  for (let index in gameScreenClickables) {
    let element = gameScreenClickables[index];

    if (element.withinBoundary(clickX, clickY)) {
      element[handleMethod]();
      break;
    }
  }
}

// ============================================================
// newFrame() runs with set interval
// ============================================================

function newFrame() {
    updateGame();
    drawGame();
}

// ============================================================
// Pause/resume
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

function resumeGame() {
  interval = setInterval(newFrame, 1000 / FPS);
}

// ============================================================
// Creationary
// ============================================================

function makeGraphicElements(clickables) {
  let clickableLU = new OnScreenPaddleControls(0, 0, canv.width /2, canv.height / 2, paddle1, "U");
  let clickableLD = new OnScreenPaddleControls(0, canv.height / 2, canv.width /2, canv.height / 2, paddle1, "D");
  let clickableRU = new OnScreenPaddleControls(canv.width / 2, 0, canv.width /2, canv.height / 2, paddle2, "U");
  let clickableRD = new OnScreenPaddleControls(canv.width / 2, canv.height / 2, canv.width /2, canv.height / 2, paddle2, "D");
  clickables.push(clickableLU);
  clickables.push(clickableLD);
  clickables.push(clickableRU);
  clickables.push(clickableRD);
}
