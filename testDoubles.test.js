const assert = require("node:assert");
const { describe, it } = require("node:test");
const { FakeDisplay, FakeUI } = require("./testDoubles.js");

describe("FakeDisplay", () => {
	it("Should read out the same text it was updated with", () => {
		const fakeDisplay = new FakeDisplay();
		fakeDisplay.update("hello");
		assert.equal(fakeDisplay.read(), "hello");
	});

	it("Should return an empty string if it has not been updated", () => {
		const fakeDisplay = new FakeDisplay();
		assert.equal(fakeDisplay.read(), "");
	});
});

describe("FakeUI", () => {
	it("Should be able to create and fetch display elements", () => {
		const fakeUI = new FakeUI();
		fakeUI.createDisplay("someID");
		assert.equal(fakeUI.getDisplay("someID").id, "someID");
	});

	it("Should be able to create and fetch button elements", () => {
		const fakeUI = new FakeUI();
		fakeUI.createButton("zeroButton", "0");
		const zeroButton = fakeUI.getButton("zeroButton");
		assert.equal(zeroButton.id, "zeroButton");
		assert.equal(zeroButton.value, "0");
	});
});
