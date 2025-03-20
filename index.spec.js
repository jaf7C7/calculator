import { assert } from "chai";
import { Builder, Browser, By } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome.js"; // XXX: Breaks without '.js' extension

const url = "http://localhost:8080";
const options = new chrome.Options().addArguments("--headless=new");

describe("User Interface", () => {
	let driver;
	let one;
	let two;
	let plus;
	let equals;
	let display;

	beforeEach(async () => {
		driver = await new Builder()
			.forBrowser(Browser.CHROME)
			.setChromeOptions(options)
			.build();
		await driver.get(url);
		one = await driver.findElement(By.id("one"));
		two = await driver.findElement(By.id("two"));
		equals = await driver.findElement(By.id("equals"));
		display = await driver.findElement(By.id("display"));
		plus = await driver.findElement(By.id("plus"));
	});

	afterEach(async () => {
		await driver.quit();
	});

	it("Should echo input values on the display", async () => {
		one.click();
		const displayed = await display.getAttribute("textContent");
		assert.equal("1", displayed);
	});

	it("Should handle addition", async () => {
		one.click();
		plus.click();
		one.click();

		const calculation = await display.getAttribute("textContent");
		assert.equal("1+1", calculation);

		equals.click();

		const result = await display.getAttribute("textContent");
		assert.equal("2", result);
	});

	it("Should handle subtraction", async () => {
		const minus = await driver.findElement(By.id("minus"));

		one.click();
		minus.click();
		one.click();

		const calculation = await display.getAttribute("textContent");
		assert.equal("1-1", calculation);

		equals.click();

		const result = await display.getAttribute("textContent");
		assert.equal("0", result);
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

	it("Should handle division", async () => {
		const divide = await driver.findElement(By.id("divide"));

		two.click();
		divide.click();
		two.click();

		const calculation = await display.getAttribute("textContent");
		assert.equal("2/2", calculation);

		equals.click();

		const result = await display.getAttribute("textContent");
		assert.equal("1", result);
	});

	it("Should be able to clear the current calculation", async () => {
		const times = await driver.findElement(By.id("times"));
		const allClear = await driver.findElement(By.id("allClear"));

		one.click();
		plus.click();
		one.click();
		equals.click();

		allClear.click();
		const calculation = await display.getAttribute("textContent");
		assert.equal("", calculation);

		two.click();
		times.click();
		two.click();
		equals.click();

		const result = await display.getAttribute("textContent");
		assert.equal("4", result);
	});

	it("Should handle multi-digit operands", async () => {
		const plus = await driver.findElement(By.id("plus"));

		one.click();
		one.click();
		plus.click();
		one.click();
		equals.click();

		const result = await display.getAttribute("textContent");
		assert.equal("12", result);
	});

	it("Should be able to delete a digit from the current operand", async () => {
		const del = await driver.findElement(By.id("delete"));
		const plus = await driver.findElement(By.id("plus"));

		one.click();
		one.click();
		del.click();
		plus.click();
		one.click();
		del.click();
		two.click();

		const calculation = await display.getAttribute("textContent");
		assert.equal("1+2", calculation);
	});

	it("Should display large numbers with commas for readability", async () => {
		for (let i = 0; i < 7; i++) {
			one.click();
		}
		plus.click();
		for (let i = 0; i < 7; i++) {
			two.click();
		}
		const calculation = await display.getAttribute("textContent");
		assert.equal("1,111,111+2,222,222", calculation);
	});
});
