import { assert } from "chai";
import createApp from "./app.js";
import FakeUI from "./testDoubles.js";

describe("Number 1 button", () => {
	it("Should have text content '1'", () => {
		const ui = new FakeUI();
		createApp(ui);
		const one = ui.getElement('#one');
		assert.equal("1", one.textContent);
	});
});
