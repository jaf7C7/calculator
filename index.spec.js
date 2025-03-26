import { assert } from "chai";
import { Builder, Browser, By, Key } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome.js"; // XXX: Breaks without '.js' extension

const url = "http://localhost:8080";
const options = new chrome.Options().addArguments("--headless=new");

describe("User Interface", () => {
	let driver;
	let point;
	let zero;
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
		point = await driver.findElement(By.id("point"));
		zero = await driver.findElement(By.id("zero"));
		one = await driver.findElement(By.id("one"));
		two = await driver.findElement(By.id("two"));
		equals = await driver.findElement(By.id("equals"));
		display = await driver.findElement(By.id("display"));
		plus = await driver.findElement(By.id("plus"));
	});

	afterEach(async () => {
		await driver.quit();
	});

	describe("Input buttons", () => {
		it("Should echo input values on the display", async () => {
			await one.click();

			const displayed = await display.getAttribute("textContent");
			assert.equal("1", displayed);
		});

		it("Should echo a decimal point immediately as it is input", async () => {
			await one.click();
			await point.click();

			const displayed = await display.getAttribute("textContent");
			assert.equal("1.", displayed);
		});

		it("Should echo a leading decimal zero immediately as it is input", async () => {
			await one.click();
			await point.click();
			await zero.click();

			const displayed = await display.getAttribute("textContent");
			assert.equal("1.0", displayed);
		});

		it("Should echo an initial digit '0' if '.' is the first input", async () => {
			await point.click();

			const displayed = await display.getAttribute("textContent");
			assert.equal("0.", displayed);
		});

		it("Should not echo operators if there are no operands", async () => {
			const plus = await driver.findElement(By.id("plus"));

			await plus.click();

			const displayed = await display.getAttribute("textContent");
			assert.equal("", displayed);
		});

		it("Should display large numbers with commas for readability", async () => {
			const plus = await driver.findElement(By.id("plus"));

			for (let i = 0; i < 7; i++) {
				await one.click();
			}

			const displayed = await display.getAttribute("textContent");
			assert.equal("1,111,111", displayed);
		});

		it("Should work via the keyboard", async () => {
			await driver.actions().sendKeys("1").perform();

			const displayed = await display.getAttribute("textContent");
			assert.equal("1", displayed);
		});
	});

	describe("Operation buttons", () => {
		let equals;

		beforeEach(async () => {
			equals = await driver.findElement(By.id("equals"));
		});

		it("Should handle addition", async () => {
			const plus = await driver.findElement(By.id("plus"));

			await one.click();
			await plus.click();
			await one.click();
			await equals.click();

			const result = await display.getAttribute("textContent");
			assert.equal("2", result);
		});

		it("Should handle subtraction", async () => {
			const minus = await driver.findElement(By.id("minus"));

			await one.click();
			await minus.click();
			await one.click();
			await equals.click();

			const result = await display.getAttribute("textContent");
			assert.equal("0", result);
		});

		it("Should handle multiplication", async () => {
			const times = await driver.findElement(By.id("times"));

			await one.click();
			await times.click();
			await one.click();
			await equals.click();

			const result = await display.getAttribute("textContent");
			assert.equal("1", result);
		});

		it("Should handle division", async () => {
			const divide = await driver.findElement(By.id("divide"));

			await one.click();
			await divide.click();
			await one.click();
			await equals.click();

			const result = await display.getAttribute("textContent");
			assert.equal("1", result);
		});

		it("Should handle floating point numbers", async () => {
			await zero.click();
			await point.click();
			await one.click();

			await plus.click();

			await zero.click();
			await point.click();
			await one.click();

			await equals.click();

			const result = await display.getAttribute("textContent");
			assert.equal("0.2", result);
		});
	});

	describe("AC button", () => {
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
	});

	describe("Del button", () => {
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
	});

	describe("Multiple calculations", () => {
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
