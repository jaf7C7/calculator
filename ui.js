class UI {
	constructor() {
		this._element = document.getElementById("calculator");
	}

	_createElement(tagName, id, textContent = null, onClick = null) {
		const element = document.createElement(tagName);
		element.id = id;
		if (textContent !== null) {
			element.textContent = textContent;
		}
		if (onClick) {
			element.addEventListener("click", onClick);
		}
		this._element.appendChild(element);
		return element;
	}

	createButton(id, value, onClick) {
		this._createElement("button", id, value, onClick);
	}

	createDisplay() {
		const element = this._createElement("div", "display");
		return (text) => {
			element.textContent = text;
		};
	}
}

export default UI;
