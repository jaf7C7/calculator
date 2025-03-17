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

function createInputButton(container, display, calculationVariables, id, value) {
	createButton(container, id, value, () => {
		if (!calculationVariables.firstOperand) {
			calculationVariables.firstOperand = value;
		} else {
			calculationVariables.secondOperand = value;
		}
		display.textContent += String(value);
	});
}

function createOperationButton(
	container, display, calculationVariables, id, value, _operation
) {
	createButton(container, id, value, () => {
		calculationVariables.operation = _operation;
		display.textContent += value;
	});
}

function createEqualsButton(container, display, calculationVariables) {
	createButton(container, "equals", "=", () => {
		display.textContent = calculationVariables.operation(
			calculationVariables.firstOperand, calculationVariables.secondOperand
		);
	});
}

function createDisplay(container) {
	return createElement(container, "div", "display");
}

function createApp() {
	const container = document.getElementById("calculator");
	const display = createDisplay(container);

	const calculationVariables = {
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
		createInputButton(container, display, calculationVariables, id, value);
	});

	operationButtons.forEach(([id, value, _operation]) => {
		createOperationButton(container, display, calculationVariables, id, value, _operation);
	});

	createEqualsButton(container, display, calculationVariables);
}

createApp();
