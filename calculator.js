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
}

module.exports = Calculator;
