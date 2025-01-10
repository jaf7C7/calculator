function initApp(ui, calculator) {
	ui.createDisplay("primaryDisplay");
	ui.createDisplay("secondaryDisplay");
	ui.createButton("zeroButton", "0", () => {
		calculator.inputChar("0");
	});
}

module.exports = initApp;
