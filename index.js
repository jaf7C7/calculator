class Container {
	constructor(element) {
		this._element = element;
	}

	_createElement(tagName, id, textContent = null, onClick = null) {
		const element = document.createElement(tagName);
		element.id = id;
		if (textContent !== null) {
			element.textContent = textContent;
		}
		if (onClick) {
			element.addEventListener("click", onClick);
		}
		this._element.appendChild(element);
		return element;
	}

	createButton(id, value, onClick) {
		this._createElement("button", id, value, onClick);
	}

	createDisplay() {
		const element = this._createElement("div", "display");
		return (text) => {
			element.textContent = text;
		};
	}
}

class Operator extends Function {
	constructor(value, operation) {
		const self = (...args) => operation(...args);
		self.value = value;
		return self;
	}
}

class Calculation {
	constructor() {
		this._firstOperand = "";
		this._secondOperand = "";
		this._currentOperand = "";
		this._operator = "";
	}

	input(value) {
		this._currentOperand += value;
	}

	_addOperand(operand) {
		if (operand !== "") {
			const _operand = Number(operand);
			if (!this._firstOperand) {
				this._firstOperand = _operand;
			} else {
				this._secondOperand = _operand;
			}
		}
	}

	selectOperator(operator) {
		this._addOperand(this._currentOperand);
		this._currentOperand = "";
		this._operator = operator;
	}

	calculate() {
		this._addOperand(this._currentOperand);
		this._currentOperand = "";
		return this._operator(this._firstOperand, this._secondOperand);
	}

	toString() {
		let str = "";
		if (this._firstOperand !== "") {
			str += formatNumber(this._firstOperand);
			str += this._operator.value;
		}
		if (this._currentOperand !== "") {
			str += formatNumber(this._currentOperand);
		}
		return str;
	}

	delete() {
		this._currentOperand = this._currentOperand.slice(0, -1);
	}
}

function formatNumber(str) {
	if (str.length > 15) {
		return BigInt(str).toLocaleString();
	}
	return Number(str).toLocaleString();
}

function add(a, b) {
	return a + b;
}

function subtract(a, b) {
	return a - b;
}

function multiply(a, b) {
	return a * b;
}

function divide(a, b) {
	return a / b;
}

function createApp() {
	const container = new Container(document.getElementById("calculator"));
	const display = container.createDisplay();
	let calculation = new Calculation();

	const inputButtons = [
		["one", 1],
		["two", 2],
		["three", 3],
		["four", 4],
		["five", 5],
		["six", 6],
		["seven", 7],
		["eight", 8],
		["nine", 9],
		["zero", 0],
	];

	const operationButtons = [
		["plus", "+", add],
		["minus", "-", subtract],
		["times", "*", multiply],
		["divide", "/", divide],
	];

	inputButtons.forEach(([id, value]) => {
		container.createButton(id, value, () => {
			calculation.input(value);
			display(calculation.toString());
		});
	});

	operationButtons.forEach(([id, value, operation]) => {
		const operator = new Operator(value, operation);
		container.createButton(id, operator.value, () => {
			calculation.selectOperator(operator);
			display(calculation.toString());
		});
	});

	container.createButton("equals", "=", () => {
		display(calculation.calculate());
		calculation = new Calculation();
	});

	container.createButton("allClear", "AC", () => {
		calculation = new Calculation();
		display(calculation.toString());
	});

	container.createButton("delete", "Del", () => {
		calculation.delete();
		display(calculation.toString());
	});
}

export default createApp();
