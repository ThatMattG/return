function Paddle(x, y, width, height, paddleYSpeed, minTop, maxBottom) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.speed = 0;
  this.maxSpeed = paddleYSpeed;
  this.yMin = minTop + height / 2;
  this.yMax = maxBottom - height / 2;
}

Paddle.prototype.moveUp = function() {
  this.speed = - this.maxSpeed;
}

Paddle.prototype.moveDown = function() {
  this.speed = this.maxSpeed;
}

Paddle.prototype.move = function(dir) {
  this.y += dir * this.maxSpeed;

  // this.y += this.speed;
  if (this.y < this.yMin) {
    this.y = this.yMin;
  }
  if (this.y > this.yMax) {
    this.y = this.yMax;
  }
}

Paddle.prototype.stop = function () {
  this.speed = 0;
};
