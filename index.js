import UI from "./ui.js";

function createInputButton(ui, calculator, id, value) {
	ui.createButton(id, value, () => {
		calculator.input(value);
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
		const operator = new Operator(value, operation);
		ui.createButton(id, operator.value, () => {
			calculator.selectOperator(operator);
		});
	});

	ui.createButton("equals", "=", () => {
		calculator.calculate();
	});

	ui.createButton("allClear", "AC", () => {
		calculator.clear();
	});

	ui.createButton("delete", "Del", () => {
		calculator.delete();
	});

	document.body.addEventListener("keydown", (event) => {
		switch (event.key) {
			case "0":
			case "1":
			case "2":
			case "3":
			case "4":
			case "5":
			case "6":
			case "7":
			case "8":
			case "9":
			case ".":
				calculator.input(event.key);
				break;
			case "+":
				calculator.selectOperator(new Operator("+", add));
				break;
			case "-":
				calculator.selectOperator(new Operator("-", subtract));
				break;
			case "*":
				calculator.selectOperator(new Operator("*", multiply));
				break;
			case "/":
			case "%":
				calculator.selectOperator(new Operator("/", divide));
				break;
			case "Delete":
			case "Backspace":
				if (event.ctrlKey) {
					calculator.clear();
				} else {
					calculator.delete();
				}
				break;
			case "Enter":
				calculator.calculate();
				break;
		}
	});
}

export default createApp;
