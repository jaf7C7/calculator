const assert = chai.assert;
import { UI, MockUI } from "./ui.js";

[
	{name: "UI", cls: UI},
	{name: "MockUI", cls: MockUI},
].forEach(({name, cls}) => {
	describe(name, () => {
		let ui;

		beforeEach(() => {
			ui = new cls();
		});

		describe("createElement()", () => {
			it("Should create an element with the correct attributes", () => {
				ui.createElement("div", "hi", "hi");

				const e = ui.findElement("hi");
				assert.equal("hi", e.textContent);
			});
		});

		describe("createDisplay()", () => {
			it("Should return a function to update a display element", () => {
				const displayFunction = ui.createDisplay();

				displayFunction("Hello.");

				const displayElement = ui.findElement("display");
				assert.equal("Hello.", displayElement.textContent)
			});
		});

		describe("createButton()", () => {
			let x

			beforeEach(() => {
				x = 0;
				ui.createButton("button", "😀", () => {
					x = 1;
				}, [{value: "x", ctrlKey: false}]);
			});

			it("Should create a button with the correct attributes", () => {
				const btn = ui.findElement("button");

				assert.equal("😀", btn.textContent);
			});

			it("Should create a button with the correct onClick callback", () => {
				const btn = ui.findElement("button");

				btn.click();

				assert.equal(1, x);
			});

			it("Should create a button with the correct keybinding", () => {
				const btn = ui.findElement("button");

				ui.pressKey({value: "x", ctrlKey: false});

				assert.equal(1, x);
			});
		});
	});
});
