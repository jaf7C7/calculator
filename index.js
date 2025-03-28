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

class Calculator {
	constructor(display) {
		this.display = display;
		this._firstOperand = "";
		this._secondOperand = "";
		this._currentOperand = "";
		this._operationSymbol = "";
		this._operation = "";
	}

	input(value) {
		if (!this._currentOperand.includes(".") || value !== ".") {
			this._currentOperand += value;
		}
	}

	selectOperator(operation, operationSymbol) {
		this._addOperand(this._currentOperand);
		this._operation = operation;
		this._operationSymbol = operationSymbol;
	}

	delete() {
		this._currentOperand = this._currentOperand.slice(0, -1);
	}

	clear() {
		this.reset();
	}

	calculate() {
		this._addOperand(this._currentOperand);
		const result = this._operation(
			Number(this._firstOperand),
			Number(this._secondOperand),
		);
		return result;
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

	toString() {
		let str = "";
		if (this._firstOperand !== "") {
			str += `${format(this._firstOperand)}${this._operationSymbol}`;
		}
		if (this._currentOperand !== "") {
			str += format(this._currentOperand);
		}
		return str;
	}

	reset() {
		this._firstOperand = "";
		this._secondOperand = "";
		this._currentOperand = "";
		this._operation = "";
		this._operationSymbol = "";
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
	let calculator = new Calculator(display);

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
		createButton(ui, calculator, btn.id, btn.value, () => {
			calculator.input(btn.value);
			calculator.display(calculator.toString());
		}, [{value: btn.value, ctrlKey: false}]);
	});

	const add = (a, b) => a + b;

	createButton(ui, calculator, "plus", "+", () => {
		calculator.selectOperator(add, "+");
		calculator.display(calculator.toString());
	}, [{value: "+", ctrlKey: false}]);

	const subtract = (a, b) => a - b;

	createButton(ui, calculator, "minus", "-", () => {
		calculator.selectOperator(subtract, "-");
		calculator.display(calculator.toString());
	}, [{value: "-", ctrlKey: false}]);

	const multiply = (a, b) => a * b;

	createButton(ui, calculator, "times", "*", () => {
		calculator.selectOperator(multiply, "*");
		calculator.display(calculator.toString());
	}, [{value: "*", ctrlKey: false}]);

	const divide = (a, b) => a / b;

	createButton(ui, calculator, "divide", "/", () => {
		calculator.selectOperator(divide, "/");
		calculator.display(calculator.toString());
	}, [{value: "/", ctrlKey: false}, {value: "%", ctrlKey: false}]);

	createButton(ui, calculator, "equals", "=", () => {
		const result = calculator.calculate();
		calculator.display(format(result));
		calculator.reset();
	}, [{value: "=", ctrlKey: false}, {value: "Enter", ctrlKey: false}]);

	createButton(ui, calculator, "allClear", "AC", () => {
		calculator.clear();
		calculator.display(calculator.toString());
	}, [{value: "Delete", ctrlKey: true}, {value: "Backspace", ctrlKey: true}]);

	createButton(ui, calculator, "delete", "Del", () => {
		calculator.delete();
		calculator.display(calculator.toString());
	}, [{value: "Delete", ctrlKey: false}, {value: "Backspace", ctrlKey: false}]);
}

export default createApp;
