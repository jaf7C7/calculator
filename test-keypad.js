const assert = require("node:assert/strict");
const { describe, it, mock, beforeEach } = require("node:test");

describe("Keypad()", () => {
	const Keypad = require("./keypad.js");
	const functionKey = { value: "=", onPress: "calculate" };

	describe("addKey()", () => {
		it(`"Should call the correct method on the wrapped 'Calculator' instance`, () => {
			let kp;
			let fakeCalc;
			let key;
			fakeCalc = {};
			fakeCalc[functionKey.onPress] = mock.fn();
			kp = new Keypad(fakeCalc);
			kp.addKey(functionKey);
			[key] = kp.keys.filter((k) => k.value === functionKey.value);
			key.press();
			assert.equal(fakeCalc[functionKey.onPress].mock.callCount(), 1);
		});
	});
});
