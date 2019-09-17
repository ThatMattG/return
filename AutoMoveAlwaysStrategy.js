class AutoMoveAlwaysStrategy extends AutoMoveStrategy {

  constructor(speed) {
    super(speed);
  }

  getMove(player, paddle, ball) {

    let direction = 0;

    // Move up if ball outside main paddle height
    if (ball.y < paddle.y - paddle.height / 2) {
      return - this.speed;
    }

    // Move down if ball outside main paddle height
    if (ball.y > paddle.y + paddle.height / 2) {
      return this.speed;
    }

  return direction;
  }

}
