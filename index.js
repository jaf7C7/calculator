function createElement(tagName, id, onClick = null) {
	const element = document.createElement(tagName);
	element.id = id;
	if (onClick) {
		element.addEventListener("click", onClick);
	}
	document.body.appendChild(element);
	return element;
}

let firstOperand;
let secondOperand;
let operation;
const display = createElement("div", "display");

createElement("button", "one", () => {
	if (!firstOperand) {
		firstOperand = 1;
	} else {
		secondOperand = 1;
	}
	display.textContent += "1";
});

createElement("button", "plus", () => {
	operation = (a, b) => a + b;
	display.textContent += "+";
});

createElement("button", "equals", () => {
	display.textContent = operation(firstOperand, secondOperand);
});
