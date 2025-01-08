const assert = require("node:assert/strict");
const { describe, it, mock } = require("node:test");

describe("initApp()", () => {
	const initApp = require("./app.js");

	it("Should create a primary display", () => {
		const fakeUI = { createPrimaryDisplay: mock.fn() };
		initApp(fakeUI);
		assert.equal(fakeUI.createPrimaryDisplay.mock.callCount(), 1);
	});
});
