class Calculator {
  constructor() {
    this.primaryDisplay = "";
    this.secondaryDisplay = "";
  }

  appendChar(char) {
    this.primaryDisplay += char;
  }
}

module.exports = Calculator;
