var interval;
var paused = true;
var gameScreenClickables = [];
var pauseButton;
var firefox = false;
if(navigator.userAgent.indexOf("Firefox") != -1 )
{
     firefox = true;
}

function startGame(strategy1, strategy2) {
  makeGameElements(strategy1, strategy2);
  makeGraphicElements(gameScreenClickables);

  document.addEventListener('keydown', handleKeyDown);
  document.addEventListener('keyup', handleKeyUp);

  canv.addEventListener("pointerdown", handlePointerDown);
  document.addEventListener("pointerup", handlePointerUp);

  canv.addEventListener("mousedown", handleGameMouseDown);
  document.addEventListener("mouseup", handleGameMouseUp);

  if (firefox === true) {
    console.log("firefox")
    canv.addEventListener("touchstart", handleGameTouchDown);
  }
  document.addEventListener("touchend", handleGameTouchUp);

  // $("*").on("touchstart touchend touchcancel touchmove", function(e) { e.preventDefault(); });

  resumeGame();
  paused = false;
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

function handlePointerDown(event) {
  console.log(event);
  console.log(event.data);
  console.log(canv);

  let clickX = event.clientX;
  let clickY = event.clientY;
  handleGameInteraction(clickX, clickY, "handleClickDown", "pointer Down");
}

function handlePointerUp(event) {
  // console.log(event);
  // console.log(event.data);

  let clickX = event.clientX;
  let clickY = event.clientY;
  handleGameInteraction(clickX, clickY, "handleClickUp", "pointer Up");
}

function handleGameMouseDown(event) {
  clickX = event.offsetX;
  clickY = event.offsetY;

  handleGameInteraction(clickX, clickY, "handleClickDown", "mouse Down");
}


function handleGameMouseUp(event) {
  clickX = event.offsetX;
  clickY = event.offsetY;

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

  // Set the associated paddle
  let paddle;
  if (clickX < canv.width / 2) {
    paddle = paddle1;
  } else {
    paddle = paddle2;
  }

  for (let index in gameScreenClickables) {
    let element = gameScreenClickables[index];

    if (element.withinBoundary(clickX, clickY)) {
      element[handleMethod]();
      break;
      // return; // Choose whether to break out of loop or not
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
  } else {
    pauseGame();
  }
}

function pauseGame() {
  clearInterval(interval);
  drawPauseScreen();
  paused = true;
}

function resumeGame() {
  interval = setInterval(newFrame, 1000 / FPS);
  removePauseScreen();
  paused = false;
}

// ============================================================
// Creationary
// ============================================================

function makeGraphicElements(clickables) {
  pauseButton = new PauseControl(canv.width / 3, canvas.height * 0.8, canv.width / 3, canv.height * 0.2, "grey", "yellow");
  clickables.push(pauseButton);

  let clickableLU = new OnScreenPaddleControls(0, - canv.height / 2, canv.width /2, canv.height, paddle1, "U");
  let clickableLD = new OnScreenPaddleControls(0, canv.height / 2, canv.width /2, canv.height, paddle1, "D");
  let clickableRU = new OnScreenPaddleControls(canv.width / 2, - canv.height / 2, canv.width /2, canv.height, paddle2, "U");
  let clickableRD = new OnScreenPaddleControls(canv.width / 2, canv.height / 2, canv.width / 2, canv.height, paddle2, "D");
  clickables.push(clickableLU);
  clickables.push(clickableLD);
  clickables.push(clickableRU);
  clickables.push(clickableRD);
}
