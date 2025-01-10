function initApp(new_ui) {
	new_ui.createDisplay("primaryDisplay");
	new_ui.createDisplay("secondaryDisplay");
	new_ui.createButton("zeroButton", "0");
}

module.exports = initApp;
