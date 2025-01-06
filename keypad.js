class Keypad {
	constructor(device) {
		this.device = device;
		this.keys = [];
	}

	addKey({ value, deviceFunction }) {
		this.keys.push({ value: value, press: this.device[deviceFunction] });
	}
}

module.exports = Keypad;
