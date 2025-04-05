class UI {
	constructor() {
		this._element = document.getElementById("calculator");
	}

	clear() {
		this._element.replaceChildren();
	}

	findElement(id) {
		return document.getElementById(id);
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

	pressKey(key) {
		const {value, ctrlKey} = key;
		const event = new KeyboardEvent("keydown", {key: value, ctrlKey});
		document.body.dispatchEvent(event);
	}
}

class MockUI {
	constructor() {
		this._elements = [];
	}

	clear() {
		this._elements = [];
	}

	createElement(tagName, id, textContent) {
		const e = {id, textContent}
		this._elements.push(e);
		return e;
	}

	findElement(id) {
		return this._elements.find((e) => e.id === id);
	}

	createDisplay() {
		const display = this.createElement("div", "display", "");
		return (text) => {
			display.textContent = text;
		};
	}

	createButton(id, textContent, onClick, keybindings) {
		const btn = this.createElement("button", id, textContent);
		btn.click = () => {
			onClick();
		};
		btn.keybindings = keybindings;
	}

	pressKey(key) {
		const wasPressed = (keybinding) => (
			keybinding.value === key.value
			&& keybinding.ctrlKey === key.ctrlKey
		);

		const btn = this._elements.find((e) => (
			e.keybindings?.find((k) => wasPressed(k))
		));

		if (btn !== undefined) {
			btn.click();
		}
	}
}


export {UI, MockUI};
