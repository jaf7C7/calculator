const assert = require("node:assert/strict");
const { describe, it, mock } = require("node:test");

describe("initApp()", () => {
	const initApp = require("./app.js");

	it("Should create primary and secondary displays", () => {
		const fakeUI = { createDisplay: mock.fn() };
		initApp(fakeUI);
		assert.equal(fakeUI.createDisplay.mock.callCount(), 2);
		assert.equal(
			fakeUI.createDisplay.mock.calls[0].arguments[0],
			"primaryDisplay",
		);
		assert.equal(
			fakeUI.createDisplay.mock.calls[1].arguments[0],
			"secondaryDisplay",
		);
	});
});
