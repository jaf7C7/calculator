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
	constructor() {
		this.calculation = new Calculation();
	}

	input(display, value) {
		this.calculation.input(value);
		display(this.calculation.toString());
	}

	selectOperator(display, operator) {
		this.calculation.selectOperator(operator);
		display(this.calculation.toString());
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

function createButton(ui, calculator, id, value, function_, keybindings) {
	let btn;
	btn = ui.createElement("button", id, value);
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

function createApp() {
	const ui = new UI();
	const display = ui.createDisplay();
	const calculator = new Calculator();

	const subtract = new Operation("-", (a, b) => a - b);
	const multiply = new Operation("*", (a, b) => a * b);
	const divide = new Operation("/", (a, b) => a / b);
	const add = new Operation("+", (a, b) => a + b);

	const inputButtons = [
		{id: "one", value: "1"},
		{id: "two", value: "2"},
		{id: "three", value: "3"},
		{id: "four", value: "4"},
		{id: "five", value: "5"},
		{id: "six", value: "6"},
		{id: "seven", value: "7"},
		{id: "eight", value: "8"},
		{id: "nine", value: "9"},
		{id: "zero", value: "0"},
		{id: "point", value: "."},
	]

	inputButtons.forEach((btn) => {
		createButton(ui, calculator.calculation, btn.id, btn.value, () => {
			calculator.input(display, btn.value);
		}, [{value: btn.value, ctrlKey: false}]);
	});

	createButton(ui, calculator, "plus", "+", () => {
		calculator.selectOperator(display, add);
	}, [{value: "+", ctrlKey: false}]);

	createButton(ui, calculator, "minus", "-", () => {
		calculator.selectOperator(display, subtract);
	}, [{value: "-", ctrlKey: false}]);

	createButton(ui, calculator, "times", "*", () => {
		calculator.selectOperator(display, multiply);
	}, [{value: "*", ctrlKey: false}]);

	createButton(ui, calculator, "divide", "/", () => {
		calculator.selectOperator(display, divide);
	}, [{value: "/", ctrlKey: false}, {value: "%", ctrlKey: false}]);

	createButton(ui, calculator, "equals", "=", () => {
		const result = calculator.calculation.calculate();
		display(format(result));
		calculator.calculation = new Calculation();
	}, [{value: "=", ctrlKey: false}, {value: "Enter", ctrlKey: false}]);

	createButton(ui, calculator, "allClear", "AC", () => {
		calculator.calculation = new Calculation();
		display(calculator.calculation.toString());
	}, [{value: "Delete", ctrlKey: true}, {value: "Backspace", ctrlKey: true}]);

	createButton(ui, calculator, "delete", "Del", () => {
		calculator.calculation.delete();
		display(calculator.calculation.toString());
	}, [{value: "Delete", ctrlKey: false}, {value: "Backspace", ctrlKey: false}]);
}

export default createApp;
