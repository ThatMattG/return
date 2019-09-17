class HumanMoveStrategy extends MoveStrategy {

  getMove(player, paddle, ball) {
    if (paddle.speed < 0) {
      return -1;
    } else if (paddle.speed > 0) {
      return 1;
    } else {
      return 0;
    }
    // return paddle.speed;  // To be encapsulated
  }

}
