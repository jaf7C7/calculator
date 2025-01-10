function initApp(calculator, ui) {
	ui.createDisplay("primaryDisplay");
	ui.createDisplay("secondaryDisplay");
	[
		{ id: "btn0", value: "0" },
		{ id: "btn1", value: "1" },
		{ id: "btn2", value: "2" },
		{ id: "btn3", value: "3" },
		{ id: "btn4", value: "4" },
		{ id: "btn5", value: "5" },
		{ id: "btn6", value: "6" },
		{ id: "btn7", value: "7" },
		{ id: "btn8", value: "8" },
		{ id: "btn9", value: "9" },
		{ id: "btnDecPt", value: "." },
	].forEach(({ id, value }) => {
		ui.createButton(id, value, () => {
			calculator.inputChar(value);
		});
	});
	ui.createButton("btnDel", "Del", () => {
		calculator.deleteChar();
	});
	ui.createButton("btnAC", "AC", () => {
		calculator.clearAll();
	});
}

module.exports = initApp;
