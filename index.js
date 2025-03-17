function createElement(container, tagName, id, textContent = null, onClick = null) {
	const element = document.createElement(tagName);
	element.id = id;
	if (textContent) {
		element.textContent = textContent;
	}
	if (onClick) {
		element.addEventListener("click", onClick);
	}
	container.appendChild(element);
	return element;
}

function createButton(container, id, value, onClick) {
	createElement(container, "button", id, value, onClick);
}

function inputValue(display, calculation, value) {
	if (!calculation.firstOperand) {
		calculation.firstOperand = value;
	} else {
		calculation.secondOperand = value;
	}
	display.textContent += String(value);
}

function selectOperation(display, calculation, _operation, value) {
	calculation.operation = _operation;
	display.textContent += value;
};

function createOperationButton(
	container, display, calculation, id, value, _operation
) {
	createButton(container, id, value, () => {
		selectOperation(display, calculation, _operation, value);
	});
}

function performCalculation(display, calculation) {
	display.textContent = calculation.operation(
		calculation.firstOperand, calculation.secondOperand
	);
};

function createEqualsButton(container, display, calculation) {
	createButton(container, "equals", "=", () => {
		performCalculation(display, calculation);
	});
}

function createDisplay(container) {
	return createElement(container, "div", "display");
}

function createApp() {
	const container = document.getElementById("calculator");
	const display = createDisplay(container);

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
		["plus", "+", (a, b) => a + b],
		["times", "*", (a, b) => a * b],
	];

	inputButtons.forEach(([id, value]) => {
		createButton(container, id, value, () => {
			inputValue(display, calculation, value);
		});
	});

	operationButtons.forEach(([id, value, _operation]) => {
		createOperationButton(container, display, calculation, id, value, _operation);
	});

	createEqualsButton(container, display, calculation);
}

createApp();
