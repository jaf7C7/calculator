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
		return this.createElement("div", "display");
	}
}

function addOperand(calculation, operand) {
	if (!calculation.firstOperand) {
		calculation.firstOperand = operand;
	} else {
		calculation.secondOperand = operand;
	}
}

function appendDisplay(display, value) {
	display.textContent += String(value);
}

function inputValue(display, calculation, value) {
	addOperand(calculation, value);
	appendDisplay(display, value);
}

function selectOperation(display, calculation, _operation, value) {
	calculation.operation = _operation;
	display.textContent += value;
};

function performCalculation(display, calculation) {
	display.textContent = calculation.operation(
		calculation.firstOperand, calculation.secondOperand
	);
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

	const calculation = {
		firstOperand: null,
		secondOperand: null,
		operation: null,
	}

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
			inputValue(display, calculation, value);
		});
	});

	operationButtons.forEach(([id, value, _operation]) => {
		container.createButton(id, value, () => {
			selectOperation(display, calculation, _operation, value);
		});
	});

	container.createButton("equals", "=", () => {
		performCalculation(display, calculation);
	});
}

createApp();
