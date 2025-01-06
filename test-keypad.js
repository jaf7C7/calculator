const assert = require("node:assert/strict");
const { describe, it, mock, beforeEach } = require("node:test");

describe("Keypad()", () => {
	const Keypad = require("./keypad.js");
	const functionKey = { value: "=", onPress: "calculate" };

	describe("addKey()", () => {
		let kp;
		let fakeCalc;
		let key;

		beforeEach(() => {
			fakeCalc = {};
			fakeCalc[functionKey.onPress] = mock.fn();
			kp = new Keypad(fakeCalc);
			kp.addKey(functionKey);
			[key] = kp.keys.filter((k) => k.value === functionKey.value);
		});

		it("Should have the correct value", () => {
			assert.notEqual(key, undefined);
		});

		it(`"Should call the correct method on the wrapped 'Calculator' instance`, () => {
			key.press();
			assert.equal(fakeCalc[functionKey.onPress].mock.callCount(), 1);
		});
	});
});
