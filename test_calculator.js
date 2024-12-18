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
  });

  describe("deleteChar()", () => {
    it("should delete the last character of the current operand", () => {
      calc.primaryDisplay = "a";
      calc.deleteChar();
      assert.equal(calc.primaryDisplay, "");
    });
  });

  describe("clearAll()", () => {
    it("should clear both displays", () => {
      calc.primaryDisplay = "foo";
      calc.secondaryDisplay = "bar";
      calc.clearAll();
      assert.equal(calc.primaryDisplay, "");
      assert.equal(calc.secondaryDisplay, "");
    });
  });

  describe("selectOperation()", () => {
    it("should append the selected operand and operator to the secondary display", () => {
      calc.primaryDisplay = "10";
      calc.secondaryDisplay = "";
      calc.selectOperation("+");
      assert.equal(calc.secondaryDisplay, "10+");
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
      calc.primaryDisplay = "";
      calc.secondaryDisplay = "";
      calc.selectOperation("+");
      assert.equal(calc.secondaryDisplay, "");
    });
  });

  describe("calculate()", () => {
    it("should display the result of the operation on the primary display", () => {
      calc.primaryDisplay = "10";
      calc.secondaryDisplay = "10+";
      calc.calculate();
      assert.equal(calc.primaryDisplay, "20");
      assert.equal(calc.secondaryDisplay, "10+10");
    });
  });
});
