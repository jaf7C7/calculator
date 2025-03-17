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
	const container = document.getElementById("calculator");
	const display = createElement(container, "div", "display");

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

	const inputButtons = [
		["one", 1],
		["two", 2],
		["five", 5],
	];

	inputButtons.forEach(([id, value]) => {
		createInputButton(container, display, id, value);
	});

	function createOperationButton(container, id, value, _operation) {
		createButton(container, id, value, () => {
			operation = _operation;
			display.textContent += value;
		});
	}

	const operationButtons = [
		["plus", "+", (a, b) => a + b],
		["times", "*", (a, b) => a * b],
	];

	operationButtons.forEach(([id, value, _operation]) => {
		createOperationButton(container, id, value, _operation);
	});

	createButton(container, "equals", "=", () => {
		display.textContent = operation(firstOperand, secondOperand);
	});
}

createApp();
