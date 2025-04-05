class MockUI {
	constructor() {
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

export default MockUI;
