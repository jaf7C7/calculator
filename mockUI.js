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

  createButton(label, onClick) {
    const btn = { label: label, click: onClick };
    this.buttons.push(btn);
  }
}

module.exports = MockUI;
