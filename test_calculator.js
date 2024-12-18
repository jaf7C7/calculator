// https://nodejs.org/api/assert.html
const assert = require("node:assert/strict");

// https://mochajs.org/#assertions
describe("Calculator", () => {
  const Calculator = require("./calculator.js");

  it("should have displays which are initially blank", () => {
    const calc = new Calculator();
    assert(calc.primaryDisplay === "" && calc.secondaryDisplay === "");
  });

  it("can input characters to the primary display", () => {
    const calc = new Calculator();
    calc.inputChar("a");
    assert(calc.primaryDisplay === "a");
  });

  it("can delete the last char from the primary display", () => {
    const calc = new Calculator();
    calc.primaryDisplay = "a";
    calc.deleteChar();
    assert(calc.primaryDisplay === "");
  });

  it("can clear both displays", () => {
    const calc = new Calculator();
    calc.primaryDisplay = "foo";
    calc.secondaryDisplay = "bar";
    calc.clearAll();
    assert(calc.primaryDisplay === "" && calc.secondaryDisplay === "");
  });

  it("can push an operand from the primary to secondary display", () => {
    const calc = new Calculator();
    calc.primaryDisplay = "156";
    calc.acceptOperand();
    assert(calc.primaryDisplay === "" && calc.secondaryDisplay === "156");
  });

  it("can append an operator to the secondary display", () => {
    const calc = new Calculator();
    calc.secondaryDisplay = "10";
    calc.selectOperation("+");
    assert(calc.secondaryDisplay === "10+" && calc.primaryDisplay === "");
  });
});
