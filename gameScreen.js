// ============================================================
// Draw objects
// ============================================================

const standardOpacity = 0.2;

function drawGame() {
  drawGameCanvas(standardOpacity);
  drawBall();
  drawPaddles();
  drawScores();
  drawPauseButton();
}

function drawGameCanvas(opacity=standardOpacity) {
  ctx.beginPath();
  ctx.fillStyle = `rgba(0,0,0,${opacity})`;
  ctx.fillRect(0, 0, canv.width, canv.height);
  ctx.fill();
  ctx.closePath();
}

function drawBall() {
  ctx.beginPath();
  ctx.fillStyle = `rgb(${ball.red}, ${ball.green}, ${ball.blue})`;
  ctx.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI);
  ctx.closePath();
  ctx.fill();
}

function drawPaddles() {
  ctx.beginPath();
  ctx.fillStyle = "orange";
  ctx.strokeStyle = "black";
  bothPaddles(drawPaddle);
}

function drawPaddle(paddle) {
  ctx.beginPath();
  let xStart = paddle.x - paddle.width / 2;
  let yStart = paddle.y - paddle.height / 2;
  ctx.rect(xStart, yStart, paddle.width, paddle.height);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
}

function drawScores() {
  ctx.font = "20px Courier";
  ctx.fillStyle = "silver";

  ctx.textAlign = "end";
  ctx.fillText(scores[0], canv.width / 3, canv.height * 1/10);

  ctx.textAlign = "center";
  ctx.fillText("-", canv.width / 2, canv.height * 1/10);

  ctx.textAlign = "start";
  ctx.fillText(scores[1], canv.width * 2 / 3, canv.height * 1/10);
}

function drawPauseScreen() {
  // Background
  ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
  ctx.fillRect(0, 0, canv.width, canv.height);

  // PAUSED text
  let msg = "PAUSED";
  drawPauseMessage("orange", "black");
  ctx.font = "bold 40px Courier";
  ctx.fillStyle = "orange";
  ctx.strokeStyle = "black";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(msg, canv.width / 2, canv.height / 2);
  ctx.strokeText(msg, canv.width / 2, canv.height / 2);
}

function drawPauseMessage(color1, color2) {
  let msg = "PAUSED";

  ctx.font = "bold 40px Courier"; // Not tied to canvas size - change if needed
  ctx.fillStyle = "orange";
  ctx.strokeStyle = "black";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(msg, canv.width / 2, canv.height / 2);
  ctx.strokeText(msg, canv.width / 2, canv.height / 2);
}

function removePauseScreen() {
  drawPauseMessage("black", "black") // Removes grey smear
  drawGame(1); // The existing frame is re-drawn before updates occur
}

function drawPauseButton() {
  pauseButton.draw();
}
