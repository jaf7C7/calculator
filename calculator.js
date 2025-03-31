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

	_addOperand(operand) {
		this._operands.push(this.currentOperand);
	}

	addOperand(operand) {
		this._addOperand(operand);
		this.currentOperand = "";
	}

	_toString() {
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

	toString() {
		let result = "";
		if (this._toString()) {
			result += this._toString();
		}
		if (this.currentOperand) {
			result += format(this.currentOperand);
		}
		return result;
	}
}

class Calculator {
	constructor(display) {
		this.display = display;
		this.calculation = new Calculation();
	}

	input(value) {
		if (!this.calculation.currentOperand.includes(".") || value !== ".") {
			this.calculation.currentOperand += value;
		}
		this.updateDisplay();
	}

	selectOperator(operator) {
		if (this.calculation.currentOperand !== "") {
			this.calculation.addOperand(this.calculation.currentOperand);
			this.calculation.selectOperator(operator);
		}
		this.updateDisplay();
	}

	calculate() {
		this.calculation.addOperand(this.calculation.currentOperand);
		const result = this.calculation.calculate();
		this.display(format(result));
		this.calculation = new Calculation();
	}

	clear() {
		this.calculation = new Calculation();
		this.updateDisplay();
	}

	delete() {
		this.calculation.currentOperand =
			this.calculation.currentOperand.slice(0, -1);
		this.updateDisplay();
	}

	updateDisplay() {
		this.display(this.calculation.toString());
	}
}

export default Calculator;
