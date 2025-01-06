const assert = require("node:assert/strict");
const { describe, it } = require("node:test");

describe("Keypad()", () => {
	const Keypad = require("./keypad.js");
	let kp;

	describe("Equals key", () => {
		it("Should have value `=`", (t) => {
			const fakeCalc = {
				calculate: t.mock.fn(),
			};
			kp = new Keypad(fakeCalc);
			kp.addKey("=", "calculate");
			const [equalsKey] = kp.keys.filter((k) => k.value === "=");
			assert.notEqual(equalsKey, undefined);
		});

		it("Should call `calculate()` on the wrapped `Calculator` instance", (t) => {
			const fakeCalc = {
				calculate: t.mock.fn(),
			};
			kp = new Keypad(fakeCalc);
			kp.addKey("=", "calculate");
			const [equalsKey] = kp.keys.filter((k) => k.value === "=");
			equalsKey.press();
			assert.equal(fakeCalc.calculate.mock.callCount(), 1);
		});
	});
});
