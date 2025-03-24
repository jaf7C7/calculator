import UI from "./ui.js";

class Operator extends Function {
	constructor(value, operation) {
		const self = (...args) => operation(...args);
		self.value = value;
		return self;
	}
}

class Calculation {
	constructor() {
		this._firstOperand = "";
		this._secondOperand = "";
		this._currentOperand = "";
		this._operator = "";
	}

	input(value) {
		this._currentOperand += value;
	}

	_addOperand(operand) {
		if (operand !== "") {
			const _operand = Number(operand);
			if (!this._firstOperand) {
				this._firstOperand = _operand;
			} else {
				this._secondOperand = _operand;
			}
		}
	}

	selectOperator(operator) {
		this._addOperand(this._currentOperand);
		this._currentOperand = "";
		this._operator = operator;
	}

	calculate() {
		this._addOperand(this._currentOperand);
		this._currentOperand = "";
		return this._operator(this._firstOperand, this._secondOperand);
	}

	toString() {
		let str = "";
		if (this._firstOperand !== "") {
			str += `${formatNumber(this._firstOperand)}${this._operator.value}`;
		}
		if (this._currentOperand !== "") {
			str += formatNumber(this._currentOperand);
		}
		return str;
	}

	delete() {
		this._currentOperand = this._currentOperand.slice(0, -1);
	}
}

function formatNumber(str) {
	return ((str.length > 15) ? BigInt(str) : Number(str)).toLocaleString();
}

function add(a, b) {
	return a + b;
}

function subtract(a, b) {
	return a - b;
}

function multiply(a, b) {
	return a * b;
}

function divide(a, b) {
	return a / b;
}

function createApp() {
	const ui = new UI();
	const display = ui.createDisplay();
	let calculation = new Calculation();

	const inputButtons = [
		["one", 1],
		["two", 2],
		["three", 3],
		["four", 4],
		["five", 5],
		["six", 6],
		["seven", 7],
		["eight", 8],
		["nine", 9],
		["zero", 0],
	];

	const operationButtons = [
		["plus", "+", add],
		["minus", "-", subtract],
		["times", "*", multiply],
		["divide", "/", divide],
	];

	inputButtons.forEach(([id, value]) => {
		ui.createButton(id, value, () => {
			calculation.input(value);
			display(calculation.toString());
		});
	});

	operationButtons.forEach(([id, value, operation]) => {
		const operator = new Operator(value, operation);
		ui.createButton(id, operator.value, () => {
			calculation.selectOperator(operator);
			display(calculation.toString());
		});
	});

	ui.createButton("equals", "=", () => {
		display(calculation.calculate());
		calculation = new Calculation();
	});

	ui.createButton("allClear", "AC", () => {
		calculation = new Calculation();
		display(calculation.toString());
	});

	ui.createButton("delete", "Del", () => {
		calculation.delete();
		display(calculation.toString());
	});
}

export default createApp();
