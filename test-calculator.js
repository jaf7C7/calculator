const assert = require("node:assert/strict");
const { describe, it, beforeEach } = require("node:test");

describe("Calculator", () => {
  const Calculator = require("./calculator.js");
  const MockUI = require("./mockUI.js");
  let ui;
  let calc;

  beforeEach(() => {
    ui = new MockUI();
    calc = new Calculator(ui);
  });

  it("should have displays which are initially blank", () => {
    assert.equal(ui.primaryDisplay.read(), "");
    assert.equal(ui.secondaryDisplay.read(), "");
  });

  describe("inputChar()", () => {
    it("should append the input character to the display", () => {
      calc.inputChar("1");
      assert.equal(ui.primaryDisplay.read(), "1");
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
      assert.equal(ui.primaryDisplay.read(), "1");
      assert.equal(ui.secondaryDisplay.read(), "2");
    });
  });

  describe("deleteChar()", () => {
    it("should delete the last character of the current operand", () => {
      calc.inputChar("1");
      calc.deleteChar();
      assert.equal(ui.primaryDisplay.read(), "");
    });

    it("should do nothing if the current operand is empty", () => {
      calc.deleteChar();
      assert.equal(ui.primaryDisplay.read(), "");
    });

    it("should correctly update the display after consecutive calculations", () => {
      calc.inputChar("1");
      calc.selectOperation("+");
      calc.inputChar("1");
      calc.calculate();
      calc.deleteChar();
      assert.equal(ui.primaryDisplay.read(), "");
      assert.equal(ui.secondaryDisplay.read(), "2");
    });
  });

  describe("selectOperation()", () => {
    it("should append the selected operand and operator to the secondary display", () => {
      calc.inputChar("1");
      calc.selectOperation("+");
      assert.equal(ui.secondaryDisplay.read(), "1+");
      assert.equal(ui.primaryDisplay.read(), "");
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
      assert.equal(ui.primaryDisplay.read(), "");
      assert.equal(ui.secondaryDisplay.read(), "");
    });

    it("should correctly update the display after consecutive calculations", () => {
      calc.inputChar("1");
      calc.selectOperation("+");
      calc.inputChar("1");
      calc.calculate();
      calc.selectOperation("+");
      assert.equal(ui.primaryDisplay.read(), "");
      assert.equal(ui.secondaryDisplay.read(), "2");
    });

    it("should correctly handle calculation chaining", () => {
      calc.inputChar("1");
      calc.selectOperation("+");
      calc.inputChar("1");
      calc.selectOperation("*");
      assert.equal(ui.primaryDisplay.read(), "");
      assert.equal(ui.secondaryDisplay.read(), "2*");
    });
  });

  describe("clearAll()", () => {
    it("should clear the primary display", () => {
      calc.inputChar("1");
      assert.notEqual(ui.primaryDisplay.read(), "");
      calc.clearAll();
      assert.equal(ui.primaryDisplay.read(), "");
    });

    it("should clear the secondary display", () => {
      calc.inputChar("1");
      calc.selectOperation("+");
      assert.notEqual(ui.secondaryDisplay.read(), "");
      calc.clearAll();
      assert.equal(ui.secondaryDisplay.read(), "");
    });

    it("should correctly update the display after consecutive calculations", () => {
      calc.inputChar("1");
      calc.selectOperation("+");
      calc.inputChar("1");
      calc.calculate();
      calc.clearAll();
      assert.equal(ui.primaryDisplay.read(), "");
      assert.equal(ui.secondaryDisplay.read(), "");
    });
  });

  describe("calculate()", () => {
    it("should display the calculation and its result", () => {
      calc.inputChar("1");
      calc.selectOperation("+");
      calc.inputChar("1");
      calc.calculate();
      assert.equal(ui.primaryDisplay.read(), "2");
      assert.equal(ui.secondaryDisplay.read(), "1+1");
    });

    it("should handle multiplication", () => {
      calc.inputChar("3");
      calc.selectOperation("*");
      calc.inputChar("3");
      calc.calculate();
      assert.equal(ui.primaryDisplay.read(), "9");
      assert.equal(ui.secondaryDisplay.read(), "3*3");
    });

    it("should handle division", () => {
      calc.inputChar("3");
      calc.selectOperation("/");
      calc.inputChar("3");
      calc.calculate();
      assert.equal(ui.primaryDisplay.read(), "1");
      assert.equal(ui.secondaryDisplay.read(), "3/3");
    });

    it("should handle subtraction", () => {
      calc.inputChar("3");
      calc.selectOperation("-");
      calc.inputChar("3");
      calc.calculate();
      assert.equal(ui.primaryDisplay.read(), "0");
      assert.equal(ui.secondaryDisplay.read(), "3-3");
    });
  });
});