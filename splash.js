var strategySelector1, strategySelector2;
var splashScreenElements = [];

function startSplash() {
  makeModes(splashScreenElements);

  // Handle clicks
  canv.addEventListener("click", handleSplashClick);

  // // Enabling touchstart listener? Enable the removeEventListener in handleSplashInteraction()
  // canv.addEventListener("touchstart", handleSplashTouch);

  drawSplash();
}

function makeModes(elements) {
  let xStart = canv.width / 12;
  let yStart = canv.height * 2/3;
  let width = canv.width / 2.6;
  let height = canv.height / 5;

  strategySelector1 = new IterativeClickable(
      new StrategySelection(0),
      xStart,
      yStart,
      width,
      height,
      "beige",
      undefined
  );
  elements.push(strategySelector1);

  strategySelector2 = new IterativeClickable(
      new StrategySelection(0),
      canv.width - xStart - width,
      yStart,
      width,
      height,
      "beige",
      undefined
  );
  elements.push(strategySelector2);

}

function handleSplashClick(event) {
  clickX = event.offsetX;
  clickY = event.offsetY;

  handleSplashInteraction(clickX, clickY);
}

function handleSplashInteraction(clickX, clickY) {
  console.log(event);

  let elementClicked = false;

  for (let index in splashScreenElements) {
    let element = splashScreenElements[index];
    if (element.withinBoundary(clickX, clickY)) {
      element.handleClickDown();
      elementClicked = true;
      break;
    }
  }

  if (elementClicked) {
    drawSplash();
  } else {
    // Remove click listener and start game
    canv.removeEventListener("click", handleSplashClick);
    // canv.removeEventListener("touchstart", handleSplashTouch);
    startGame(strategySelector1.curr, strategySelector2.curr);
  }
}
