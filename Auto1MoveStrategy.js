class Auto1MoveStrategy extends MoveStrategy {

  getMove(player, paddle, ball) {
    console.log(`${player}, ${paddle}, ${ball}`);

    let direction = 0;

    if (ball.getDirection() === player.side) {
      // Move up if ball outside main paddle height
      if (ball.y < paddle.y - paddle.height / 2) {
        return -1;
      }

      // Move down if ball outside main paddle height
      if (ball.y > paddle.y + paddle.height / 2) {
        return 1;
      }
    }
    console.log(direction);
    return direction;
  }

}
