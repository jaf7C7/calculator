import UI from "./ui.js";

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

function addKeybinding(callback) {
	document.body.addEventListener("keydown", (event) => {
		callback(event);
	});
}

function createInputButton(ui, calculator, id, value) {
	const btn = {
		id: id,
		value: value,
		onClick: function (calculator) {
			calculator.input(this.value);
		},
	};
	ui.createButton(btn.id, btn.value, () => {
		btn.onClick(calculator);
	});
}

function createOperationButton(ui, calculator, id, value, operation) {
	const operator = new Operator(value, operation);
	const btn = {
		id: id,
		value: value,
		onClick: function (calculator) {
			calculator.selectOperator(operator);
		},
	};
	ui.createButton(btn.id, btn.value, () => {
		btn.onClick(calculator);
	});
}

function createEqualsButton(ui, calculator) {
	const btn = {
		id: "equals",
		value: "=",
		onClick: function (calculator) {
			calculator.calculate();
		},
	};
	ui.createButton(btn.id, btn.value, () => {
		btn.onClick(calculator);
	});
}

function createClearButton(ui, calculator) {
	const btn = {
		id: "allClear",
		value: "AC",
		onClick: function (calculator) {
			calculator.clear();
		},
	};
	ui.createButton(btn.id, btn.value, () => {
		btn.onClick(calculator);
	});
}

function createDeleteButton(ui, calculator) {
	const btn = {
		id: "delete",
		value: "Del",
		onClick: function (calculator) {
			calculator.delete();
		},
	};
	ui.createButton(btn.id, btn.value, () => {
		btn.onClick(calculator);
	});
}

function createKeypad(ui, calculator, inputButtons, operationButtons) {
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
		handleButtonPress(calculator, event.key, event.ctrlKey);
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
		if (!this._currentOperand.includes(".") || value !== ".") {
			this._currentOperand += value;
			this._display(this._toString());
		}
	}

	selectOperator(operator) {
		this._addOperand(this._currentOperand);
		this._operator = operator;
		this._display(this._toString());
	}

	delete() {
		this._currentOperand = this._currentOperand.slice(0, -1);
		this._display(this._toString());
	}

	clear() {
		this._reset();
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

	_reset() {
		this._firstOperand = "";
		this._secondOperand = "";
		this._currentOperand = "";
		this._operator = "";
	}
}

function handleButtonPress(calculator, button, ctrlKey) {
	if (button.match(/[.0-9]/)) {
		calculator.input(button)
	} else if (button === "+") {
		calculator.selectOperator(new Operator("+", add));
	} else if (button === "-") {
		calculator.selectOperator(new Operator("-", subtract));
	} else if (button === "*") {
		calculator.selectOperator(new Operator("*", multiply));
	} else if (button.match(/[/%]/)) {
		calculator.selectOperator(new Operator("/", divide));
	} else if (button.match(/Delete|Backspace/)) {
		calculator[(ctrlKey) ? "clear" : "delete"]();
	} else if (button.match(/=|Enter/)) {
		calculator.calculate();
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

	createKeypad(ui, calculator, inputButtons, operationButtons);
}

export default createApp;
