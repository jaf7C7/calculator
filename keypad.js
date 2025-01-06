class Keypad {
	constructor(device) {
		this.device = device;
		this.keys = [];
	}

	addKey({ value, onPress }) {
		this.keys.push({ value: value, press: this.device[onPress] });
	}
}

module.exports = Keypad;
