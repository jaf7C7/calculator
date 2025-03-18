import { assert } from "chai";
import { Builder, Browser, By } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome.js"; // XXX: Breaks without '.js' extension

const url = "http://localhost:8080";

describe("User Interface", () => {
	let driver;
	let one;
	let two;
	let equals;
	let display;

	beforeEach(async () => {
		driver = await new Builder()
			.forBrowser(Browser.CHROME)
			.setChromeOptions(new chrome.Options().addArguments("--headless=new"))
			.build();
		await driver.get(url);
		one = await driver.findElement(By.id("one"));
		two = await driver.findElement(By.id("two"));
		equals = await driver.findElement(By.id("equals"));
		display = await driver.findElement(By.id("display"));
	});

	afterEach(async () => {
		await driver.quit();
	});

	it("Should handle addition", async () => {
		const plus = await driver.findElement(By.id("plus"));

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
		const times = await driver.findElement(By.id("times"));

		two.click();
		times.click();
		two.click();

		const calculation = await display.getAttribute("textContent");
		assert.equal("2*2", calculation);

		equals.click();

		const result = await display.getAttribute("textContent");
		assert.equal("4", result);
	});

	it("Should be able to clear the current calculation", async () => {
		const plus = await driver.findElement(By.id("plus"));
		const allClear = await driver.findElement(By.id("allClear"));

		one.click();
		plus.click();
		one.click();
		equals.click();
		allClear.click();

		const result = await display.getAttribute("textContent");
		assert.equal("", result);
	});

	it("Should handle consecutive calculations", async () => {
		const plus = await driver.findElement(By.id("plus"));
		const times = await driver.findElement(By.id("times"));
		const allClear = await driver.findElement(By.id("allClear"));

		one.click();
		plus.click();
		one.click();
		equals.click();

		allClear.click();

		two.click();
		times.click();
		two.click();
		equals.click();

		const result = await display.getAttribute("textContent");
		assert.equal("4", result);
	});
});
