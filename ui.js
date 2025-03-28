class UI {
	constructor() {
		this._element = document.getElementById("calculator");
	}

	createElement(tagName, id = null, textContent = null) {
		const element = document.createElement(tagName);
		if (id !== null) {
			element.id = id;
		}
		if (textContent !== null) {
			element.textContent = textContent;
		}
		this._element.appendChild(element);
		return element;
	}

	createDisplay() {
		const element = this.createElement("div", "display");
		return (text) => {
			element.textContent = text;
		};
	}

	createButton(id, value, function_, keybindings) {
		let btn;
		btn = this.createElement("button", id, value);
		btn.addEventListener("click", () => {
			function_();
		});
		document.body.addEventListener("keydown", (event) => {
			const keybinding = keybindings.find((key) => {
				return key.value === event.key && key.ctrlKey === event.ctrlKey;
			});
			if (keybinding !== undefined) {
				function_();
			}
		});
	}
}

export default UI;
