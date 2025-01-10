function initApp(calculator, ui) {
	ui.createDisplay("primaryDisplay");
	ui.createDisplay("secondaryDisplay");
	ui.createButton("zeroButton", "0", () => {
		calculator.inputChar("0");
	});
}

module.exports = initApp;
