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
		const primaryDisplay = fakeUI.getElement("primaryDisplay");
		const secondaryDisplay = fakeUI.getElement("secondaryDisplay");
		assert.equal(primaryDisplay.id, "primaryDisplay");
		assert.equal(secondaryDisplay.id, "secondaryDisplay");
	});

	[
		{ id: "btn0", value: "0" },
		{ id: "btn1", value: "1" },
		{ id: "btn2", value: "2" },
		{ id: "btn3", value: "3" },
		{ id: "btn4", value: "4" },
		{ id: "btn5", value: "5" },
		{ id: "btn6", value: "6" },
		{ id: "btn7", value: "7" },
		{ id: "btn8", value: "8" },
		{ id: "btn9", value: "9" },
		{ id: "btnDecPt", value: "." },
	].forEach(({ id, value }) => {
		describe(`Should create an input button for number ${value}`, () => {
			let button;

			beforeEach(() => {
				button = fakeUI.getElement(id);
			});

			it("Should have the correct id", () => {
				assert.equal(button.id, id);
			});

			it("Should have the correct value", () => {
				assert.equal(button.value, value);
			});

			it("Should have the correct callback", () => {
				button.onClick();
				assert.equal(mockCalc.inputChar.mock.callCount(), 1);
				assert.equal(mockCalc.inputChar.mock.calls[0].arguments[0], value);
			});
		});
	});

	describe("Should create a 'Del' button to delete characters from the input", () => {
		let button;

		beforeEach(() => {
			button = fakeUI.getElement("btnDel");
		});

		it("Should have the correct id", () => {
			assert.equal(button.id, "btnDel");
		});

		it("Should have the correct value", () => {
			assert.equal(button.value, "Del");
		});

		it("Should have the correct callback", () => {
			button.onClick();
			assert.equal(mockCalc.deleteChar.mock.callCount(), 1);
			assert.equal(mockCalc.deleteChar.mock.calls[0].arguments[0], undefined);
		});
	});
});
