class Container {
	constructor(element) {
		this.element = element;
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
		this.element.appendChild(element);
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

	_inputValue(value) {
		this.currentOperand += value;
	}

	inputValue(display, value) {
		this._inputValue(value);
		display.update(this.toString());
	}

	saveOperand() {
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

	_selectOperator(operator) {
		this.saveOperand();
		this.operator = operator;
	}

	selectOperator(display, operation, value) {
		const operator = new Operator(operation, value);
		this._selectOperator(operator);
		display.update(this.toString());
	}

	calculate() {
		this.saveOperand();
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

	deleteChar(display) {
		this.currentOperand = this.currentOperand.slice(0, -1);
		display.update(this.toString());
	}
}

class Calculator {
	constructor(display) {
		this.display = display;
		this.calculation = new Calculation();
	}

	inputValue(value) {
		this.calculation.inputValue(this.display, value);
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
			calculator.calculation.selectOperator(calculator.display, operation, value);
		});
	});

	function calculate(calculator) {
		calculator.display.update(calculator.calculation.calculate());
		calculator.calculation = new Calculation();
	}
	container.createButton("equals", "=", () => {
		calculate(calculator);
	});

	function clearAll(calculator) {
		calculator.calculation = new Calculation();
		calculator.display.update("");
	}
	container.createButton("allClear", "AC", () => {
		clearAll(calculator);
	});

	container.createButton("delete", "Del", () => {
		calculator.calculation.deleteChar(calculator);
	});
}

createApp();
