function drawSplash() {
  drawGameCanvas(1);
  drawStartMessage();
  drawModeSelectors();
}

// Draw start message
function drawStartMessage() { // REFACTOR: shares code with drawStrategySelector and drawPauseMessage
  ctx.font = "bold 40px Courier"; // Not tied to canvas size - change if needed
  ctx.fillStyle = "orange";
  ctx.strokeStyle = "black";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("Click to start", canv.width / 2, canv.height / 2);
  ctx.strokeText("Click to start", canv.width / 2, canv.height / 2);
}

function drawModeSelectors() {
  drawStrategySelector(strategySelector1);
  drawStrategySelector(strategySelector2);
}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

function drawStrategySelector(selector) {
  selector.draw();

  ctx.font = "bold 40px Courier";
  ctx.fillStyle = "orange";
  ctx.strokeStyle = "black";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(selector.toString, selector.xMid, selector.yMid);
  ctx.strokeText(selector.toString, selector.xMid, selector.yMid);
}
