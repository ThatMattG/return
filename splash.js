var strategySelector1, strategySelector2;
var splashScreenElements = [];

function startSplash() {
  makeModes(splashScreenElements);

  // Handle clicks
  canv.addEventListener("click", handleSplashClick, false);

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
      height
  );
  elements.push(strategySelector1);

  strategySelector2 = new IterativeClickable(
      new StrategySelection(0),
      canv.width - xStart - width,
      yStart,
      width,
      height
  );
  elements.push(strategySelector2);

}

function handleSplashClick(event) {
  clickX = event.pageX;
  clickY = event.pageY;

  let elementClicked = false;
  for (let index in splashScreenElements) {
    let element = splashScreenElements[index];
    if (element.withinBoundary(clickX, clickY)){
      element.handleClick();
      elementClicked = true;
      break;
    }
  }

  if (elementClicked) {
    drawSplash();
  } else {
    startGame(strategySelector1.curr, strategySelector2.curr);
  }
}
