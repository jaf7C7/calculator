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

	_input(value) {
		this._currentOperand += value;
	}

	input(value) {
		if (!this._currentOperand.includes(".") || value !== ".") {
			this._input(value);
		}
	}

	_selectOperator(operation) {
		this._operation = operation;
	}

	selectOperator(operation) {
		if (this._currentOperand !== "") {
			this.addOperand(this._currentOperand);
			this._selectOperator(operation);
		}
	}

	delete() {
		this._currentOperand = this._currentOperand.slice(0, -1);
	}

	_calculate() {
		return this._operands
			.map((operand) => Number(operand))
			.reduce((a, b) => this._operation.perform(a, b))
	}

	calculate() {
		this.addOperand(this._currentOperand);
		return this._calculate();
	}

	_addOperand(operand) {
		this._operands.push(this._currentOperand);
	}

	addOperand(operand) {
		this._addOperand(operand);
		this._currentOperand = "";
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
		if (this._currentOperand) {
			result += format(this._currentOperand);
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
