const assert = require("node:assert/strict");
const { describe, it, mock, beforeEach } = require("node:test");

describe("Keypad()", () => {
	const Keypad = require("./keypad.js");
	const functionKeys = [
		{ value: "=", function: "calculate" },
		{ value: "Del", function: "deleteChar" },
	];

	functionKeys.forEach((functionKey) => {
		describe(`Function key '${functionKey.value}'`, () => {
			let kp;
			let fakeCalc;
			let key;

			beforeEach(() => {
				fakeCalc = {};
				fakeCalc[functionKey.function] = mock.fn();
				kp = new Keypad(fakeCalc);
				kp.addKey(functionKey.value, functionKey.function);
				[key] = kp.keys.filter((k) => k.value === functionKey.value);
			});

			it(`Should have value '${functionKey.value}'`, () => {
				assert.notEqual(key, undefined);
			});

			it(`Should call '${functionKey.function}()' on the wrapped 'Calculator' instance`, () => {
				key.press();
				assert.equal(fakeCalc[functionKey.function].mock.callCount(), 1);
			});
		});
	});
});
