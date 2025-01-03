const assert = require("node:assert/strict");
const { describe, it, beforeEach } = require("node:test");

describe("Keypad()", () => {
	const Keypad = require("./keypad.js");
	let kp;

	describe("Equals key", () => {
		it("Should have value `=`", () => {
			kp = new Keypad();
			kp.addKey("=");
			const [equalsKey] = kp.keys.filter((k) => k.value === "=");
			assert.notEqual(equalsKey, undefined);
		});

		it("Should call `calculate()` on the wrapped `Calculator` instance", (t) => {
			const fakeCalc = {
				calculate: t.mock.fn(),
			};
			kp = new Keypad(fakeCalc);
			kp.addKey("=", fakeCalc.calculate);
			const [equalsKey] = kp.keys.filter((k) => k.value === "=");
			equalsKey.press();
			assert.equal(fakeCalc.calculate.mock.callCount(), 1);
		});
	});
});
