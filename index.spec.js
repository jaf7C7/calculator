import { assert } from "chai";
import { Builder, Browser, By, Key } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome.js"; // XXX: Breaks without '.js' extension

const url = "http://localhost:8080";
const options = new chrome.Options().addArguments("--headless=new");

describe("User Interface", () => {
	let driver;
	let display;

	beforeEach(async () => {
		driver = await new Builder()
			.forBrowser(Browser.CHROME)
			.setChromeOptions(options)
			.build();

		await driver.get(url);

		display = await driver.findElement(By.id("display"));
	});

	afterEach(async () => {
		await driver.quit();
	});

	describe("Input buttons", () => {
		it("Should echo input values on the display", async () => {
			const one = await driver.findElement(By.id("one"));

			await one.click();

			const displayed = await display.getAttribute("textContent");
			assert.equal("1", displayed);
		});

		it("Should echo a decimal point immediately as it is input", async () => {
			const one = await driver.findElement(By.id("one"));
			const point = await driver.findElement(By.id("point"));

			await one.click();
			await point.click();

			const displayed = await display.getAttribute("textContent");
			assert.equal("1.", displayed);
		});

		it("Should echo a leading decimal zero immediately as it is input", async () => {
			const one = await driver.findElement(By.id("one"));
			const point = await driver.findElement(By.id("point"));
			const zero = await driver.findElement(By.id("zero"));

			await one.click();
			await point.click();
			await zero.click();

			const displayed = await display.getAttribute("textContent");
			assert.equal("1.0", displayed);
		});

		it("Should echo an initial digit '0' if '.' is the first input", async () => {
			const point = await driver.findElement(By.id("point"));

			await point.click();

			const displayed = await display.getAttribute("textContent");
			assert.equal("0.", displayed);
		});

		it("Should only allow a single point per operand", async () => {
			const point = await driver.findElement(By.id("point"));

			await point.click();
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
			const one = await driver.findElement(By.id("one"));
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
		let one;
		let equals;

		beforeEach(async () => {
			one = await driver.findElement(By.id("one"));
			equals = await driver.findElement(By.id("equals"));
		});

		describe("Addition", () => {
			it("Should give the correct result", async () => {
				const plus = await driver.findElement(By.id("plus"));

				await one.click();
				await plus.click();
				await one.click();
				await equals.click();

				const result = await display.getAttribute("textContent");
				assert.equal("2", result);
			});

			it("Should be bound to the '+' key", async () => {
				await driver.actions().sendKeys("1+1", Key.ENTER).perform();

				const result = await display.getAttribute("textContent");
				assert.equal("2", result);
			});
		});

		describe("Subtraction", () => {
			it("Should give the correct result", async () => {
				const minus = await driver.findElement(By.id("minus"));

				await one.click();
				await minus.click();
				await one.click();
				await equals.click();

				const result = await display.getAttribute("textContent");
				assert.equal("0", result);
			});

			it("Should be bound to the '-' key", async () => {
				await driver.actions().sendKeys("1-1", Key.ENTER).perform();

				const result = await display.getAttribute("textContent");
				assert.equal("0", result);
			});

			it("Should be able to make an operand negative", async () => {
				const minus = await driver.findElement(By.id("minus"));
				const one = await driver.findElement(By.id("one"));

				await minus.click();

				let displayed = await display.getAttribute("textContent");
				assert.equal("-", displayed);

				await one.click();

				displayed = await display.getAttribute("textContent");
				assert.equal("-1", displayed);
			});
		});

		describe("Multiplication", () => {
			it("Should give the correct result", async () => {
				const times = await driver.findElement(By.id("times"));

				await one.click();
				await times.click();
				await one.click();
				await equals.click();

				const result = await display.getAttribute("textContent");
				assert.equal("1", result);
			});

			it("Should be bound to the '*' key", async () => {
				await driver.actions().sendKeys("1*1", Key.ENTER).perform();

				const result = await display.getAttribute("textContent");
				assert.equal("1", result);
			});
		});

		describe("Division", () => {
			it("Should give the correct result", async () => {
				const divide = await driver.findElement(By.id("divide"));

				await one.click();
				await divide.click();
				await one.click();
				await equals.click();

				const result = await display.getAttribute("textContent");
				assert.equal("1", result);
			});

			["/", "%"].forEach((key) => {
				it(`Should be bound to the '${key}' key`, async () => {
					await driver
						.actions()
						.sendKeys(`1${key}1`, Key.ENTER)
						.perform();

					const result = await display.getAttribute("textContent");
					assert.equal("1", result);
				});
			});
		});

		it("Should handle floating point numbers", async () => {
			const point = await driver.findElement(By.id("point"));
			const plus = await driver.findElement(By.id("plus"));

			await one.click();
			await point.click();
			await one.click();

			await plus.click();

			await one.click();
			await point.click();
			await one.click();

			await equals.click();

			const result = await display.getAttribute("textContent");
			assert.equal("2.2", result);
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
	});

	describe("Function buttons", () => {
		describe("AC button", () => {
			it("Should be able to clear the current calculation", async () => {
				const one = await driver.findElement(By.id("one"));
				const plus = await driver.findElement(By.id("plus"));
				const equals = await driver.findElement(By.id("equals"));
				const allClear = await driver.findElement(By.id("allClear"));

				await one.click();
				await plus.click();
				await one.click();
				await equals.click();
				await allClear.click();

				const displayed = await display.getAttribute("textContent");
				assert.equal("", displayed);
			});

			[
				["Delete", Key.DELETE],
				["Backspace", Key.BACK_SPACE],
			].forEach(([name, key]) => {
				it(`Should be bound to 'Ctrl+${name}'`, async () => {
					await driver.actions()
						.sendKeys("1")
						.keyDown(Key.CONTROL)
						.sendKeys(key)
						.keyUp(Key.CONTROL)
						.perform();

					const result = await display.getAttribute("textContent");
					assert.equal("", result);
				});
			});
		});

		describe("Equals button", () => {
			it("Should be bound to the '=' key", async () => {
				await driver.actions().sendKeys("1+1=").perform();

				const result = await display.getAttribute("textContent");
				assert.equal("2", result);
			});
		});

		describe("Del button", () => {
			it("Should be able to delete a digit from the current operand", async () => {
				const one = await driver.findElement(By.id("one"));
				const two = await driver.findElement(By.id("two"));
				const plus = await driver.findElement(By.id("plus"));
				const del = await driver.findElement(By.id("delete"));

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

			[
				["Delete", Key.DELETE],
				["Backspace", Key.BACK_SPACE],
			].forEach(([name, key]) => {
				it(`Should be bound to '${name}'`, async () => {
					await driver.actions().sendKeys("1", key).perform();

					const result = await display.getAttribute("textContent");
					assert.equal("", result);
				});
			});

			it("Should be able to delete an operator", async () => {
				const one = await driver.findElement(By.id("one"));
				const del = await driver.findElement(By.id("delete"));
				const plus = await driver.findElement(By.id("plus"));
				const minus = await driver.findElement(By.id("minus"));

				await one.click();
				await plus.click();
				await del.click();
				await minus.click();
				await one.click();

				const displayed = await display.getAttribute("textContent");
				assert.equal("1-1", displayed);
			});
		});
	});

	describe("Multiple calculations", () => {
		it("Should be able to handle consecutive calculations", async () => {
			const one = await driver.findElement(By.id("one"));
			const two = await driver.findElement(By.id("two"));
			const plus = await driver.findElement(By.id("plus"));
			const equals = await driver.findElement(By.id("equals"));

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
	});

	it("Should be able to handle negative numbers", async () => {
		const minus = await driver.findElement(By.id("minus"));
		const one = await driver.findElement(By.id("one"));
		const equals = await driver.findElement(By.id("equals"));

		await minus.click();
		await one.click();
		await minus.click();
		await one.click();
		await equals.click();

		const result = await display.getAttribute("textContent");
		assert.equal("-2", result);
	});
});
