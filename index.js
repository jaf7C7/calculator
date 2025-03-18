class Container {
	constructor(element) {
		this.element = element;
	}

	createElement(tagName, id, textContent = null, onClick = null) {
		const element = document.createElement(tagName);
		element.id = id;
		if (textContent) {
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

	append(value) {
		this.element.textContent += String(value);
	}

	update(value) {
		this.element.textContent = value
	}
}

class Calculation {
	constructor() {
		this.firstOperand = null;
		this.secondOperand = null;
		this.operation = null;
		this.currentOperand = "";
	}

	saveOperand() {
		const operand = Number(this.currentOperand);
		if (!this.firstOperand) {
			this.firstOperand = operand;
		} else {
			this.secondOperand = operand;
		}
		this.currentOperand = "";
	}

	selectOperation(operation) {
		this.saveOperand();
		this.operation = operation;
	}

	calculate() {
		this.saveOperand();
		return this.operation(this.firstOperand, this.secondOperand);
	}
}

function add(a, b) {
	return a + b;
}

function multiply(a, b) {
	return a * b;
}

function createApp() {
	const container = new Container(document.getElementById("calculator"));
	const display = container.createDisplay();
	let calculation = new Calculation();

	const inputButtons = [
		["one", 1],
		["two", 2],
		["five", 5],
	];

	const operationButtons = [
		["plus", "+", add],
		["times", "*", multiply],
	];

	inputButtons.forEach(([id, value]) => {
		container.createButton(id, value, () => {
			calculation.currentOperand += value;
			display.append(value);
		});
	});

	operationButtons.forEach(([id, value, operation]) => {
		container.createButton(id, value, () => {
			calculation.selectOperation(operation);
			display.append(value);
		});
	});

	container.createButton("equals", "=", () => {
		display.update(calculation.calculate());
	});

	container.createButton("allClear", "AC", () => {
		calculation = new Calculation();
		display.update("");
	});
}

createApp();
