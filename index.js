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

function createInputButton(container, display, calculation, id, value) {
	const callback = () => {
		inputValue(display, calculation, value);
	};
	createButton(container, id, value, callback);
}

function createOperationButton(
	container, display, calculation, id, value, _operation
) {
	const selectOperation = () => {
		calculation.operation = _operation;
		display.textContent += value;
	};
	createButton(container, id, value, selectOperation);
}

function createEqualsButton(container, display, calculation) {
	const performCalculation = () => {
		display.textContent = calculation.operation(
			calculation.firstOperand, calculation.secondOperand
		);
	};
	createButton(container, "equals", "=", performCalculation);
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
		createInputButton(container, display, calculation, id, value);
	});

	operationButtons.forEach(([id, value, _operation]) => {
		createOperationButton(container, display, calculation, id, value, _operation);
	});

	createEqualsButton(container, display, calculation);
}

createApp();
