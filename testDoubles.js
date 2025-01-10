class FakeDisplay {
	#content;

	update(text) {
		this.#content = text;
	}

	read() {
		return this.#content;
	}
}

module.exports = { FakeDisplay };
