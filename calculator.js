function format(str) {
	let result = "";
	if (str === ".") {
		result = "0.";
	} else if (String(str).match(/\d+\.0*$/)) {
		result = str;
	} else if (str !== "") {
		result = Number(str).toLocaleString();
	}
	return result;
}

class Calculation {
	constructor() {
		this._operands = [];
		this.currentOperand = "";
		this._operation = "";
	}

	selectOperator(operation) {
		this._operation = operation;
	}

	calculate() {
		return this._operands
			.map((operand) => Number(operand))
			.reduce((a, b) => this._operation.perform(a, b))
	}

	addOperand(operand) {
		this._operands.push(operand);
	}

	toString() {
		let result = "";
		if (this._operands[0]) {
			result += format(this._operands[0]);
		}
		if (this._operation) {
			result += this._operation.toString();
		}
		if (this._operands[1]) {
			result += format(this._operands[1]);
		}
		return result;
	}
}

class Calculator {
	constructor(display) {
		this.display = display;
		this.calculation = new Calculation();
		this.currentOperand = "";
	}

	input(value) {
		if (!this.currentOperand.includes(".") || value !== ".") {
			this.currentOperand += value;
		}
		this.updateDisplay();
	}

	_addOperand(operand) {
		this.calculation.addOperand(operand);
		this.currentOperand = "";
	}

	selectOperator(operator) {
		if (this.currentOperand !== "") {
			this._addOperand(this.currentOperand);
			this.calculation.selectOperator(operator);
		}
		this.updateDisplay();
	}

	calculate() {
		this._addOperand(this.currentOperand);
		const result = this.calculation.calculate();
		this.display(format(result));
		this.calculation = new Calculation();
	}

	clear() {
		this.calculation = new Calculation();
		this.currentOperand = "";
		this.updateDisplay();
	}

	delete() {
		this.currentOperand =
			this.currentOperand.slice(0, -1);
		this.updateDisplay();
	}

	updateDisplay() {
		this.display(this.toString());
	}

	toString() {
		let result = "";
		if (this.calculation.toString()) {
			result += this.calculation.toString();
		}
		if (this.currentOperand) {
			result += format(this.currentOperand);
		}
		return result;
	}
}

export default Calculator;
