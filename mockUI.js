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
    this.buttons = [];
  }

  createButton(value, onClick) {
    const btn = { value: value, click: onClick };
    this.buttons.push(btn);
  }
}

module.exports = MockUI;
