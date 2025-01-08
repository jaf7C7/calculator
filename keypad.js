class Keypad {
	constructor(device) {
		this.device = device;
		this.keys = [];
	}

	addKey(value, onPress, onPressArgs = []) {
		this.keys.push({
			value: value,
			press: this.device[onPress].bind(this.device, ...onPressArgs),
		});
	}
}

module.exports = Keypad;
