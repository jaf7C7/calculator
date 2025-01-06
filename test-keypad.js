const assert = require("node:assert/strict");
const { describe, it, mock, beforeEach } = require("node:test");

describe("Keypad()", () => {
	const Keypad = require("./keypad.js");

	describe("addKey()", () => {
		it(`"Should call the correct method on the wrapped 'Calculator' instance`, () => {
			const fakeCalc = { calculate: mock.fn() };
			const equalsKeys = { value: "=", onPress: "calculate" };
			const kp = new Keypad(fakeCalc);
			kp.addKey(equalsKeys);
			const [key] = kp.keys.filter((k) => k.value === equalsKeys.value);
			key.press();
			assert.equal(fakeCalc[equalsKeys.onPress].mock.callCount(), 1);
		});
	});
});
