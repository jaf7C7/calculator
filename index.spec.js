import { Builder, Browser, By } from "selenium-webdriver";
import { assert } from "chai";

const url = "http://localhost:8080";

describe("User Interface", () => {
	let driver;

	beforeEach(async () => {
		driver = await new Builder().forBrowser(Browser.CHROME).build();
		await driver.get(url);
	});

	afterEach(async () => {
		await driver.quit();
	});

	it("Should handle addition", async () => {
		const one = await driver.findElement(By.id("one"));
		const plus = await driver.findElement(By.id("plus"));
		const equals = await driver.findElement(By.id("equals"));
		const display = await driver.findElement(By.id("display"));

		one.click();
		plus.click();
		one.click();
		const calculation = await display.getAttribute("textContent");

		assert.equal("1+1", calculation);

		equals.click();
		const result = await display.getAttribute("textContent");

		assert.equal("2", result);
	});
});
