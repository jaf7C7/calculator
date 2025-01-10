const { mock } = require("node:test");

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

	createButton(id, value, onClick) {
		this.#buttons.push({ id: id, value: value, onClick: onClick });
	}

	getButton(id) {
		return this.#buttons.find((button) => button.id === id);
	}
}

class MockCalculator {
	constructor() {
		this.inputChar = mock.fn();
	}
}

module.exports = { FakeDisplay, FakeUI, MockCalculator };
