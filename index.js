function createElement(tagName, id, onClick = null) {
	const element = document.createElement(tagName);
	element.id = id;
	if (onClick) {
		element.addEventListener("click", onClick);
	}
	document.body.appendChild(element);
	return element;
}

const display = createElement("div", "display");

const one = createElement("button", "one", () => {
	display.textContent += "1";
});

const plus = createElement("button", "plus", () => {
	display.textContent += "+";
});

const equals = createElement("button", "equals", () => {
	display.textContent = "2";
});
