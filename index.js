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

	inputValue(value) {
		this.currentOperand += value;
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

	selectOperator(operator) {
		this.saveOperand();
		this.operator = operator;
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
}

class Calculator {
	constructor(display) {
		this.display = display;
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
	let calculation = new Calculation();

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

	function inputValue(display, value) {
		calculation.currentOperand += value;
		display.update(calculation.toString());
	}
	inputButtons.forEach(([id, value]) => {
		container.createButton(id, value, () => {
			inputValue(display, value);
		});
	});

	function selectOperator(display, operation, value) {
		const operator = new Operator(operation, value);
		calculation.selectOperator(operator);
		display.update(calculation.toString());
	}
	operationButtons.forEach(([id, value, operation]) => {
		container.createButton(id, value, () => {
			selectOperator(display, operation, value);
		});
	});

	function calculate(display) {
		display.update(calculation.calculate());
		calculation = new Calculation();
	}
	container.createButton("equals", "=", () => {
		calculate(display);
	});

	function clearAll(display) {
		calculation = new Calculation();
		display.update("");
	}
	container.createButton("allClear", "AC", () => {
		clearAll(display);
	});

	function deleteChar(calculation, display) {
		calculation.currentOperand = calculation.currentOperand.slice(0, -1);
		display.update(calculation.toString());
	}
	container.createButton("delete", "Del", () => {
		deleteChar(calculation, display);
	});
}

createApp();
