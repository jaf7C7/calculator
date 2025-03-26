import { assert } from "chai";
import { Builder, Browser, By, Key } from "selenium-webdriver";
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
		await one.click();
		await plus.click();

		const displayed = await display.getAttribute("textContent");
		assert.equal("1+", displayed);
	});

	it("Should not echo operators if there are no operands", async () => {
		await plus.click();

		const displayed = await display.getAttribute("textContent");
		assert.equal("", displayed);
	});

	it("Should handle addition", async () => {
		const zero = await driver.findElement(By.id("zero"));

		await zero.click();
		await plus.click();
		await one.click();

		const displayed = await display.getAttribute("textContent");
		assert.equal("0+1", displayed);

		await equals.click();

		const result = await display.getAttribute("textContent");
		assert.equal("1", result);
	});

	it("Should handle subtraction", async () => {
		const minus = await driver.findElement(By.id("minus"));

		await one.click();
		await minus.click();
		await one.click();

		const displayed = await display.getAttribute("textContent");
		assert.equal("1-1", displayed);

		await equals.click();

		const result = await display.getAttribute("textContent");
		assert.equal("0", result);
	});

	it("Should handle multiplication", async () => {
		const times = await driver.findElement(By.id("times"));

		await two.click();
		await times.click();
		await two.click();

		const displayed = await display.getAttribute("textContent");
		assert.equal("2*2", displayed);

		await equals.click();

		const result = await display.getAttribute("textContent");
		assert.equal("4", result);
	});

	it("Should handle division", async () => {
		const divide = await driver.findElement(By.id("divide"));

		await two.click();
		await divide.click();
		await two.click();

		const displayed = await display.getAttribute("textContent");
		assert.equal("2/2", displayed);

		await equals.click();

		const result = await display.getAttribute("textContent");
		assert.equal("1", result);
	});

	it("Should be able to clear the current calculation", async () => {
		const times = await driver.findElement(By.id("times"));
		const allClear = await driver.findElement(By.id("allClear"));

		await one.click();
		await plus.click();
		await one.click();
		await equals.click();
		await allClear.click();

		const displayed = await display.getAttribute("textContent");
		assert.equal("", displayed);
	});

	it("Should be able to handle consecutive calculations", async () => {
		await one.click();
		await plus.click();
		await one.click();
		await equals.click();

		await two.click();
		await plus.click();
		await two.click();
		await equals.click();

		const result = await display.getAttribute("textContent");
		assert.equal("4", result);
	});

	it("Should handle multi-digit operands", async () => {
		const plus = await driver.findElement(By.id("plus"));

		await one.click();
		await one.click();
		await plus.click();
		await one.click();
		await equals.click();

		const result = await display.getAttribute("textContent");
		assert.equal("12", result);
	});

	it("Should be able to delete a digit from the current operand", async () => {
		const del = await driver.findElement(By.id("delete"));
		const plus = await driver.findElement(By.id("plus"));

		await one.click();
		await one.click();
		await del.click();
		await plus.click();
		await one.click();
		await del.click();
		await two.click();

		const displayed = await display.getAttribute("textContent");
		assert.equal("1+2", displayed);
	});

	it("Should display large numbers with commas for readability", async () => {
		for (let i = 0; i < 7; i++) {
			await one.click();
		}
		await plus.click();
		for (let i = 0; i < 7; i++) {
			await two.click();
		}

		const displayed = await display.getAttribute("textContent");
		assert.equal("1,111,111+2,222,222", displayed);
	});

	it("Should handle floating point calculations", async () => {
		const zero = await driver.findElement(By.id("zero"));
		const point = await driver.findElement(By.id("point"));

		await point.click();
		await one.click();
		await plus.click();
		await zero.click();
		await point.click();
		await two.click();

		const displayed = await display.getAttribute("textContent");
		assert.equal("0.1+0.2", displayed);

		await equals.click();

		const result = await display.getAttribute("textContent");
		assert.equal("0.3", result);
	});

	it("Should assume initial digit '0' if '.' is the first input", async () => {
		const point = await driver.findElement(By.id("point"));

		await point.click();

		const displayed = await display.getAttribute("textContent");
		assert.equal("0.", displayed);
	});

	it("Should respond to key events", async () => {
		const actions = driver.actions();

		await actions.sendKeys("0.1*2", Key.BACK_SPACE, "3000").perform();

		let displayed = await display.getAttribute("textContent");
		assert.equal("0.1*3,000", displayed);

		await actions.sendKeys(Key.ENTER).perform();

		const result = await display.getAttribute("textContent");
		assert.equal("300", result);

		await actions.keyDown(Key.CONTROL)
			.sendKeys(Key.BACK_SPACE)
			.keyUp(Key.CONTROL)
			.perform();

		displayed = await display.getAttribute("textContent");
		assert.equal("", displayed);
	});
});
