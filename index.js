import UI from "./ui.js";

class Operator extends Function {
	constructor(value, operation) {
		const self = (...args) => operation(...args);
		self.value = value;
		return self;
	}
}

class Calculator {
	constructor(display) {
		this._display = display;
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
		this._currentOperand = "";
	}

	selectOperator(operator) {
		this._addOperand(this._currentOperand);
		this._operator = operator;
	}

	calculate() {
		this._addOperand(this._currentOperand);
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

	reset() {
		this._firstOperand = "";
		this._secondOperand = "";
		this._currentOperand = "";
		this._operator = "";
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
	let calculator = new Calculator(display);

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
			calculator.input(value);
			display(calculator.toString());
		});
	});

	operationButtons.forEach(([id, value, operation]) => {
		const operator = new Operator(value, operation);
		ui.createButton(id, operator.value, () => {
			calculator.selectOperator(operator);
			display(calculator.toString());
		});
	});

	ui.createButton("equals", "=", () => {
		display(calculator.calculate());
		calculator.reset();
	});

	ui.createButton("allClear", "AC", () => {
		calculator.reset();
		display(calculator.toString());
	});

	ui.createButton("delete", "Del", () => {
		calculator.delete();
		display(calculator.toString());
	});
}

export default createApp();
