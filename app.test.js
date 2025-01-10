const assert = require("node:assert/strict");
const { describe, it, beforeEach } = require("node:test");

describe("initApp()", () => {
	const initApp = require("./app.js");
	const { FakeUI } = require("./testDoubles.js");
	let fakeUI;

	beforeEach(() => {
		fakeUI = new FakeUI();
		initApp(fakeUI);
	});

	it("Should create primary and secondary displays using the new fakeUI", () => {
		const primaryDisplay = fakeUI.getDisplay("primaryDisplay");
		const secondaryDisplay = fakeUI.getDisplay("secondaryDisplay");
		assert.equal(primaryDisplay.id, "primaryDisplay");
		assert.equal(secondaryDisplay.id, "secondaryDisplay");
	});

	it("Should create an input button for number 0 using the new fakeUI", () => {
		const zeroButton = fakeUI.getButton("zeroButton");
		assert.equal(zeroButton.value, "0");
	});
});
