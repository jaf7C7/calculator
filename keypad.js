class Keypad {
	constructor(device) {
		this.device = device;
		this.keys = [];
	}

	addFunctionKey({ value, onPress }) {
		this.keys.push({ value: value, press: this.device[onPress] });
	}

	addInputKey({ value, onPress }) {
		this.keys.push({
			value: value,
			press: () => {
				this.device[onPress](value);
			},
		});
	}
}

module.exports = Keypad;
