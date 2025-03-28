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
		{id: "one", value: 1},
		{id: "two", value: 2},
		{id: "three", value: 3},
		{id: "four", value: 4},
		{id: "five", value: 5},
		{id: "six", value: 6},
		{id: "seven", value: 7},
		{id: "eight", value: 8},
		{id: "nine", value: 9},
		{id: "zero", value: 0},
		{id: "point", value: "."},
	].forEach((btn) => {
		const b = ui.createElement("button", btn.id, btn.value);
		b.addEventListener("click", () => {
			calculator.input(btn.value);
		});
		document.body.addEventListener("keydown", (event) => {
			if (event.key == btn.value) {
				calculator.input(btn.value);
			}
		});
	});

	[
		{id: "plus", operator: add},
		{id: "minus", operator: subtract},
		{id: "times", operator: multiply},
		{id: "divide", operator: divide},
	].forEach((btn) => {
		const b = ui.createElement("button", btn.id, btn.value);
		b.addEventListener("click", () => {
			calculator.selectOperator(btn.operator);
		});
		document.body.addEventListener("keydown", (event) => {
			if (event.key === btn.operator.value) {
				calculator.selectOperator(btn.operator);
			}
			if (event.key === "%") {
				calculator.selectOperator(divide);
			}
		});
	});

	let btn;

	btn = ui.createElement("button", "equals", "=");
	btn.addEventListener("click", () => {
		calculator.calculate();
	});
	document.body.addEventListener("keydown", (event) => {
		if (event.key === "=" || event.key === "Enter") {
			calculator.calculate();
		}
	});

	btn = ui.createElement("button", "allClear", "AC");
	btn.addEventListener("click", () => {
		calculator.clear();
	});

	btn = ui.createElement("button", "delete", "Del");
	btn.addEventListener("click", () => {
		calculator.delete();
	});

	document.body.addEventListener("keydown", (event) => {
		if (event.ctrlKey && (event.key === "Delete" || event.key === "Backspace")) {
			calculator.clear();
		}
		if (!event.ctrlKey && (event.key === "Delete" || event.key === "Backspace")) {
			calculator.delete();
		}
	});
}

export default createApp;
