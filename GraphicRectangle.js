class GraphicRectangle extends Rectangle {

  constructor(xStart, yStart, width, height, fillColor, strokeColor) {
    super(xStart, yStart, width, height);
    this.fillColor = fillColor;
    this.strokeColor = strokeColor;
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.fillColor;
    ctx.strokeStyle = this.strokeColor;
    ctx.rect(this.xStart, this.yStart, this.width, this.height);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }

  get xMid() {
    return this.xStart + this.width / 2;
  }

  get yMid() {
    return this.yStart + this.height / 2;
  }

}
