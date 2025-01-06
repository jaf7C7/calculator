const assert = require("node:assert/strict");
const { describe, it, mock, beforeEach } = require("node:test");

describe("Keypad()", () => {
	const Keypad = require("./keypad.js");

	describe("addKey()", () => {
		it(`"Should call the correct method on the wrapped 'Calculator' instance`, () => {
			const functionKey = { value: "=", onPress: "calculate" };
			const fakeCalc = {};
			fakeCalc[functionKey.onPress] = mock.fn();
			const kp = new Keypad(fakeCalc);
			kp.addKey(functionKey);
			const [key] = kp.keys.filter((k) => k.value === functionKey.value);
			key.press();
			assert.equal(fakeCalc[functionKey.onPress].mock.callCount(), 1);
		});
	});
});
