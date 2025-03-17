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
	}

	addOperand(operand) {
		if (!this.firstOperand) {
			this.firstOperand = operand;
		} else {
			this.secondOperand = operand;
		}
	}

	selectOperation(operation) {
		this.operation = operation;
	}

	calculate() {
		return this.operation(this.firstOperand, this.secondOperand);
	}
}

function addOperand(display, calculation, value) {
	calculation.addOperand(value);
	display.append(value);
}

function selectOperation(display, calculation, operation, value) {
	calculation.selectOperation(operation);
	display.append(value);
};

function calculate(display, calculation) {
	display.update(calculation.calculate());
};

function add(a, b) {
	return a + b;
}

function multiply(a, b) {
	return a * b;
}

function createApp() {
	const container = new Container(document.getElementById("calculator"));
	const display = container.createDisplay();
	const calculation = new Calculation();

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
			addOperand(display, calculation, value);
		});
	});

	operationButtons.forEach(([id, value, operation]) => {
		container.createButton(id, value, () => {
			selectOperation(display, calculation, operation, value);
		});
	});

	container.createButton("equals", "=", () => {
		calculate(display, calculation);
	});
}

createApp();
