class Calculator {
  constructor() {
    this.primaryDisplay = "";
    this.secondaryDisplay = "";
  }

  inputChar(char) {
    if (RegExp(/[^.0-9]/).test(char)) {
      throw new TypeError(`Illegal input: '${char}'`);
    }
    this.primaryDisplay += char;
  }

  deleteChar() {
    this.primaryDisplay = this.primaryDisplay.slice(0, -1);
  }

  clearAll() {
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
    this.secondaryDisplay = this.primaryDisplay + operator;
    this.primaryDisplay = "";
  }

  calculate() {
    const firstOperand = Number(this.secondaryDisplay.slice(0, -1));
    const secondOperand = Number(this.primaryDisplay);
    const operator = this.secondaryDisplay.at(-1);
    let result;
    switch (operator) {
      case "+":
        result = firstOperand + secondOperand;
        break;
    }
    this.secondaryDisplay += this.primaryDisplay;
    this.primaryDisplay = String(result);
  }
}

module.exports = Calculator;
