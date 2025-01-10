function initApp(ui, new_ui) {
	ui.createDisplay("primaryDisplay");
	ui.createDisplay("secondaryDisplay");
	new_ui.createDisplay("primaryDisplay");
	new_ui.createDisplay("secondaryDisplay");
	ui.createButton("0");
}

module.exports = initApp;
