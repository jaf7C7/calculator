class Display {
  #content = "";

  update(text) {
    this.#content = text;
  }

  read() {
    return this.#content;
  }
}

class MockUI {
  constructor() {
    this.primaryDisplay = new Display();
    this.secondaryDisplay = new Display();
  }

  clearDisplay() {
    this.primaryDisplay.update("");
    this.secondaryDisplay.update("");
  }
}

module.exports = MockUI;
