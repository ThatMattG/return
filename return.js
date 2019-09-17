var canv = document.getElementById("canvas");
var ctx = canv.getContext("2d");

var scores = [0, 0];

const FPS = 60;

const ballInitX = canv.width / 4;
const ballInitY = canv.height / 2;
const ballInitRadius = canv.width / 40;
const ballInitXSpeed = canv.width / 2 / FPS;
const ballInitYSpeed = 0 / FPS;
const ballMaxXSpeed = canv.width * 2 / FPS;
const ballMaxYSpeed = canv.height / 2 / FPS;

const paddleInitXDistance = canv.width / 12;
const paddleInitY = canv.width / 2;
const paddleInitWidth = canv.width / 40;
const paddleInitHeight = canv.height / 6;
const paddleYSpeed = ballMaxYSpeed * 2.5;

var ball;
var paddle1;
var player1;
var player2;


// Create the ball and paddles
function makeGameElements(strategy1, strategy2) {
  ball = makeNewBall(scores);

  paddle1 = new Paddle(
        paddleInitXDistance, paddleInitY, paddleInitWidth, paddleInitHeight, paddleYSpeed, 0, canv.height
  );
  player1 = new Player(strategy1, "L", paddle1);

  paddle2 = new Paddle(
        canv.width - paddleInitXDistance, paddleInitY, paddleInitWidth, paddleInitHeight, paddleYSpeed, 0, canv.height
  );
  player2 = new Player(strategy2, "R", paddle2);
}


// Alternate the direction of the ball start
function makeNewBall(scores) {
  let pts = sumArray(scores);

  if (pts % 2 === 0) {
    return new Ball(
      ballInitX, ballInitY, ballInitRadius, ballInitXSpeed, ballInitYSpeed, ballMaxXSpeed, ballMaxYSpeed
    );
  } else {
    return new Ball(
      canv.width - ballInitX, ballInitY, ballInitRadius, - ballInitXSpeed, ballInitYSpeed, ballMaxXSpeed, ballMaxYSpeed
    );
  }
}

// ============================================================
// Helper functions
// ============================================================

// Returns the sum of an array's elements
function sumArray(arr) {
  return arr.reduce( (a,b) => a + b, 0 );
}

// Applies a given function to both paddles
function bothPaddles(func) {
  func(paddle1);
  func(paddle2);
}

function bothPlayers(func) {
  player1.func();
  player2.func();
}

// ============================================================
// Collisions and position updates
// ============================================================

// Updates object locations/properties and handles collisions
function updateGame() {
  ball.updatePosition();

  if (ballTBEdgeCollision()) {
    ball.changeYDirection();
    ball.nextColor();
  }

  if (ballPaddleCollision()) {
    ballHitPaddle();
    ball.nextColor();
  }
  // Use "else if" as redundant protection to prevent losing
  // when paddle should block the ball
  else if (ballPastLREdge()) {
    incrementWinnerScore(scores);
    ball = makeNewBall(scores);
  }

  // bothPaddles(movePaddle); // Replacing this with call via player
  // bothPlayers(move);
  player1.move();
  player2.move();
}

function movePaddle(paddle) {
  paddle.move();
}

function ballPaddleCollision() {
  // paddle1
  if (ball.xSpeed < 0) {
    let topEdge = paddle1.y - paddle1.height / 2;
    let bottomEdge = paddle1.y + paddle1.height / 2;
    let rightEdge = paddle1.x + paddle1.width / 2;

    if (ball.x - ball.radius <= rightEdge
        && ball.oldX - ball.radius >= rightEdge) {

      // Case: centre of ball through paddle
      if (ball.y >= topEdge
          && ball.y <= bottomEdge) {
        return true;
      }

      // Case: centre of ball slightly above top of paddle1
      if (ball.y <= topEdge
          && ball.y + ball.radius >= topEdge) {
        return true;
      }

      // Case: centre of ball slightly under bottom of paddle1
      if (ball.y >= bottomEdge
          && ball.y - ball.radius <= bottomEdge) {
        return true;
      }
    }
  }

  // paddle2
  if (ball.xSpeed > 0) {
    let topEdge = paddle2.y - paddle2.height / 2;
    let bottomEdge = paddle2.y + paddle2.height / 2;
    let leftEdge = paddle2.x - paddle2.width / 2;

    if (ball.x + ball.radius >= leftEdge
        && ball.oldX + ball.radius <= leftEdge) {

      // Case: centre of ball through paddle
      if (ball.y >= topEdge
          && ball.y <= bottomEdge) {
        return true;
      }

      // Case: centre of ball slightly above top of paddle1
      if (ball.y <= topEdge
          && ball.y + ball.radius >= topEdge) {
        return true;
      }

      // Case: centre of ball slightly under bottom of paddle1
      if (ball.y >= bottomEdge
          && ball.y - ball.radius <= bottomEdge) {
        return true;
      }
    }
  }

  return false;
}

// Handle ball/paddle collision
function ballHitPaddle() {
  ball.changeXDirection();
  ball.changeYSpeed();

  if (ball.x < paddle1.x + paddle1.width / 2) {
    ball.x = paddle1.x + paddle1.width / 2;
  }
  if (ball.x > paddle2.x - paddle2.width / 2) {
    ball.x = paddle2.x - paddle2.width / 2;
  }
}

// Detect if ball hit top or bottom edge
function ballTBEdgeCollision() {
  if (ball.y - ball.radius < 0
      || ball.y + ball.radius > canv.height)
  {
    return true;
  } else {
    return false;
  }
}

// Detect if ball is completely outside the left or right edge
function ballPastLREdge() {
  if (ball.xSpeed < 0
      && ball.x + ball.radius < 0) {
    return true;
  }
  if (ball.xSpeed > 0
      && ball.x - ball.radius > canv.width) {
    return true;
  }
  return false;
}

function incrementWinnerScore(scores) {
  if (ball.x > canv.width / 2) {
    scores[0]++;
  } else {
    scores[1]++;
  }
}
