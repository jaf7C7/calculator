const display = document.createElement("div");
display.id = "display";
document.body.appendChild(display);

const one = document.createElement("button");
one.id = "one";
document.body.appendChild(one);

one.addEventListener("click", () => {
	display.textContent = "1";
});
