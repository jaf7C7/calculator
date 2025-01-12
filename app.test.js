import assert from "node:assert/strict";
import { describe, it, beforeEach } from "node:test";
import initApp from "./app.js";
import { FakeUI, MockCalculator } from "./testDoubles.js";

describe("initApp()", () => {
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
		{ id: "btn0", value: "0", onClick: "inputChar", arg: "0" },
		{ id: "btn1", value: "1", onClick: "inputChar", arg: "1" },
		{ id: "btn2", value: "2", onClick: "inputChar", arg: "2" },
		{ id: "btn3", value: "3", onClick: "inputChar", arg: "3" },
		{ id: "btn4", value: "4", onClick: "inputChar", arg: "4" },
		{ id: "btn5", value: "5", onClick: "inputChar", arg: "5" },
		{ id: "btn6", value: "6", onClick: "inputChar", arg: "6" },
		{ id: "btn7", value: "7", onClick: "inputChar", arg: "7" },
		{ id: "btn8", value: "8", onClick: "inputChar", arg: "8" },
		{ id: "btn9", value: "9", onClick: "inputChar", arg: "9" },
		{ id: "btnDecPt", value: ".", onClick: "inputChar", arg: "." },
		{ id: "btnDel", value: "Del", onClick: "deleteChar", arg: undefined },
		{ id: "btnAC", value: "AC", onClick: "clearAll", arg: undefined },
		{ id: "btnEquals", value: "=", onClick: "calculate", arg: undefined },
		{ id: "btnAdd", value: "+", onClick: "selectOperation", arg: "+" },
	].forEach(({ id, value, onClick, arg }) => {
		describe(`Should create a button for value ${value}`, () => {
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
				assert.equal(mockCalc[onClick].mock.callCount(), 1);
				assert.equal(mockCalc[onClick].mock.calls[0].arguments[0], arg);
			});
		});
	});
});
