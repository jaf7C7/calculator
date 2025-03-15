class FakeUI {
	constructor() {
		this._elements = [];
	}

	createButton(id, textContent) {
		const btn = { "id": id, "textContent": textContent };
		this._elements.push(btn);
	}

	getElement(id) {
		return this._elements.find((e) => e.id === id);
	}
}

export default FakeUI;
