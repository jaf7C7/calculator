function createElement(type, textContent) {
    const element = document.createElement(type);
    element.textContent = textContent;
    document.body.appendChild(element);
}

function createApp() {
    createElement('h1', 'Calculator');
    createElement('p', 'Hello, world!');
}

window.addEventListener('DOMContentLoaded', createApp);