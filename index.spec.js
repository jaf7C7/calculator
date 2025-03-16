import { assert } from "chai";
import { Builder, Browser, By } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome.js"; // XXX: Breaks without '.js' extension

const url = "http://localhost:8080";

describe("User Interface", () => {
	let driver;

	beforeEach(async () => {
		driver = await new Builder()
			.forBrowser(Browser.CHROME)
			.setChromeOptions(new chrome.Options().addArguments("--headless=new"))
			.build();
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

	it("Should handle multiplication", async () => {
		const two = await driver.findElement(By.id("two"));
		const five = await driver.findElement(By.id("five"));
		const times = await driver.findElement(By.id("times"));
		const equals = await driver.findElement(By.id("equals"));
		const display = await driver.findElement(By.id("display"));

		two.click();
		times.click();
		five.click();
		const calculation = await display.getAttribute("textContent");

		assert.equal("2*5", calculation);

		equals.click();
		const result = await display.getAttribute("textContent");

		assert.equal("10", result);
	});
});
