// https://nodejs.org/api/assert.html
const assert = require("node:assert/strict");
const Calculator = require("./calculator.js");

// https://mochajs.org/#assertions
describe("Calculator", () => {
  it("should require primary and secondary displays as constructor parameters", () => {
    const primaryDisplay = "foo";
    const secondaryDisplay = "bar";
    const calc = new Calculator(primaryDisplay, secondaryDisplay);
    assert.equal(
      calc.primaryDisplay === "foo" && calc.secondaryDisplay === "bar",
      true,
    );
  });
});
