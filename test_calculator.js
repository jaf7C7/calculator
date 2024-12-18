// https://nodejs.org/api/assert.html
const assert = require("node:assert/strict");

// https://mochajs.org/#assertions
describe("Calculator", () => {
  const Calculator = require("./calculator.js");

  it("should have displays which are initially blank", () => {
    const calc = new Calculator();
    assert(calc.primaryDisplay === "" && calc.secondaryDisplay === "");
  });

  // ., 0, 1, ..., 9  (input keys)
  it("should display the correct characters when input keys are pressed", () => {
    const calc = new Calculator();
    calc.inputChar("1");
    assert(calc.primaryDisplay === "1");
  });

  // `inputChar` should fail if `char` is not matched by `[.0-9]`
  it("should throw an error if inputChar is called with an invalid character", () => {
    const calc = new Calculator();
    assert.throws(
      () => {
        calc.inputChar("a");
      },
      { name: "TypeError", message: "Illegal input: 'a'" },
    );
  });

  // Del
  it("should delete the last character of the current operand when the Del key is pressed", () => {
    const calc = new Calculator();
    calc.primaryDisplay = "a";
    calc.deleteChar();
    assert(calc.primaryDisplay === "");
  });

  // AC
  it("should clear both displays when the AC key is pressed", () => {
    const calc = new Calculator();
    calc.primaryDisplay = "foo";
    calc.secondaryDisplay = "bar";
    calc.clearAll();
    assert(calc.primaryDisplay === "" && calc.secondaryDisplay === "");
  });

  // -, +, *, /  (operator keys)
  it("should display the selected operand and operator when an operation is selected", () => {
    const calc = new Calculator();
    calc.primaryDisplay = "10";
    calc.secondaryDisplay = "";
    calc.selectOperation("+");
    assert(calc.secondaryDisplay === "10+" && calc.primaryDisplay === "");
  });

  // `selectOperation` should fail if `operator` is not matched by `[-+*/]`
  it("should throw an error if selectOperation is called with an invalid operator", () => {
    const calc = new Calculator();
    assert.throws(
      () => {
        calc.selectOperation("x");
      },
      { name: "TypeError", message: "Illegal operator: 'x'" },
    );
  });
});
