import { assert } from "chai";
import { Builder, Browser, By, Key } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome.js";

const url = "http://localhost:8080/ui.spec.html";
const options = new chrome.Options().addArguments("--headless=new");

describe("UI", () => {
	let driver;
	let executeScript;

	beforeEach(async () => {
		driver = await new Builder()
			.forBrowser(Browser.CHROME)
			.setChromeOptions(options)
			.build();

		executeScript = async (script) => {
			await driver.executeScript(`
				let UI;
				await import("./ui.js").then((m) => UI = m.default);
				const ui = new UI();
				${script}
			`);
		};

		await driver.get(url);
	});

	afterEach(async () => {
		await driver.quit();
	});

	describe("createElement()", () => {
		it("Should create an element with the correct attributes", async () => {
			await executeScript("ui.createElement('div', 'hi', 'hi');\n");

			const e = await driver.findElement(By.id("hi"));
			const textContent = await e.getAttribute("textContent");

			assert.equal("hi", textContent);
		});
	});

	describe("createDisplay()", () => {
		it("Should return a function to update a display element", async () => {
			await executeScript(`
				const display = ui.createDisplay();
				display("Hello.");
			`);

			const display = await driver.findElement(By.id("display"));
			const displayed = await display.getAttribute("textContent");

			assert.equal("Hello.", displayed)
		});
	});

	describe("createButton()", () => {
		beforeEach(async () => {
			await executeScript(`
				ui.createButton("button", "😀", () => {
					document.title = "Hello.";
				}, [{value: "x", ctrlKey: false}]);
			`);
		});

		it("Should create a button with the correct attributes", async () => {
			const btn = await driver.findElement(By.id("button"));
			const textContent = await btn.getAttribute("textContent");

			assert.equal("😀", textContent);
		});

		it("Should create a button with the correct onClick callback", async () => {
			const btn = await driver.findElement(By.id("button"));

			await btn.click();

			const title = await driver.getTitle();
			assert.equal(title, "Hello.");
		});

		it("Should create a button with the correct keybinding", async () => {
			const btn = await driver.findElement(By.id("button"));

			await driver.actions().sendKeys("x").perform();

			const title = await driver.getTitle();
			assert.equal(title, "Hello.");
		});
	});
});
