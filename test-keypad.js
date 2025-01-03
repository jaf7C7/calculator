const assert = require("node:assert/strict");
const { describe, it, beforeEach } = require("node:test");

describe("Keypad()", () => {
	const Keypad = require("./keypad.js");
	let kp;

	beforeEach(() => {
		kp = new Keypad();
	});

	describe("Equals key", () => {
		it("Should have value `=`", () => {
			kp.addKey("=");
			const [equalsKey] = kp.keys.filter((k) => k.value === "=");
			assert.notEqual(equalsKey, undefined);
		});
	});
});
