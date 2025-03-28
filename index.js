class UI {
	constructor() {
		this._element = document.getElementById("calculator");
	}

	createElement(tagName, id, textContent = null) {
		const element = document.createElement(tagName);
		element.id = id;
		if (textContent !== null) {
			element.textContent = textContent;
		}
		this._element.appendChild(element);
		return element;
	}

	createDisplay() {
		const element = this.createElement("div", "display");
		return (text) => {
			element.textContent = text;
		};
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

class Operator extends Function {
	constructor(value, operation) {
		const self = (...args) => operation(...args);
		self.value = value;
		return self;
	}
}

const add = new Operator("+", (a, b) => a + b);
const subtract = new Operator("-", (a, b) => a - b);
const multiply = new Operator("*", (a, b) => a * b);
const divide = new Operator("/", (a, b) => a / b);

function addKeybinding(callback) {
	document.body.addEventListener("keydown", (event) => {
		callback(event);
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

	[
		{id: "one", value: 1, onClick: function (calculator) { calculator.input(this.value); }},
		{id: "two", value: 2, onClick: function (calculator) { calculator.input(this.value); }},
		{id: "three", value: 3, onClick: function (calculator) { calculator.input(this.value); }},
		{id: "four", value: 4, onClick: function (calculator) { calculator.input(this.value); }},
		{id: "five", value: 5, onClick: function (calculator) { calculator.input(this.value); }},
		{id: "six", value: 6, onClick: function (calculator) { calculator.input(this.value); }},
		{id: "seven", value: 7, onClick: function (calculator) { calculator.input(this.value); }},
		{id: "eight", value: 8, onClick: function (calculator) { calculator.input(this.value); }},
		{id: "nine", value: 9, onClick: function (calculator) { calculator.input(this.value); }},
		{id: "zero", value: 0, onClick: function (calculator) { calculator.input(this.value); }},
		{id: "point", value: ".", onClick: function (calculator) { calculator.input(this.value); }},
		{id: "plus", operator: add, onClick: function (calculator) { calculator.selectOperator(this.operator); }},
		{id: "minus", operator: subtract, onClick: function (calculator) { calculator.selectOperator(this.operator); }},
		{id: "times", operator: multiply, onClick: function (calculator) { calculator.selectOperator(this.operator); }},
		{id: "divide", operator: divide, onClick: function (calculator) { calculator.selectOperator(this.operator); }},
		{id: "equals", value: "=", onClick: (calculator) => { calculator.calculate(); }},
		{id: "allClear", value: "AC", onClick: (calculator) => { calculator.clear(); }},
		{id: "delete", value: "Del", onClick: (calculator) => { calculator.delete(); }},
	].forEach((btn) => {
		const b = ui.createElement("button", btn.id, btn.value);
		b.addEventListener("click", () => {
			btn.onClick(calculator);
		});
	});
	addKeybinding((event) => {
		handleButtonPress(calculator, event.key, event.ctrlKey);
	});
}

export default createApp;
