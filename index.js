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

function createApp() {
	let firstOperand;
	let secondOperand;
	let operation;

	function createInputButton(container, display, id, value) {
		createButton(container, id, value, () => {
			if (!firstOperand) {
				firstOperand = value;
			} else {
				secondOperand = value;
			}
			display.textContent += String(value);
		});
	}

	function createOperationButton(container, display, id, value, _operation) {
		createButton(container, id, value, () => {
			operation = _operation;
			display.textContent += value;
		});
	}

	function createEqualsButton(container, display) {
		createButton(container, "equals", "=", () => {
			display.textContent = operation(firstOperand, secondOperand);
		});
	}

	const container = document.getElementById("calculator");
	const display = createElement(container, "div", "display");

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
		createInputButton(container, display, id, value);
	});

	operationButtons.forEach(([id, value, _operation]) => {
		createOperationButton(container, display, id, value, _operation);
	});

	createEqualsButton(container, display);
}

createApp();
