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

	input(value) {
		if (!this.currentOperand.includes(".") || value !== ".") {
			this.currentOperand += value;
		}
	}

	_selectOperator(operation) {
		this._operation = operation;
	}

	selectOperator(operation) {
		if (this.currentOperand !== "") {
			this.addOperand(this.currentOperand);
			this._selectOperator(operation);
		}
	}

	delete() {
		this.currentOperand = this.currentOperand.slice(0, -1);
	}

	_calculate() {
		return this._operands
			.map((operand) => Number(operand))
			.reduce((a, b) => this._operation.perform(a, b))
	}

	calculate() {
		this.addOperand(this.currentOperand);
		return this._calculate();
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
		this.calculation.input(value);
		this.updateDisplay();
	}

	selectOperator(operator) {
		this.calculation.selectOperator(operator);
		this.updateDisplay();
	}

	calculate() {
		const result = this.calculation.calculate();
		this.display(format(result));
		this.calculation = new Calculation();
	}

	clear() {
		this.calculation = new Calculation();
		this.updateDisplay();
	}

	delete() {
		this.calculation.delete();
		this.updateDisplay();
	}

	updateDisplay() {
		this.display(this.calculation.toString());
	}
}

export default Calculator;
