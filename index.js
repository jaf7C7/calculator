import UI from "./ui.js";

class Operator extends Function {
	constructor(value, operation) {
		const self = (...args) => operation(...args);
		self.value = value;
		return self;
	}
}

class Button {
	constructor(id, value, onClick) {
		this.id = id;
		this.value = value;
		this.onClick = onClick;
	}
}

class OperationButton extends Button {
	constructor(id, operator) {
		const onClick = function (calculator) {
			calculator.selectOperator(this.operator);
		};
		super(id, operator.value, onClick);
		this.operator = operator;
	}
}

class InputButton {
	constructor(id, value) {
		this.id = id;
		this.value = value;
	}

	onClick(calculator) {
		calculator.input(this.value);
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

const add = new Operator("+", (a, b) => a + b);
const subtract = new Operator("-", (a, b) => a - b);
const multiply = new Operator("*", (a, b) => a * b);
const divide = new Operator("/", (a, b) => a / b);

const inputButtons = [
	new InputButton("one", 1),
	new InputButton("two", 2),
	new InputButton("three", 3),
	new InputButton("four", 4),
	new InputButton("five", 5),
	new InputButton("six", 6),
	new InputButton("seven", 7),
	new InputButton("eight", 8),
	new InputButton("nine", 9),
	new InputButton("zero", 0),
	new InputButton("point", ".")
];

const operationButtons = [
	new OperationButton("plus", add),
	new OperationButton("minus", subtract),
	new OperationButton("times", multiply),
	new OperationButton("divide", divide),
];

const deleteBtn = new Button("delete", "Del", (calculator) => {
	calculator.delete();
});

const clearBtn = new Button("allClear", "AC", (calculator) => {
	calculator.clear();
});

const equalsBtn = new Button("equals", "=", (calculator) => {
	calculator.calculate();
});

function addKeybinding(callback) {
	document.body.addEventListener("keydown", (event) => {
		callback(event);
	});
}

function createInputButton(ui, calculator, btn) {
	ui.createButton(btn.id, btn.value, () => {
		btn.onClick(calculator);
	});
}

function createOperationButton(ui, calculator, btn) {
	ui.createButton(btn.id, btn.value, () => {
		btn.onClick(calculator);
	});
}

function createEqualsButton(ui, calculator, btn) {
	ui.createButton(btn.id, btn.value, () => {
		btn.onClick(calculator);
	});
}

function createClearButton(ui, calculator, btn) {
	ui.createButton(btn.id, btn.value, () => {
		btn.onClick(calculator);
	});
}

function createDeleteButton(ui, calculator, btn) {
	ui.createButton(btn.id, btn.value, () => {
		btn.onClick(calculator);
	});
}

function createKeypad(
	ui,
	calculator,
	inputButtons,
	operationButtons,
	deleteBtn,
	clearBtn,
	equalsBtn
) {
	inputButtons.forEach((btn) => {
		createInputButton(ui, calculator, btn);
	});

	operationButtons.forEach((btn) => {
		createOperationButton(ui, calculator, btn);
	});

	createEqualsButton(ui, calculator, equalsBtn);
	createClearButton(ui, calculator, clearBtn);
	createDeleteButton(ui, calculator, deleteBtn);

	addKeybinding((event) => {
		handleButtonPress(calculator, event.key, event.ctrlKey);
	});
}

function handleButtonPress(calculator, button, ctrlKey) {
	if (button.match(/[.0-9]/)) {
		calculator.input(button)
	} else if (button === "+") {
		calculator.selectOperator(add);
	} else if (button === "-") {
		calculator.selectOperator(subtract);
	} else if (button === "*") {
		calculator.selectOperator(multiply);
	} else if (button.match(/[/%]/)) {
		calculator.selectOperator(divide);
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

function createApp() {
	const ui = new UI();
	const display = ui.createDisplay();
	let calculator = new Calculator(display);

	createKeypad(
		ui,
		calculator,
		inputButtons,
		operationButtons,
		deleteBtn,
		clearBtn,
		equalsBtn,
	);
}

export default createApp;
