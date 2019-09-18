class IterativeClickable extends GraphicRectangle {

  constructor(object, xStart, yStart, width, height, fillColor, strokeColor) {
    super(xStart, yStart, width, height, fillColor, strokeColor);
    this.object = object;
  }

  handleClickDown() {
    this.object.next();
  }

  get curr() {
    return this.object.curr;
  }

  get toString() {
    return this.object.toString;
  }

}
