class Calculator {
	#primaryDisplay;
	#secondaryDisplay;
	#currentOperand;
	#previousOperand;
	#calculationString;
	#operator;

	constructor(primaryDisplay, secondaryDisplay) {
		this.#primaryDisplay = primaryDisplay;
		this.#secondaryDisplay = secondaryDisplay;
		this.#currentOperand = "";
		this.#previousOperand = "";
		this.#calculationString = "";
		this.#operator = "";
	}

	#updateDisplay() {
		this.#primaryDisplay.update(this.#currentOperand);
		this.#secondaryDisplay.update(this.#calculationString);
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
		this.#primaryDisplay.update("");
		this.#secondaryDisplay.update("");
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

	#chainingCalculations() {
		return this.#operator && this.#previousOperand && this.#currentOperand;
	}

	selectOperation(operator) {
		this.#validateOperator(operator);
		if (this.#chainingCalculations()) {
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
}

module.exports = Calculator;
