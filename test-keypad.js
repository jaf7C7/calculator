const assert = require("node:assert/strict");
const { describe, it, mock, beforeEach } = require("node:test");

describe("Keypad()", () => {
	const Keypad = require("./keypad.js");
	const functionKeys = [
		{ value: "=", deviceFunction: "calculate" },
		{ value: "Del", deviceFunction: "deleteChar" },
	];

	functionKeys.forEach((functionKey) => {
		describe(`Function key '${functionKey.value}'`, () => {
			let kp;
			let fakeCalc;
			let key;

			beforeEach(() => {
				fakeCalc = {};
				fakeCalc[functionKey.deviceFunction] = mock.fn();
				kp = new Keypad(fakeCalc);
				kp.addKey(functionKey);
				[key] = kp.keys.filter((k) => k.value === functionKey.value);
			});

			it(`Should have value '${functionKey.value}'`, () => {
				assert.notEqual(key, undefined);
			});

			it(`Should call '${functionKey.deviceFunction}()' on the wrapped 'Calculator' instance`, () => {
				key.press();
				assert.equal(fakeCalc[functionKey.deviceFunction].mock.callCount(), 1);
			});
		});
	});
});
