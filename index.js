class Container {
	constructor(element) {
		this._element = element;
	}

	createElement(tagName, id, textContent = null, onClick = null) {
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
		this.createElement("button", id, value, onClick);
	}

	createDisplay() {
		return new Display(this.createElement("div", "display"));
	}
}

class Display {
	constructor(element) {
		this.element = element;
	}

	read() {
		return this.element.textContent;
	}

	append(value) {
		this.element.textContent += String(value);
	}

	update(value) {
		this.element.textContent = value
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
		this.firstOperand = "";
		this.secondOperand = "";
		this.operator = "";
		this.currentOperand = "";
	}

	inputValue(value) {
		this.currentOperand += value;
	}

	_saveOperand() {
		if (this.currentOperand !== "") {
			const operand = Number(this.currentOperand);
			if (!this.firstOperand) {
				this.firstOperand = operand;
			} else {
				this.secondOperand = operand;
			}
		}
		this.currentOperand = "";
	}

	selectOperator(operator) {
		this._saveOperand();
		this.operator = operator;
	}

	calculate() {
		this._saveOperand();
		return this.operator(this.firstOperand, this.secondOperand);
	}

	toString() {
		let str = "";
		if (this.firstOperand !== "") {
			str += formatNumber(this.firstOperand);
			str += this.operator.value;
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
		this.display.update(this.calculation.toString());
	}

	selectOperator(operation, value) {
		const operator = new Operator(operation, value);
		this.calculation.selectOperator(operator);
		this.display.update(this.calculation.toString());
	}

	calculate() {
		this.display.update(this.calculation.calculate());
		this.calculation = new Calculation();
	}

	clearAll() {
		this.calculation = new Calculation();
		this.display.update("");
	}

	deleteChar() {
		this.calculation.deleteChar();
		this.display.update(this.calculation.toString());
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
