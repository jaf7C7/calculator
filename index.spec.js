import { Builder, Browser, By } from "selenium-webdriver";
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

	it("Should have a container element with id 'calculator'", async () => {
		const results = await driver.findElements(By.id("calculator"));
		assert.notEqual(0, results.length);
	});

	it("Should echo input numbers to the display", async () => {
		const one = await driver.findElement(By.id("one"));
		const display = await driver.findElement(By.id("display"));
		one.click();
		const displayedText = await display.getAttribute("textContent");
		assert.equal("1", displayedText);
	});

	it("Should calculate '1 + 1 = 2' correctly", async () => {
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
