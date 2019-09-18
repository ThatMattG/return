class OnScreenPaddleControls extends Rectangle {

  constructor(xStart, yStart, width, height, paddle, direction) {
    super(xStart, yStart, width, height);
    this.paddle = paddle;
    this.direction = direction;
  }

  handleClickDown() {
    if (this.direction === "U") {
      this.paddle.moveUp();
    } else if (this.direction === "D") {
      this.paddle.moveDown();
    }
  }

  handleClickUp() {
    this.paddle.stop();
  }
  
}
