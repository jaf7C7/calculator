const assert = require("node:assert");
const { describe, it, beforeEach } = require("node:test");
const { FakeDisplay, FakeUI } = require("./testDoubles.js");

describe("FakeDisplay", () => {
	let fakeDisplay;

	beforeEach(() => {
		fakeDisplay = new FakeDisplay();
	});

	it("Should read out the same text it was updated with", () => {
		fakeDisplay.update("hello");
		assert.equal(fakeDisplay.read(), "hello");
	});

	it("Should return an empty string if it has not been updated", () => {
		assert.equal(fakeDisplay.read(), "");
	});
});

describe("FakeUI", () => {
	let fakeUI;

	beforeEach(() => {
		fakeUI = new FakeUI();
	});

	it("Should be able to create and fetch display elements", () => {
		fakeUI.createDisplay("someID");
		assert.equal(fakeUI.getDisplay("someID").id, "someID");
	});

	it("Should be able to create and fetch button elements", () => {
		fakeUI.createButton("zeroButton", "0", () => "Click!");
		const zeroButton = fakeUI.getButton("zeroButton");
		assert.equal(zeroButton.id, "zeroButton");
		assert.equal(zeroButton.value, "0");
		assert.equal(zeroButton.onClick(), "Click!");
	});
});
