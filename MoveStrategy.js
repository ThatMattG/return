class MoveStrategy {

  constructor() {}

  getMove(player, paddle, ball) {
    throw new Error("getMove() not implemented");
  }

  move(player, paddle, ball) {
    let direction = this.getMove(player, paddle, ball)
    paddle.move(direction);
  }

}
