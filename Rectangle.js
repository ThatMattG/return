class Rectangle {

  constructor(xStart, yStart, width, height) {
    this.xStart = xStart;
    this.yStart = yStart;
    this.width = width;
    this.height = height;
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

}
