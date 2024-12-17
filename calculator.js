class Calculator {
  constructor() {
    this.primaryDisplay = "";
    this.secondaryDisplay = "";
  }

  inputChar(char) {
    this.primaryDisplay += char;
  }

  deleteChar() {
    this.primaryDisplay = this.primaryDisplay.slice(0, -1);
  }
}

module.exports = Calculator;
