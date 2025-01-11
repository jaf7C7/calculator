import { mock } from "node:test";

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
	#elements;

	constructor() {
		this.#elements = [];
	}

	createDisplay(id) {
		this.#elements.push({ id: id });
	}

	createButton(id, value, onClick) {
		this.#elements.push({ id: id, value: value, onClick: onClick });
	}

	getElement(id) {
		return this.#elements.find((element) => element.id === id);
	}
}

class MockCalculator {
	constructor() {
		this.inputChar = mock.fn();
		this.deleteChar = mock.fn();
		this.clearAll = mock.fn();
	}
}

export { FakeDisplay, FakeUI, MockCalculator };
