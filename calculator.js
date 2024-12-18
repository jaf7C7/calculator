class Calculator {
  constructor() {
    this.primaryDisplay = "";
    this.secondaryDisplay = "";
    this.currentOperand = "";
    this.previousOperand = "";
    this.previousCalculation = "";
    this.operator = "";
  }

  updateDisplay() {
    this.primaryDisplay = this.currentOperand;
    this.secondaryDisplay =
      this.previousCalculation || this.previousOperand.concat(this.operator);
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
    this.previousCalculation = "";
    this.primaryDisplay = "";
    this.secondaryDisplay = "";
  }

  selectOperation(operator) {
    if (RegExp(/[^-+*/]/).test(operator)) {
      throw new TypeError(`Illegal operator: '${operator}'`);
    }
    if (this.primaryDisplay === "") {
      return;
    }
    this.operator = operator;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
    this.updateDisplay();
  }

  calculate() {
    const result = Number(this.previousOperand) + Number(this.currentOperand);
    this.previousCalculation = this.previousOperand
      .concat(this.operator)
      .concat(this.currentOperand);
    this.currentOperand = String(result);
    this.updateDisplay();
  }
}

module.exports = Calculator;
