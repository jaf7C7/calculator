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
});
