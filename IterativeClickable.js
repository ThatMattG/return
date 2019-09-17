class IterativeClickable {

  constructor(object, xStart, yStart, width, height, handleClickMethod) {
    this.object = object;
    this.xStart = xStart;
    this.yStart = yStart;
    this.width = width;
    this.height = height;
    // this.handleClick = this.object.handleClickMethod();
  }

  handleClick() {
    this.object.next();
  }

  get curr() {
    return this.object.curr;
  }

  withinBoundary(x, y) {
    if (x >= this.xStart
      && x <= this.xStart + this.width
      && y >= this.yStart
      && y <= this.yStart + this.height){
      return true;
    }
    return false;
  }

  get curr() {
    return this.object.curr;
  }

  get toString() {
    return this.object.toString;
  }
}
