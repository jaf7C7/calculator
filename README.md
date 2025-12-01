# Calculator

A very simple calculator which can perform addition, subtraction,
multiplication and division.

Read about this project on [DeepWiki](https://deepwiki.com/jaf7C7/calculator).

## Try it out

The project is hosted live [here](https://jaf7C7.github.io/calculator).

To run it locally, clone the repository and run `npm install` from the project
root. When the dependencies have finished installing, Run `npm start` and visit
<http://localhost:8080>.

To run the user interface tests, visit <http://localhost:8080/ui-tests>.
To run all the other tests, run `npm test` from the project root.

## Tech stack:

- HTML5
- CSS3
- JavaScript ES6
- `mocha`, `chai`, `http-server` and `selenium` for testing

## Limitations

* Decimal precision is very poor (only 4 decimal places), so `0.9999` immediately becomes `1` etc.
* Numbers are stored internally as
  [`Number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
  and so results are limited to a precision of approximately 15 to 17 decimal
  places. For example, `0.9999999999999999` is rounded to `1`, and
  `9,999,999,999,999,999` is rounded to `10,000,000,000,000,000`.
* Numbers larger than `Number.MAX_VALUE`, or smaller than `Number.MIN_VALUE`
  are rounded to `infinity` and `0` respectively.
* The app has only been testing in Chrome.

## Known bugs

* pressing e.g. `.001` displays as `0` until `1` is pressed
