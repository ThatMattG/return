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

function drawStrategySelector(selector) {
  ctx.fillStyle = "beige";
  ctx.fillRect(selector.xStart, selector.yStart, selector.width, selector.height);

  ctx.font = "bold 40px Courier";
  ctx.fillStyle = "orange";
  ctx.strokeStyle = "black";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(selector.toString, selector.xStart + selector.width / 2, selector.yStart + selector.height / 2);
  ctx.strokeText(selector.toString, selector.xStart + selector.width / 2, selector.yStart + selector.height / 2);
}
