class Keypad {
	constructor() {
		this.keys = [];
	}

	addKey(value, onPress) {
		this.keys.push({ value: value, press: onPress });
	}
}

module.exports = Keypad;
