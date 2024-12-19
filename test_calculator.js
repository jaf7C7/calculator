// https://nodejs.org/api/assert.html
const assert = require("node:assert/strict");

// https://mochajs.org/#assertions
describe("Calculator", () => {
  const Calculator = require("./calculator.js");
  let calc;

  beforeEach(() => {
    calc = new Calculator();
  });

  it("should have displays which are initially blank", () => {
    assert.equal(calc.primaryDisplay, "");
    assert.equal(calc.secondaryDisplay, "");
  });

  describe("inputChar()", () => {
    it("should append the input character to the display", () => {
      calc.inputChar("1");
      assert.equal(calc.primaryDisplay, "1");
    });

    it("should throw an error if the input character is not matched by '[.0-9]'", () => {
      assert.throws(
        () => {
          calc.inputChar("a");
        },
        { name: "TypeError", message: "Illegal input: 'a'" },
      );
    });

    it("should correctly update the display after consecutive calculations", () => {
      calc.inputChar("1");
      calc.selectOperation("+");
      calc.inputChar("1");
      calc.calculate();
      calc.inputChar("1");
      assert.equal(calc.primaryDisplay, "1");
      assert.equal(calc.secondaryDisplay, "2");
    });
  });

  describe("deleteChar()", () => {
    it("should delete the last character of the current operand", () => {
      calc.inputChar("1");
      calc.deleteChar();
      assert.equal(calc.primaryDisplay, "");
    });

    it("should do nothing if the current operand is empty", () => {
      calc.deleteChar();
      assert.equal(calc.primaryDisplay, "");
    });

    it("should correctly update the display after consecutive calculations", () => {
      calc.inputChar("1");
      calc.selectOperation("+");
      calc.inputChar("1");
      calc.calculate();
      calc.deleteChar();
      assert.equal(calc.primaryDisplay, "");
      assert.equal(calc.secondaryDisplay, "2");
    });
  });

  describe("selectOperation()", () => {
    it("should append the selected operand and operator to the secondary display", () => {
      calc.inputChar("1");
      calc.selectOperation("+");
      assert.equal(calc.secondaryDisplay, "1+");
      assert.equal(calc.primaryDisplay, "");
    });

    it("should throw an error if the selected operator is not matched by '[-+*/]'", () => {
      assert.throws(
        () => {
          calc.selectOperation("x");
        },
        { name: "TypeError", message: "Illegal operator: 'x'" },
      );
    });

    it("should do nothing if it is called without an initial operand", () => {
      calc.selectOperation("+");
      assert.equal(calc.primaryDisplay, "");
      assert.equal(calc.secondaryDisplay, "");
    });

    it("should correctly update the display after consecutive calculations", () => {
      calc.inputChar("1");
      calc.selectOperation("+");
      calc.inputChar("1");
      calc.calculate();
      calc.selectOperation("+");
      assert.equal(calc.primaryDisplay, "");
      assert.equal(calc.secondaryDisplay, "2");
    });
  });

  describe("clearAll()", () => {
    it("should clear the primary display", () => {
      calc.inputChar("1");
      assert.notEqual(calc.primaryDisplay, "");
      calc.clearAll();
      assert.equal(calc.primaryDisplay, "");
    });

    it("should clear the secondary display", () => {
      calc.inputChar("1");
      calc.selectOperation("+");
      assert.notEqual(calc.secondaryDisplay, "");
      calc.clearAll();
      assert.equal(calc.secondaryDisplay, "");
    });

    it("should correctly update the display after consecutive calculations", () => {
      calc.inputChar("1");
      calc.selectOperation("+");
      calc.inputChar("1");
      calc.calculate();
      calc.clearAll();
      assert.equal(calc.primaryDisplay, "");
      assert.equal(calc.secondaryDisplay, "");
    });
  });

  describe("calculate()", () => {
    it("should display the calculation and its result", () => {
      calc.inputChar("1");
      calc.selectOperation("+");
      calc.inputChar("1");
      calc.calculate();
      assert.equal(calc.primaryDisplay, "2");
      assert.equal(calc.secondaryDisplay, "1+1");
    });

    it("should handle multiplication", () => {
      calc.inputChar("3");
      calc.selectOperation("*");
      calc.inputChar("3");
      calc.calculate();
      assert.equal(calc.primaryDisplay, "9");
      assert.equal(calc.secondaryDisplay, "3*3");
    });

    it("should handle division", () => {
      calc.inputChar("3");
      calc.selectOperation("/");
      calc.inputChar("3");
      calc.calculate();
      assert.equal(calc.primaryDisplay, "1");
      assert.equal(calc.secondaryDisplay, "3/3");
    });

    it("should handle subtraction", () => {
      calc.inputChar("3");
      calc.selectOperation("-");
      calc.inputChar("3");
      calc.calculate();
      assert.equal(calc.primaryDisplay, "0");
      assert.equal(calc.secondaryDisplay, "3-3");
    });
  });
});
