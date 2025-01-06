const assert = require("node:assert/strict");
const { describe, it, mock } = require("node:test");

describe("Keypad()", () => {
	const Keypad = require("./keypad.js");
	let kp;
	let fakeCalc;

	describe("Equals key", () => {
		it("Should have value `=`", () => {
			fakeCalc = {
				calculate: mock.fn(),
			};
			kp = new Keypad(fakeCalc);
			kp.addKey("=", "calculate");
			const [equalsKey] = kp.keys.filter((k) => k.value === "=");
			assert.notEqual(equalsKey, undefined);
		});

		it("Should call `calculate()` on the wrapped `Calculator` instance", () => {
			fakeCalc = {
				calculate: mock.fn(),
			};
			kp = new Keypad(fakeCalc);
			kp.addKey("=", "calculate");
			const [equalsKey] = kp.keys.filter((k) => k.value === "=");
			equalsKey.press();
			assert.equal(fakeCalc.calculate.mock.callCount(), 1);
		});
	});
});
