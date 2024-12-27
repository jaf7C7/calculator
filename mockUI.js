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
  constructor(value, callback) {
    this.value = value;
    this.click = callback;
  }
}

class MockUI {
  constructor() {
    this.primaryDisplay = new Display();
    this.secondaryDisplay = new Display();
    this.buttons = [];
  }

  createButton(value, callback) {
    const btn = new Button(value, callback);
    this.buttons.push(btn);
  }
}

module.exports = MockUI;
