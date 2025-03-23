class Container {
	constructor(element) {
		this._element = element;
	}

	_createElement(tagName, id, textContent = null, onClick = null) {
		const element = document.createElement(tagName);
		element.id = id;
		if (textContent !== null) {
			element.textContent = textContent;
		}
		if (onClick) {
			element.addEventListener("click", onClick);
		}
		this._element.appendChild(element);
		return element;
	}

	createButton(id, value, onClick) {
		this._createElement("button", id, value, onClick);
	}

	createDisplay() {
		const element = this._createElement("div", "display");
		return (text) => {
			element.textContent = text;
		};
	}
}

class Operator extends Function {
	constructor(operation, value) {
		const self = (...args) => operation(...args);
		self.value = value;
		return self;
	}
}

class Calculation {
	constructor() {
		this._firstOperand = "";
		this._secondOperand = "";
		this._operator = "";
		this.currentOperand = "";
	}

	inputValue(value) {
		this.currentOperand += value;
	}

	_saveOperand() {
		if (this.currentOperand !== "") {
			const operand = Number(this.currentOperand);
			if (!this._firstOperand) {
				this._firstOperand = operand;
			} else {
				this._secondOperand = operand;
			}
		}
		this.currentOperand = "";
	}

	selectOperator(_operator) {
		this._saveOperand();
		this._operator = _operator;
	}

	calculate() {
		this._saveOperand();
		return this._operator(this._firstOperand, this._secondOperand);
	}

	toString() {
		let str = "";
		if (this._firstOperand !== "") {
			str += formatNumber(this._firstOperand);
			str += this._operator.value;
		}
		if (this.currentOperand !== "") {
			str += formatNumber(this.currentOperand);
		}
		return str;
	}

	deleteChar() {
		this.currentOperand = this.currentOperand.slice(0, -1);
	}
}

class Calculator {
	constructor(display) {
		this.display = display;
		this.calculation = new Calculation();
	}

	inputValue(value) {
		this.calculation.inputValue(value);
		this.display(this.calculation.toString());
	}

	selectOperator(operation, value) {
		const operator = new Operator(operation, value);
		this.calculation.selectOperator(operator);
		this.display(this.calculation.toString());
	}

	calculate() {
		this.display(this.calculation.calculate());
		this.calculation = new Calculation();
	}

	clearAll() {
		this.calculation = new Calculation();
		this.display("");
	}

	deleteChar() {
		this.calculation.deleteChar();
		this.display(this.calculation.toString());
	}
}

function formatNumber(str) {
	if (str.length > 15) {
		return BigInt(str).toLocaleString();
	}
	return Number(str).toLocaleString();
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
	const container = new Container(document.getElementById("calculator"));
	const display = container.createDisplay();
	const calculator = new Calculator(display);

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
		container.createButton(id, value, () => {
			calculator.inputValue(value);
		});
	});

	operationButtons.forEach(([id, value, operation]) => {
		container.createButton(id, value, () => {
			calculator.selectOperator(operation, value);
		});
	});

	container.createButton("equals", "=", () => {
		calculator.calculate();
	});

	container.createButton("allClear", "AC", () => {
		calculator.clearAll();
	});

	container.createButton("delete", "Del", () => {
		calculator.deleteChar();
	});
}

createApp();
