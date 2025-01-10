const assert = require("node:assert");
const { describe, it } = require("node:test");
const { FakeDisplay, FakeUI } = require("./testDoubles.js");

describe("FakeDisplay", () => {
	it("Should read out the same text it was updated with", () => {
		const fakeDisplay = new FakeDisplay();
		fakeDisplay.update("hello");
		assert.equal(fakeDisplay.read(), "hello");
	});
});

describe("FakeUI", () => {
	it("Should be able to create and fetch display elements", () => {
		const fakeUI = new FakeUI();
		fakeUI.createDisplay("someID");
		assert.equal(fakeUI.getDisplay("someID").id, "someID");
	});
});
