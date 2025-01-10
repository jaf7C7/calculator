const assert = require("node:assert/strict");
const { describe, it, beforeEach } = require("node:test");

describe("initApp()", () => {
	const initApp = require("./app.js");
	const { FakeUI, MockCalculator } = require("./testDoubles.js");
	let fakeUI;
	let mockCalc;

	beforeEach(() => {
		fakeUI = new FakeUI();
		mockCalc = new MockCalculator();
		initApp(mockCalc, fakeUI);
	});

	it("Should create primary and secondary displays", () => {
		const primaryDisplay = fakeUI.getDisplay("primaryDisplay");
		const secondaryDisplay = fakeUI.getDisplay("secondaryDisplay");
		assert.equal(primaryDisplay.id, "primaryDisplay");
		assert.equal(secondaryDisplay.id, "secondaryDisplay");
	});

	it("Should create an input button for number 0", () => {
		const zeroButton = fakeUI.getButton("zeroButton");
		zeroButton.onClick();
		assert.equal(zeroButton.id, "zeroButton");
		assert.equal(zeroButton.value, "0");
		assert.equal(mockCalc.inputChar.mock.callCount(), 1);
		assert.equal(mockCalc.inputChar.mock.calls[0].arguments[0], "0");
	});
});
