class Calculator {
  constructor() {
    this.primaryDisplay = "";
    this.secondaryDisplay = "";
    this.currentOperand = "";
    this.previousOperand = "";
    this.currentCalculation = "";
    this.operator = "";
  }

  #updateDisplay() {
    this.primaryDisplay = this.currentOperand;
    this.secondaryDisplay = this.currentCalculation;
  }

  inputChar(char) {
    if (RegExp(/[^.0-9]/).test(char)) {
      throw new TypeError(`Illegal input: '${char}'`);
    }
    this.currentOperand += char;
    this.#updateDisplay();
  }

  deleteChar() {
    this.currentOperand = this.currentOperand.slice(0, -1);
    this.#updateDisplay();
  }

  clearAll() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operator = "";
    this.currentCalculation = "";
    this.primaryDisplay = "";
    this.secondaryDisplay = "";
  }

  #newOperand() {
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
    this.currentCalculation = this.previousOperand;
    if (this.operator) {
      this.currentCalculation += this.operator;
    }
  }

  selectOperation(operator) {
    if (RegExp(/[^-+*/]/).test(operator)) {
      throw new TypeError(`Illegal operator: '${operator}'`);
    }
    if (this.currentOperand) {
      this.operator = operator;
      this.#newOperand();
    }
    this.#updateDisplay();
  }

  calculate() {
    let result;
    switch (this.operator) {
      case "+":
        result = Number(this.previousOperand) + Number(this.currentOperand);
        break;
      case "*":
        result = Number(this.previousOperand) * Number(this.currentOperand);
        break;
      case "/":
        result = Number(this.previousOperand) / Number(this.currentOperand);
        break;
      case "-":
        result = Number(this.previousOperand) - Number(this.currentOperand);
        break;
    }
    this.currentCalculation += this.currentOperand;
    this.currentOperand = String(result);
    this.#updateDisplay();
    this.operator = "";
    this.#newOperand();
  }
}

module.exports = Calculator;
