class UI {
	constructor() {
		this._element = document.getElementById("calculator");
	}

	createElement(tagName, id = null, textContent = null) {
		const element = document.createElement(tagName);
		if (id !== null) {
			element.id = id;
		}
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

	createButton(id, value, function_, keybindings) {
		let btn;
		btn = this.createElement("button", id, value);
		btn.addEventListener("click", () => {
			function_();
		});
		document.body.addEventListener("keydown", (event) => {
			const keybinding = keybindings.find((key) => {
				return key.value === event.key && key.ctrlKey === event.ctrlKey;
			});
			if (keybinding !== undefined) {
				function_();
			}
		});
	}
}

class Calculation {
	constructor() {
		this._operands = [];
		this._currentOperand = "";
		this._operation = new Operation("", () => undefined);
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
			.map((o) => Number(o))
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

class Operation {
	constructor(symbol, operation) {
		this._symbol = symbol;
		this._operation = operation;
	}

	perform(a, b) {
		return this._operation(a, b);
	}

	toString() {
		return this._symbol;
	}
}

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

function createApp() {
	const ui = new UI();
	const display = ui.createDisplay();
	const calculator = new Calculator(display);

	const subtract = new Operation("-", (a, b) => a - b);
	const multiply = new Operation("*", (a, b) => a * b);
	const divide = new Operation("/", (a, b) => a / b);
	const add = new Operation("+", (a, b) => a + b);

	const inputButtons = [
		{
			id: "one",
			value: "1",
			function: "input",
			args: ["1"],
			keybindings: [{value: "1", ctrlKey: false}],
		},
		{
			id: "two",
			value: "2",
			function: "input",
			args: ["2"],
			keybindings: [{value: "2", ctrlKey: false}],
		},
		{
			id: "three",
			value: "3",
			function: "input",
			args: ["3"],
			keybindings: [{value: "3", ctrlKey: false}],
		},
		{
			id: "four",
			value: "4",
			function: "input",
			args: ["4"],
			keybindings: [{value: "4", ctrlKey: false}],
		},
		{
			id: "five",
			value: "5",
			function: "input",
			args: ["5"],
			keybindings: [{value: "5", ctrlKey: false}],
		},
		{
			id: "six",
			value: "6",
			function: "input",
			args: ["6"],
			keybindings: [{value: "6", ctrlKey: false}],
		},
		{
			id: "seven",
			value: "7",
			function: "input",
			args: ["7"],
			keybindings: [{value: "7", ctrlKey: false}],
		},
		{
			id: "eight",
			value: "8",
			function: "input",
			args: ["8"],
			keybindings: [{value: "8", ctrlKey: false}],
		},
		{
			id: "nine",
			value: "9",
			function: "input",
			args: ["9"],
			keybindings: [{value: "9", ctrlKey: false}],
		},
		{
			id: "zero",
			value: "0",
			function: "input",
			args: ["0"],
			keybindings: [{value: "0", ctrlKey: false}],
		},
		{
			id: "point",
			value: ".",
			function: "input",
			args: ["."],
			keybindings: [{value: ".", ctrlKey: false}],
		},
	]

	inputButtons.forEach((btn) => {
		ui.createButton(btn.id, btn.value, () => {
			calculator[btn.function](...btn.args);
		}, btn.keybindings);
	});

	const operationButtons = [
		{
			id: "plus",
			value: "+",
			operator: add,
			keybindings: [{value: "+", ctrlKey: false}],
		},
		{
			id: "minus",
			value: "-",
			operator: subtract,
			keybindings: [{value: "-", ctrlKey: false}],
		},
		{
			id:"times",
			value: "*",
			operator: multiply,
			keybindings: [{value: "*", ctrlKey: false}],
		},
		{
			id: "divide",
			value: "/",
			operator: divide,
			keybindings: [{value: "/", ctrlKey: false}, {value: "%", ctrlKey: false}],
		}
	];

	operationButtons.forEach((btn) => {
		ui.createButton(btn.id, btn.value, () => {
			calculator.selectOperator(btn.operator);
		}, btn.keybindings);
	});

	const functionButtons = [
		{
			id: "equals",
			value: "=",
			function: "calculate",
			keybindings: [{value: "=", ctrlKey: false}, {value: "Enter", ctrlKey: false}],
		},
		{
			id: "allClear",
			value: "AC",
			function: "clear",
			keybindings: [{value: "Delete", ctrlKey: true}, {value: "Backspace", ctrlKey: true}],
		},
		{
			id: "delete",
			value: "Del",
			function: "delete",
			keybindings: [{value: "Delete", ctrlKey: false}, {value: "Backspace", ctrlKey: false}],
		},
	];

	functionButtons.forEach((btn) => {
		ui.createButton(btn.id, btn.value, () => {
			calculator[btn.function]();
		}, btn.keybindings);
	});
}

export default createApp;
