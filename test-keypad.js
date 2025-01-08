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

	describe("addFunctionKey()", () => {
		it("Should call the correct method on the wrapped object", () => {
			const equalsKey = { value: "=", onPress: "calculate" };
			kp.addFunctionKey(equalsKey);
			const [key] = kp.keys.filter((k) => k.value === equalsKey.value);
			key.press();
			assert.equal(fakeCalc[equalsKey.onPress].mock.callCount(), 1);
		});
	});

	describe("addInputKey()", () => {
		it("Should call the correct method with the correct argument on the wrapped object", () => {
			const zeroKey = { value: "0", onPress: "inputChar" };
			kp.addInputKey(zeroKey);
			const [key] = kp.keys.filter((k) => k.value === zeroKey.value);
			key.press();
			assert.equal(
				fakeCalc[zeroKey.onPress].mock.calls[0].arguments[0],
				zeroKey.value,
			);
		});
	});
});
