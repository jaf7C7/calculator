const assert = require("node:assert/strict");
const { describe, it, mock, beforeEach } = require("node:test");

describe("Keypad()", () => {
	const Keypad = require("./keypad.js");

	describe("Equals key", () => {
		let kp;
		let fakeCalc;
		let equalsKey;

		beforeEach(() => {
			fakeCalc = {
				calculate: mock.fn(),
			};
			kp = new Keypad(fakeCalc);
			kp.addKey("=", "calculate");
			[equalsKey] = kp.keys.filter((k) => k.value === "=");
		});

		it("Should have value `=`", () => {
			assert.notEqual(equalsKey, undefined);
		});

		it("Should call `calculate()` on the wrapped `Calculator` instance", () => {
			equalsKey.press();
			assert.equal(fakeCalc.calculate.mock.callCount(), 1);
		});
	});

	describe("Delete key", () => {
		let kp;
		let fakeCalc;
		let deleteKey;

		beforeEach(() => {
			fakeCalc = {
				deleteChar: mock.fn(),
			};
			kp = new Keypad(fakeCalc);
			kp.addKey("Del", "deleteChar");
			[deleteKey] = kp.keys.filter((k) => k.value === "Del");
		});

		it("Should have value `Del`", () => {
			assert.notEqual(deleteKey, undefined);
		});

		it("Should call `deleteChar()` on the wrapped `Calculator` instance", () => {
			deleteKey.press();
			assert.equal(fakeCalc.deleteChar.mock.callCount(), 1);
		});
	});
});
