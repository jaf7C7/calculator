const assert = require("node:assert");
const { describe, it } = require("node:test");
const { FakeDisplay } = require("./testDoubles.js");

describe("FakeDisplay", () => {
	it("Should read out the same text it was updated with", () => {
		const fakeDisplay = new FakeDisplay();
		fakeDisplay.update("hello");
		assert.equal(fakeDisplay.read(), "hello");
	});
});
