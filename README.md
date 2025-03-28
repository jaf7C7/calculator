# Calculator

A very simple calculator which can perform addition, subtraction,
multiplication and division.

## Try it out

Clone the repository and run `npm install` from the project root. When the
dependencies have finished installing, Run `npm start` and visit
<http://localhost:8080>.

## Tech stack:

- HTML5
- CSS3
- JavaScript ES6
- `mocha`, `chai`, `http-server` and `selenium` for testing

## Limitations

* Numbers are stored internally as
  [`Number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
  and so results are limited to a precision of approximately 15 to 17 decimal
  places. For example, `0.9999999999999999` is rounded to `1`, and
  `9,999,999,999,999,999` is rounded to `10,000,000,000,000,000`.
* Numbers larger than `Number.MAX_VALUE`, or smaller than `Number.MIN_VALUE`
  are rounded to `infinity` and `0` respectively.
