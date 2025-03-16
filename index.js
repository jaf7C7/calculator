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

createElement("button", "one", "1", () => {
	if (!firstOperand) {
		firstOperand = 1;
	} else {
		secondOperand = 1;
	}
	display.textContent += "1";
});

createElement("button", "plus", "+", () => {
	operation = (a, b) => a + b;
	display.textContent += "+";
});

createElement("button", "equals", "=", () => {
	display.textContent = operation(firstOperand, secondOperand);
});
