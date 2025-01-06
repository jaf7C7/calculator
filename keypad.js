class Keypad {
	constructor(device) {
		this.device = device;
		this.keys = [];
	}

	addKey(value, deviceFunction) {
		const onPress = this.device[deviceFunction];
		this.keys.push({ value: value, press: onPress });
	}
}

module.exports = Keypad;
