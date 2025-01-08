const assert = require("node:assert/strict");
const { describe, it, mock, beforeEach } = require("node:test");

describe("Keypad()", () => {
	const Keypad = require("./keypad.js");
	let fakeCalc;
	let kp;

	beforeEach(() => {
		fakeCalc = {
			calculate: mock.fn(),
			inputChar: mock.fn(),
		};
		kp = new Keypad(fakeCalc);
	});

	describe("addKey()", () => {
		it("Should call the correct method on the wrapped object", () => {
			const value = "=";
			const onPress = "calculate";
			kp.addKey(value, onPress);
			const [key] = kp.keys.filter((k) => k.value === value);
			key.press();
			assert.equal(fakeCalc[onPress].mock.callCount(), 1);
		});
	});

	describe("addKey()", () => {
		it("Should call the correct method with the correct argument on the wrapped object", () => {
			const value = "0";
			const onPress = "inputChar";
			const onPressArgs = ["0"];
			kp.addKey(value, onPress, onPressArgs);
			const [key] = kp.keys.filter((k) => k.value === value);
			key.press();
			assert.equal(fakeCalc[onPress].mock.calls[0].arguments[0], value);
		});
	});
});
