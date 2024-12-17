// https://nodejs.org/api/assert.html
const assert = require("node:assert/strict");
const Calculator = require("./calculator.js");

// https://mochajs.org/#assertions
describe("Calculator", () => {
  it("should have primary and secondary displays", () => {
    const calc = new Calculator();
    assert.equal(
      Object.hasOwn(calc, "primaryDisplay") &&
        Object.hasOwn(calc, "secondaryDisplay"),
      true,
    );
  });
});
