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
});
