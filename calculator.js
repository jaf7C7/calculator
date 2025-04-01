function format(str) {
	let result = "";
	if (str === ".") {
		result = "0.";
	} else if (String(str).match(/\d+\.0*$/) || str === "-") {
		result = str;
	} else if (str !== "") {
		result = Number(str).toLocaleString();
	}
	return result;
}

class Calculation {
	constructor() {
		this._operands = [];
		this._operation = "";
	}

	selectOperator(operation) {
		if (this._operation !== "" && this._operands.length > 1) {
			this._operands = [String(this.calculate())];
		}
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
		const result = this._operands.map((o) => format(o));
		result.splice(1, 0, this._operation.toString());
		return result.join('');
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
		if (this.currentOperand !== "" && this.currentOperand !== "-") {
			this._addOperand(this.currentOperand);
			this.calculation.selectOperator(operator);
		} else if (operator.toString() === "-") {
			this.currentOperand = "-";
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
		if (this.currentOperand === "") {
			this.calculation.selectOperator("");
		}
		this.currentOperand = this.currentOperand.slice(0, -1);
		this.updateDisplay();
	}

	updateDisplay() {
		this.display(this.calculation.toString() + format(this.currentOperand));
	}
}

export default Calculator;
