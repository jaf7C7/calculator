const assert = require("node:assert/strict");
const { describe, it, mock, beforeEach } = require("node:test");

describe("Keypad()", () => {
	const Keypad = require("./keypad.js");
	const functionKeys = [
		{ value: "=", onPress: "calculate" },
		{ value: "Del", onPress: "deleteChar" },
	];

	functionKeys.forEach((functionKey) => {
		describe(`Function key '${functionKey.value}'`, () => {
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

			it(`Should have value '${functionKey.value}'`, () => {
				assert.notEqual(key, undefined);
			});

			it(`Should call '${functionKey.onPress}()' on the wrapped 'Calculator' instance`, () => {
				key.press();
				assert.equal(fakeCalc[functionKey.onPress].mock.callCount(), 1);
			});
		});
	});
});
