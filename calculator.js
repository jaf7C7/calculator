class Calculator {
  #ui;
  #currentOperand;
  #previousOperand;
  #calculationString;
  #operator;

  constructor(ui) {
    this.#ui = ui;
    this.#currentOperand = "";
    this.#previousOperand = "";
    this.#calculationString = "";
    this.#operator = "";
  }

  #updateDisplay() {
    this.#ui.primaryDisplay.update(this.#currentOperand);
    this.#ui.secondaryDisplay.update(this.#calculationString);
  }

  #validateInputChar(char) {
    if (RegExp(/[^.0-9]/).test(char)) {
      throw new TypeError(`Illegal input: '${char}'`);
    }
  }

  inputChar(char) {
    this.#validateInputChar(char);
    this.#currentOperand += char;
    this.#updateDisplay();
  }

  deleteChar() {
    this.#currentOperand = this.#currentOperand.slice(0, -1);
    this.#updateDisplay();
  }

  clearAll() {
    this.#currentOperand = "";
    this.#previousOperand = "";
    this.#operator = "";
    this.#calculationString = "";
    this.#updateDisplay();
  }

  #newOperand() {
    this.#previousOperand = this.#currentOperand;
    this.#currentOperand = "";
    this.#calculationString = this.#previousOperand;
    if (this.#operator) {
      this.#calculationString += this.#operator;
    }
  }

  #validateOperator(operator) {
    if (RegExp(/[^-+*/]/).test(operator)) {
      throw new TypeError(`Illegal operator: '${operator}'`);
    }
  }

  #calculationComplete() {
    return this.#operator && this.#previousOperand && this.#currentOperand;
  }

  selectOperation(operator) {
    this.#validateOperator(operator);
    if (this.#calculationComplete()) {
      this.calculate();
      this.#currentOperand = this.#previousOperand;
    }
    if (this.#currentOperand) {
      this.#operator = operator;
      this.#newOperand();
    }
    this.#updateDisplay();
  }

  calculate() {
    let result;
    const [a, b] = [
      Number(this.#previousOperand),
      Number(this.#currentOperand),
    ];
    switch (this.#operator) {
      case "+":
        result = a + b;
        break;
      case "*":
        result = a * b;
        break;
      case "/":
        result = a / b;
        break;
      case "-":
        result = a - b;
        break;
    }
    this.#calculationString += this.#currentOperand;
    this.#currentOperand = String(result);
    this.#updateDisplay();
    this.#operator = "";
    this.#newOperand();
  }

  draw() {
    ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "."].forEach((value) => {
      this.#ui.createButton(value, () => {
        this.inputChar(value);
      });
    });

    this.#ui.createButton("AC", () => {
      this.clearAll();
    });

    this.#ui.createButton("Del", () => {
      this.deleteChar();
    });

    this.#ui.createButton("=", () => {
      this.calculate();
    });

    ["+", "-", "/", "*"].forEach((operator) => {
      this.#ui.createButton(operator, () => {
        this.selectOperation(operator);
      });
    });
  }
}

module.exports = Calculator;
