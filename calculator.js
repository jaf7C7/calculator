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
		this._currentOperand = "";
		this._operation = "";
	}

	input(value) {
		if (!this._currentOperand.includes(".") || value !== ".") {
			this._currentOperand += value;
		}
	}

	selectOperator(operation) {
		if (this._currentOperand !== "") {
			this._addOperand(this._currentOperand);
			this._operation = operation;
		}
	}

	delete() {
		this._currentOperand = this._currentOperand.slice(0, -1);
	}

	calculate() {
		this._addOperand(this._currentOperand);
		return this._operands
			.map((operand) => Number(operand))
			.reduce((a, b) => this._operation.perform(a, b))
	}

	_addOperand(operand) {
		this._operands.push(this._currentOperand);
		this._currentOperand = "";
	}

	toString() {
		return this._operands.concat(this._currentOperand)
			.map((operand) => format(operand))
			.join(this._operation.toString())
	}
}

class Calculator {
	constructor(display) {
		this.display = display;
		this.calculation = new Calculation();
	}

	input(value) {
		this.calculation.input(value);
		this.display(this.calculation.toString());
	}

	selectOperator(operator) {
		this.calculation.selectOperator(operator);
		this.display(this.calculation.toString());
	}

	calculate() {
		const result = this.calculation.calculate();
		this.display(format(result));
		this.calculation = new Calculation();
	}

	clear() {
		this.calculation = new Calculation();
		this.display(this.calculation.toString());
	}

	delete() {
		this.calculation.delete();
		this.display(this.calculation.toString());
	}
}

export default Calculator;
