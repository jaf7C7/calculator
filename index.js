import UI from "./ui.js";

function addKeybinding(callback) {
	document.body.addEventListener("keydown", (event) => {
		callback(event);
	});
}

function createInputButton(ui, calculator, id, value) {
	ui.createButton(id, value, () => {
		calculator.input(value);
	});
}

function createOperationButton(ui, calculator, id, value, operation) {
	const operator = new Operator(value, operation);
	ui.createButton(id, operator.value, () => {
		calculator.selectOperator(operator);
	});
}

function createEqualsButton(ui, calculator) {
	ui.createButton("equals", "=", () => {
		calculator.calculate();
	});
}

function createClearButton(ui, calculator) {
	ui.createButton("allClear", "AC", () => {
		calculator.clear();
	});
}

function createDeleteButton(ui, calculator) {
	ui.createButton("delete", "Del", () => {
		calculator.delete();
	});
}

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
		this._display(this._toString());
	}

	_addOperand(operand) {
		if (operand !== "") {
			if (!this._firstOperand) {
				this._firstOperand = operand;
			} else {
				this._secondOperand = operand;
			}
		}
		this._currentOperand = "";
	}

	selectOperator(operator) {
		this._addOperand(this._currentOperand);
		this._operator = operator;
		this._display(this._toString());
	}

	calculate() {
		this._addOperand(this._currentOperand);
		const result = this._operator(
			Number(this._firstOperand),
			Number(this._secondOperand),
		);
		this._display(format(result));
		this._reset();
	}

	_toString() {
		let str = "";
		if (this._firstOperand !== "") {
			str += `${format(this._firstOperand)}${this._operator.value}`;
		}
		if (this._currentOperand !== "") {
			str += format(this._currentOperand);
		}
		return str;
	}

	delete() {
		this._currentOperand = this._currentOperand.slice(0, -1);
		this._display(this._toString());
	}

	clear() {
		this._reset();
		this._display(this._toString());
	}

	_reset() {
		this._firstOperand = "";
		this._secondOperand = "";
		this._currentOperand = "";
		this._operator = "";
	}
}

function createKeypad(calculator) {
	const keypad = {
		1: (k) => calculator.input(k),
		2: (k) => calculator.input(k),
		3: (k) => calculator.input(k),
		4: (k) => calculator.input(k),
		5: (k) => calculator.input(k),
		6: (k) => calculator.input(k),
		7: (k) => calculator.input(k),
		8: (k) => calculator.input(k),
		9: (k) => calculator.input(k),
		".": (k) => calculator.input(k),
		"+": (k) => calculator.selectOperator(new Operator(k, add)),
		"-": (k) => calculator.selectOperator(new Operator(k, subtract)),
		"*": (k) => calculator.selectOperator(new Operator(k, multiply)),
		"/": (k) => calculator.selectOperator(new Operator(k, divide)),
		"%": (k) => calculator.selectOperator(new Operator("/", divide)),
		"Delete": (k) => calculator[(event?.ctrlKey) ? "clear" : "delete"](),
		"Backspace": (k) => calculator[(event?.ctrlKey) ? "clear" : "delete"](),
		"=": (k) => calculator.calculate(),
		"Enter": (k) => calculator.calculate(),
	}
	return keypad;
}

function handleButtonPress(calculator, button) {
	const keypad = createKeypad(calculator);
	keypad[button](button);
}

function format(str) {
	let result = "";
	if (str === ".") {
		result = "0.";
	} else if (String(str).match(/\d+\.0*$/)) {
		result = str;
	} else {
		result = Number(str).toLocaleString();
	}
	return result;
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
		["point", "."],
	];

	const operationButtons = [
		["plus", "+", add],
		["minus", "-", subtract],
		["times", "*", multiply],
		["divide", "/", divide],
	];

	inputButtons.forEach(([id, value]) => {
		createInputButton(ui, calculator, id, value);
	});

	operationButtons.forEach(([id, value, operation]) => {
		createOperationButton(ui, calculator, id, value, operation);
	});

	createEqualsButton(ui, calculator);
	createClearButton(ui, calculator);
	createDeleteButton(ui, calculator);

	addKeybinding((event) => {
		handleButtonPress(calculator, event.key);
	});
}

export default createApp;
