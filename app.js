function initApp(ui, new_ui) {
	ui.createDisplay("primaryDisplay");
	ui.createDisplay("secondaryDisplay");
	new_ui.createDisplay("primaryDisplay");
	new_ui.createDisplay("secondaryDisplay");
	new_ui.createButton("zeroButton", "0");
	ui.createButton("0");
}

module.exports = initApp;
