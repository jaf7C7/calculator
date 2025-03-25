# Calculator

A very simple calculator which can perform addition, subtraction,
multiplication and division.

## Tech stack:

- HTML5
- CSS3
- JavaScript ES6
- `mocha`, `chai`, `http-server` and `selenium` for testing

## Limitations

* Numbers larger than `Number.MAX_VALUE`, or smaller than `Number.MIN_VALUE` are
rounded to `infinity` and `0` respectively.
* Results are formatted according to `Number.toLocaleString()` and as such are
limited to the precision associated with the user's current locale.
