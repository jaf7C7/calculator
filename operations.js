class Operation {
	constructor(symbol, operation) {
		this._symbol = symbol;
		this._operation = operation;
	}

	perform(a, b) {
		return this._operation(a, b);
	}

	toString() {
		return this._symbol;
	}
}

const add = new Operation("+", (a, b) => a + b);
const subtract = new Operation("-", (a, b) => a - b);
const multiply = new Operation("*", (a, b) => a * b);
const divide = new Operation("/", (a, b) => a / b);

export {add, subtract, multiply, divide};
