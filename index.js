import UI from "./ui.js";
import Calculator from "./calculator.js";
import {add, subtract, multiply, divide} from "./operations.js";
import keypad from "./keypad.js";

function createApp(ui) {
	const display = ui.createDisplay();
	const calculator = new Calculator(display);

	keypad.forEach((btn) => {
		ui.createButton(btn.id, btn.value, () => {
			calculator[btn.function](...btn.args);
		}, btn.keybindings);
	});
}

export default createApp;
