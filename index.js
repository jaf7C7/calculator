function createElement(tagName, id) {
	const element = document.createElement(tagName);
	element.id = id;
	document.body.appendChild(element);
	return element;
}

const display = createElement("div", "display");

const one = createElement("button", "one");
one.addEventListener("click", () => {
	display.textContent += "1";
});

const plus = createElement("button", "plus");
plus.addEventListener("click", () => {
	display.textContent += "+";
});

const equals = createElement("button", "equals");
equals.addEventListener("click", () => {
	display.textContent = "2";
});
