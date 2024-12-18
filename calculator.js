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

  clearAll() {
    this.primaryDisplay = "";
    this.secondaryDisplay = "";
  }

  acceptOperand() {
    this.secondaryDisplay = this.primaryDisplay;
    this.primaryDisplay = "";
  }

  selectOperation(operator) {
    this.acceptOperand();
    this.secondaryDisplay += operator;
  }
}

module.exports = Calculator;
