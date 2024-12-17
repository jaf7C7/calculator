# Calculator

A very simple calculator which can perform addition, subtraction,
multiplication and division.

[Try it out](https://jaf7c7.github.io/calculator)

## Tech stack:

- HTML5
- CSS3
- Vanilla ES6 JavaScript
- Mocha for testing

## Development process

- TDD
- Focus on low-coupling and high-cohesion

## Behaviour:

- The display is initially blank.
- The user can press input keys (`0`, `1`, ..., `9` and `.`) to enter an
  operand.
- This operand is echoed as it is typed on the primary display.
- Pressing `Del` will delete the last character entered.
- Pressing `AC` will clear all input and reset the calculator.
- Pressing an operator key (`/`, `*`, `+`, `-`) pushes the operand into the
  secondary display and appends the operator character.
  - e.g. entering `1` and then `+` will result in `1+` being displayed on the
    secondary display, and the primary display being empty.
- Pressing an operator key with an empty operand does nothing.
- A second operand can be entered the same way as the first.
- Once both the primary and secondary displays contain an operand, the user can
  press `=` to push the second operand into the secondary display, and display
  the result of the operator on both operands on the primary display.
  - e.g. Pressing `3`, `*` and `3`, then `=` would result in the secondary
    display containing `3*3` and the primary display containing `9`.
- Instead of pressing `=` the user can enter another operator, in which case
  the result of the previous calculation is displayed in the secondary display,
  and the operator character is appended as normal.
  - e.g. entering `1`, `+`, `1`, `*` and `3` would result in the secondary
    display containing `2*` (the result of `1+1`) and the primary display
    containing `3`. Pressing `=` would result in the secondary display
    containing `2*3`and the primary display containing `6`.
- The user can use the keyboard or mouse to fully control the calculator

## Design

```
 ┌─────────────────────────────────┐
 │                                 │
 │                         16*16   │ <-- secondary display
 │                           256   │ <-- primary display
 │                                 │
 ├─────────────────┬───────┬───────┤
 │                 │       │       │
 │       AC        │  Del  │   /   │
 │                 │       │       │
 ├────────┬────────┼───────┼───────┤
 │        │        │       │       │
 │   1    │   2    │   3   │   *   │
 │        │        │       │       │
 ├────────┼────────┼───────┼───────┤
 │        │        │       │       │
 │   4    │   5    │   6   │   +   │
 │        │        │       │       │
 ├────────┼────────┼───────┼───────┤
 │        │        │       │       │
 │   7    │   8    │   9   │   -   │
 │        │        │       │       │
 ├────────┼────────┼───────┴───────┤
 │        │        │               │
 │   .    │   0    │       =       │
 │        │        │               │
 └────────┴────────┴───────────────┘
```
