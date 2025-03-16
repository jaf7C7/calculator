const container = document.getElementById("calculator");

function createElement(tagName, id, textContent = null, onClick = null) {
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

let firstOperand;
let secondOperand;
let operation;
const display = createElement("div", "display");

function createInputButton(id, value) {
	createElement("button", id, value, () => {
		if (!firstOperand) {
			firstOperand = value;
		} else {
			secondOperand = value;
		}
		display.textContent += String(value);
	});
}

const buttons = [
	["one", 1],
	["two", 2],
	["five", 5],
];

buttons.forEach(([id, value]) => {
	createInputButton(id, value);
});

createElement("button", "plus", "+", () => {
	operation = (a, b) => a + b;
	display.textContent += "+";
});

createElement("button", "times", "*", () => {
	operation = (a, b) => a * b;
	display.textContent += "*";
});

createElement("button", "equals", "=", () => {
	display.textContent = operation(firstOperand, secondOperand);
});
