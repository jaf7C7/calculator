const assert = require("node:assert/strict");
const { describe, it, mock, beforeEach } = require("node:test");

describe("initApp()", () => {
	const initApp = require("./app.js");
	let fakeUI;

	beforeEach(() => {
		fakeUI = {
			createButton: mock.fn(),
			createDisplay: mock.fn(),
		};
		initApp(fakeUI);
	});

	it("Should create primary and secondary displays", () => {
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

	it("Should create an input button for number 0", () => {
		assert.equal(fakeUI.createButton.mock.callCount(), 1);
		assert.equal(fakeUI.createButton.mock.calls[0].arguments[0], "0");
	});
});
