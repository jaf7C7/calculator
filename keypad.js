class Keypad {
	constructor() {
		this.keys = [];
	}

	addKey(value) {
		this.keys.push({ value });
	}
}

module.exports = Keypad;
