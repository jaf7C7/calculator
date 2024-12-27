class Display {
  #content = "";

  update(text) {
    this.#content = text;
  }

  read() {
    return this.#content;
  }
}

class Button {
  constructor(value, onClick) {
    this.value = value;
    this.click = onClick;
  }
}

class MockUI {
  constructor() {
    this.primaryDisplay = new Display();
    this.secondaryDisplay = new Display();
    this.buttons = [];
  }

  createButton(value, onClick) {
    const btn = new Button(value, onClick);
    this.buttons.push(btn);
  }
}

module.exports = MockUI;
