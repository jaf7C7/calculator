// https://nodejs.org/api/assert.html
const assert = require("node:assert/strict");

// https://mochajs.org/#assertions
describe("Calculator", () => {
  const Calculator = require("./calculator.js");

  it("should have primary and secondary displays", () => {
    const calc = new Calculator();
    assert.equal(
      Object.hasOwn(calc, "primaryDisplay") &&
        Object.hasOwn(calc, "secondaryDisplay"),
      true,
    );
  });

  it("should have displays which are initially blank", () => {
    const calc = new Calculator();
    assert.equal(
      calc.primaryDisplay === "" && calc.secondaryDisplay === "",
      true,
    );
  });

  it("can append characters to the primary display", () => {
    const calc = new Calculator();
    calc.appendChar("a");
    assert.equal(calc.primaryDisplay === "a", true);
  });

  it("can delete the last char from the primary display", () => {
    const calc = new Calculator();
    calc.primaryDisplay = "a";
    calc.deleteChar();
    assert.equal(calc.primaryDisplay === "", true);
  });
});
