const assert = require("node:assert/strict");
const { describe, it, mock, beforeEach } = require("node:test");

describe("Keypad()", () => {
	const Keypad = require("./keypad.js");

	describe("addFunctionKey()", () => {
		it("Should call the correct method on the wrapped object", () => {
			const fakeCalc = { calculate: mock.fn() };
			const equalsKey = { value: "=", onPress: "calculate" };
			const kp = new Keypad(fakeCalc);
			kp.addFunctionKey(equalsKey);
			const [key] = kp.keys.filter((k) => k.value === equalsKey.value);
			key.press();
			assert.equal(fakeCalc[equalsKey.onPress].mock.callCount(), 1);
		});
	});

	describe("addInputKey()", () => {
		it("Should call the correct method with the correct argument on the wrapped object", () => {
			const fakeCalc = { inputChar: mock.fn() };
			const zeroKey = { value: "0", onPress: "inputChar" };
			const kp = new Keypad(fakeCalc);
			kp.addInputKey(zeroKey);
			const [key] = kp.keys.filter((k) => k.value === zeroKey.value);
			key.press();
			assert.equal(fakeCalc.inputChar.mock.calls[0].arguments[0], "0");
		});
	});
});
