import { assert } from "chai";
import MockUI from "./mockUI.js";
import createApp from "./createApp.js";

describe("Calculator (Mocked UI)", () => {
	let ui;
	let display;

	beforeEach(() => {
		ui = new MockUI();
		createApp(ui);
		display = ui.findElement("display");
	});

	describe("Input buttons", () => {
		it("Should echo input values on the display", () => {
			const one = ui.findElement("one");

			one.click();

			assert.equal("1", display.textContent);
		});

		it("Should echo a decimal point immediately as it is input", () => {
			const one = ui.findElement("one");
			const point = ui.findElement("point");

			one.click();
			point.click();

			assert.equal("1.", display.textContent);
		});

		it("Should echo a leading decimal zero immediately as it is input", () => {
			const one = ui.findElement("one");
			const point = ui.findElement("point");
			const zero = ui.findElement("zero");

			one.click();
			point.click();
			zero.click();

			assert.equal("1.0", display.textContent);
		});

		it("Should echo an initial digit '0' if '.' is the first input", () => {
			const point = ui.findElement("point");

			point.click();

			assert.equal("0.", display.textContent);
		});

		it("Should only allow a single point per operand", () => {
			const point = ui.findElement("point");

			point.click();
			point.click();

			assert.equal("0.", display.textContent);
		});

		it("Should not echo operators if there are no operands", () => {
			const plus = ui.findElement("plus");

			plus.click();

			assert.equal("", display.textContent);
		});

		it("Should display large numbers with commas for readability", () => {
			const one = ui.findElement("one");
			const plus = ui.findElement("plus");

			for (let i = 0; i < 7; i++) {
				one.click();
			}

			assert.equal("1,111,111", display.textContent);
		});

		it("Should work via the keyboard", () => {
			ui.pressKey({value: "1", ctrlKey: false});

			assert.equal("1", display.textContent);
		});
	});

	describe("Operation buttons", () => {
		describe("Addition", () => {
			it("Should give the correct result", () => {
				const plus = ui.findElement("plus");
				const one = ui.findElement("one");
				const equals = ui.findElement("equals");

				one.click();
				plus.click();
				one.click();
				equals.click();

				assert.equal("2", display.textContent);
			});

			it("Should be bound to the '+' key", () => {
				ui.pressKey({value: "1", ctrlKey: false});
				ui.pressKey({value: "+", ctrlKey: false});
				ui.pressKey({value: "1", ctrlKey: false});
				ui.pressKey({value: "Enter", ctrlKey: false});

				assert.equal("2", display.textContent);
			});
		});

		describe("Subtraction", () => {
			it("Should give the correct result", () => {
				const minus = ui.findElement("minus");
				const one = ui.findElement("one");
				const equals = ui.findElement("equals");

				one.click();
				minus.click();
				one.click();
				equals.click();

				assert.equal("0", display.textContent);
			});

			it("Should be bound to the '-' key", () => {
				ui.pressKey({value: "1", ctrlKey: false});
				ui.pressKey({value: "-", ctrlKey: false});
				ui.pressKey({value: "1", ctrlKey: false});
				ui.pressKey({value: "Enter", ctrlKey: false});

				assert.equal("0", display.textContent);
			});

			it("Should be able to make an operand negative", () => {
				const minus = ui.findElement("minus");
				const one = ui.findElement("one");

				minus.click();

				assert.equal("-", display.textContent);

				one.click();

				assert.equal("-1", display.textContent);
			});

			it("Should be idempotent when used to make an operand negative", () => {
				const minus = ui.findElement("minus");
				const one = ui.findElement("one");
				const plus = ui.findElement("plus");

				minus.click();
				minus.click();
				one.click();

				assert.equal("-1", display.textContent);
			});
		});

		describe("Multiplication", () => {
			it("Should give the correct result", () => {
				const times = ui.findElement("times");
				const one = ui.findElement("one");
				const equals = ui.findElement("equals");

				one.click();
				times.click();
				one.click();
				equals.click();

				assert.equal("1", display.textContent);
			});

			it("Should be bound to the '*' key", () => {
				ui.pressKey({value: "1", ctrlKey: false});
				ui.pressKey({value: "*", ctrlKey: false});
				ui.pressKey({value: "1", ctrlKey: false});
				ui.pressKey({value: "Enter", ctrlKey: false});

				assert.equal("1", display.textContent);
			});
		});

		describe("Division", () => {
			it("Should give the correct result", () => {
				const divide = ui.findElement("divide");
				const one = ui.findElement("one");
				const equals = ui.findElement("equals");

				one.click();
				divide.click();
				one.click();
				equals.click();

				assert.equal("1", display.textContent);
			});

			["/", "%"].forEach((key) => {
				it(`Should be bound to the '${key}' key`, () => {
					ui.pressKey({value: "1", ctrlKey: false});
					ui.pressKey({value: key, ctrlKey: false});
					ui.pressKey({value: "1", ctrlKey: false});
					ui.pressKey({value: "Enter", ctrlKey: false});

					assert.equal("1", display.textContent);
				});
			});
		});

		it("Should handle floating point numbers", () => {
			const one = ui.findElement("one");
			const point = ui.findElement("point");
			const plus = ui.findElement("plus");
			const equals = ui.findElement("equals");

			one.click();
			point.click();
			one.click();

			plus.click();

			one.click();
			point.click();
			one.click();

			equals.click();

			assert.equal("2.2", display.textContent);
		});

		it("Should handle multi-digit operands", () => {
			const one = ui.findElement("one");
			const point = ui.findElement("point");
			const plus = ui.findElement("plus");
			const equals = ui.findElement("equals");

			one.click();
			one.click();
			plus.click();
			one.click();
			equals.click();

			assert.equal("12", display.textContent);
		});

		it("Should be able to handle negative numbers", () => {
			const one = ui.findElement("one");
			const minus = ui.findElement("minus");
			const equals = ui.findElement("equals");

			minus.click();
			one.click();
			minus.click();
			one.click();
			equals.click();

			assert.equal("-2", display.textContent);
		});

		it("Should only allow one operator at a time", () => {
			const one = ui.findElement("one");
			const plus = ui.findElement("plus");
			const times = ui.findElement("times");
			const equals = ui.findElement("equals");

			one.click();
			plus.click();
			times.click();

			assert.equal("1+", display.textContent);
		});
	});

	describe("Function buttons", () => {
		describe("AC button", () => {
			it("Should be able to clear the current calculation", () => {
				const one = ui.findElement("one");
				const plus = ui.findElement("plus");
				const equals = ui.findElement("equals");
				const allClear = ui.findElement("allClear");

				one.click();
				plus.click();
				one.click();
				equals.click();
				allClear.click();

				assert.equal("", display.textContent);
			});

			["Delete", "Backspace"].forEach((key) => {
				it(`Should be bound to 'Ctrl+${key}'`, () => {
					ui.pressKey({value: "1", ctrlKey: false});
					ui.pressKey({value: key, ctrlKey: true});

					assert.equal("", display.textContent);
				});
			});
		});

		describe("Equals button", () => {
			it("Should be bound to the '=' key", () => {
				ui.pressKey({value: "1", ctrlKey: false});
				ui.pressKey({value: "+", ctrlKey: false});
				ui.pressKey({value: "1", ctrlKey: false});
				ui.pressKey({value: "=", ctrlKey: false});

				assert.equal("2", display.textContent);
			});

			it("Should not update the display without a calculation", () => {
				const equals = ui.findElement("equals");

				equals.click();

				assert.equal("", display.textContent);
			});
		});

		describe("Del button", () => {
			it("Should be able to delete a digit from the current operand", () => {
				const one = ui.findElement("one");
				const two = ui.findElement("two");
				const plus = ui.findElement("plus");
				const del = ui.findElement("delete");

				one.click();
				one.click();
				del.click();

				plus.click();

				one.click();
				del.click();
				two.click();

				assert.equal("1+2", display.textContent);
			});

			["Delete", "Backspace"].forEach((key) => {
				it(`Should be bound to '${key}'`, () => {
					ui.pressKey({value: "1", ctrlKey: false});
					ui.pressKey({value: key, ctrlKey: false});

					assert.equal("", display.textContent);
				});
			});

			it("Should be able to delete an operator", () => {
				const one = ui.findElement("one");
				const del = ui.findElement("delete");
				const plus = ui.findElement("plus");
				const minus = ui.findElement("minus");

				one.click();
				plus.click();
				del.click();
				minus.click();
				one.click();

				assert.equal("1-1", display.textContent);
			});
		});
	});

	describe("Multiple calculations", () => {
		it("Should be able to handle consecutive calculations", () => {
			const one = ui.findElement("one");
			const two = ui.findElement("two");
			const plus = ui.findElement("plus");
			const equals = ui.findElement("equals");

			one.click();
			plus.click();
			one.click();
			equals.click();

			two.click();
			plus.click();
			two.click();
			equals.click();

			assert.equal("4", display.textContent);
		});

		it("Should be able to chain operations together", () => {
			const one = ui.findElement("one");
			const two = ui.findElement("two");
			const plus = ui.findElement("plus");
			const minus = ui.findElement("minus");

			one.click();
			plus.click();
			one.click();
			minus.click();

			assert.equal("2-", display.textContent);
		});
	});
});
