import { Builder, Browser } from "selenium-webdriver";
import { assert } from "chai";

const url = "http://localhost:3000";

describe("User Interface", () => {
	let driver;

	beforeEach(async () => {
		driver = await new Builder().forBrowser(Browser.CHROME).build();
		await driver.get(url);
	});

	afterEach(async () => {
		await driver.quit();
	});

	it("Should have 'Calculator' as the page title", async () => {
		const title = await driver.getTitle();
		assert.equal("Calculator", title);
	});
});
