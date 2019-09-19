class StrategySelection {

  constructor(startMode = 0) {
    this.modes = [
      [ new HumanMoveStrategy(), "You" ],
      [ new AutoMoveTowardStrategy(0.3), "AI 1.0" ],
      [ new AutoMoveTowardStrategy(0.5), "AI 1.1" ],
      [ new AutoMoveTowardStrategy(0.8), "AI 1.2" ],
      [ new AutoMoveTowardStrategy(1), "AI 1.3" ],
      [ new AutoMoveAlwaysStrategy(0.3), "AI 2.0" ],
      [ new AutoMoveAlwaysStrategy(0.5), "AI 2.1" ],
      [ new AutoMoveAlwaysStrategy(0.8), "AI 2.2" ]
    ];

    this.modeIndex = startMode;
  }

  next() {
    this.modeIndex = (this.modeIndex + 1) % this.modes.length;
  }

  get modeNum() {
    return this.modeIndex;
  }

  get mode() {
    return this.modes[this.modeIndex][0];
  }

  get curr() {
    return (this.modes[this.modeIndex][0]);
  }

  get toString() {
    return this.modes[this.modeIndex][1];
  }

}
