class Calculator {
  constructor() {
    this.primaryDisplay = "";
    this.secondaryDisplay = "";
    this.currentOperand = "";
    this.previousOperand = "";
    this.currentCalculation = "";
    this.operator = "";
  }

  updateDisplay() {
    this.primaryDisplay = this.currentOperand;
    this.secondaryDisplay = this.currentCalculation;
  }

  inputChar(char) {
    if (RegExp(/[^.0-9]/).test(char)) {
      throw new TypeError(`Illegal input: '${char}'`);
    }
    this.currentOperand += char;
    this.updateDisplay();
  }

  deleteChar() {
    this.currentOperand = this.currentOperand.slice(0, -1);
    this.updateDisplay();
  }

  clearAll() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operator = "";
    this.currentCalculation = "";
    this.primaryDisplay = "";
    this.secondaryDisplay = "";
  }

  selectOperation(operator) {
    if (RegExp(/[^-+*/]/).test(operator)) {
      throw new TypeError(`Illegal operator: '${operator}'`);
    }
    if (this.currentOperand) {
      this.operator = operator;
      this.currentCalculation = this.currentOperand.concat(this.operator);
      this.previousOperand = this.currentOperand;
      this.currentOperand = "";
    }
    this.updateDisplay();
  }

  calculate() {
    const result = Number(this.previousOperand) + Number(this.currentOperand);
    this.currentCalculation = this.previousOperand
      .concat(this.operator)
      .concat(this.currentOperand);
    this.currentOperand = String(result);
    this.updateDisplay();
    // Get ready for a new calculation:
    this.previousOperand = this.currentOperand;
    this.currentCalculation = this.previousOperand;
    this.currentOperand = "";
  }
}

module.exports = Calculator;
