const assert = require("node:assert/strict");
const { describe, it, mock, beforeEach } = require("node:test");

describe("initApp()", () => {
	const initApp = require("./app.js");
	const { FakeUI } = require("./testDoubles.js");
	let mockUI;
	let fakeUI;

	beforeEach(() => {
		mockUI = {
			createButton: mock.fn(),
			createDisplay: mock.fn(),
		};
		fakeUI = new FakeUI();
		initApp(mockUI, fakeUI);
	});

	it("Should create primary and secondary displays", () => {
		assert.equal(mockUI.createDisplay.mock.callCount(), 2);
		assert.equal(
			mockUI.createDisplay.mock.calls[0].arguments[0],
			"primaryDisplay",
		);
		assert.equal(
			mockUI.createDisplay.mock.calls[1].arguments[0],
			"secondaryDisplay",
		);
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

	it("Should create an input button for number 0", () => {
		assert.equal(mockUI.createButton.mock.callCount(), 1);
		assert.equal(mockUI.createButton.mock.calls[0].arguments[0], "0");
	});
});
