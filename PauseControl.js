class PauseControl extends GraphicRectangle {

  constructor(xStart, yStart, width, height, fillColor, strokeColor) {
    super(xStart, yStart, width, height, fillColor, strokeColor);
    this.delayedPauseToggle = debounce(togglePause, 100, false);
  }

  draw() {
    ctx.font = "20px Courier";
    ctx.fillStyle = "silver";

    let msg = "pause";

    ctx.textAlign = "center";
    ctx.fillText(msg, this.xMid, this.yMid);
  }

  handleClickDown() {
    this.delayedPauseToggle();
  }

  handleClickUp() {
  }

}

function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this, args = arguments;
    var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};
