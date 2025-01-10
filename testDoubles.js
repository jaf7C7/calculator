class FakeDisplay {
	#content;

	update(text) {
		this.#content = text;
	}

	read() {
		return this.#content;
	}
}

class FakeUI {
	#displays;

	constructor() {
		this.#displays = [];
	}

	createDisplay(id) {
		this.#displays.push({ id: id });
	}

	getDisplay(id) {
		return this.#displays.find((display) => display.id === id);
	}
}

module.exports = { FakeDisplay, FakeUI };
