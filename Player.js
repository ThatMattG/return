// player should have access to entire game object so that:
// - the correct ball object is always available
// - an advanced AI can used the opponent's location for decision-making

class Player {

  constructor(moveStrategy, side, paddle) {
    // Use strategy pattern for paddle movement
    this._moveStrategy = moveStrategy;

    // side is "L" or "R"
    this._side = side;

    this._paddle = paddle;

    // Add game when it is created
    this._game = null;
  }

  set game(game) {
    this._game = game;
  }

  get side() {
    return this._side;
  }

  getMove() {
    return this._moveStrategy.getMove(this, this._paddle, ball);
  }

  move() {
      this._moveStrategy.move(this, this._paddle, ball);
  }

}
