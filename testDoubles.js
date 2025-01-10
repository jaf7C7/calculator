class FakeDisplay {
	#content;

	constructor() {
		this.#content = "";
	}

	update(text) {
		this.#content = text;
	}

	read() {
		return this.#content;
	}
}

class FakeUI {
	#displays;
	#buttons;

	constructor() {
		this.#displays = [];
		this.#buttons = [];
	}

	createDisplay(id) {
		this.#displays.push({ id: id });
	}

	getDisplay(id) {
		return this.#displays.find((display) => display.id === id);
	}

	createButton(id, value) {
		this.#buttons.push({ id: id, value: value });
	}

	getButton(id) {
		return this.#buttons.find((button) => button.id === id);
	}
}

module.exports = { FakeDisplay, FakeUI };
