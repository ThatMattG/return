function Ball(x, y, radius, xSpeed, ySpeed, maxXSpeed, maxYSpeed) {
  this.xStart = x;
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.xSpeed = xSpeed;
  this.ySpeed = ySpeed;
  this.maxXSpeed = maxXSpeed;
  this.maxYSpeed = maxYSpeed;

  this.red = 150;
  this.green = 150;
  this.blue = 250;
}

Ball.prototype.updatePosition = function() {
  this.oldX = this.x;
  this.oldY = this.y;
  this.x += this.xSpeed;
  this.y += this.ySpeed;
};

Ball.prototype.changeXDirection = function() {
  this.xSpeed = - this.xSpeed;

  this.xSpeed += this.xSpeed / 10;
  if (Math.abs(this.xSpeed) > this.maxXSpeed) {

    this.xSpeed = (this.xSpeed > 0) ? this.maxXSpeed : - this.maxXSpeed;
  }
};

Ball.prototype.changeYDirection = function() {
  this.ySpeed = - this.ySpeed;
}

Ball.prototype.changeYSpeed = function() {
  this.ySpeed += Math.random() * this.maxYSpeed - this.maxYSpeed / 2;
}

Ball.prototype.nextColor = function() {
  this.red = this.green;
  this.green = this.blue;
  while (Math.abs(this.blue - this.red) < 40
      && Math.abs(this.blue - this.green) < 40) {
    this.blue = Math.random() * 125 + 100;
  }
}

Ball.prototype.getDirection = function () {
  if (this.xSpeed < 0) {
    return "L";
  } else {
    return "R";
  }
};
