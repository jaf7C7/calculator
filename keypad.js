import { add, subtract, multiply, divide } from "./operations.js";

const keypad = [
	{
		id: "one",
		value: "1",
		function: "input",
		args: ["1"],
		keybindings: [{ value: "1", ctrlKey: false }],
	},
	{
		id: "two",
		value: "2",
		function: "input",
		args: ["2"],
		keybindings: [{ value: "2", ctrlKey: false }],
	},
	{
		id: "three",
		value: "3",
		function: "input",
		args: ["3"],
		keybindings: [{ value: "3", ctrlKey: false }],
	},
	{
		id: "four",
		value: "4",
		function: "input",
		args: ["4"],
		keybindings: [{ value: "4", ctrlKey: false }],
	},
	{
		id: "five",
		value: "5",
		function: "input",
		args: ["5"],
		keybindings: [{ value: "5", ctrlKey: false }],
	},
	{
		id: "six",
		value: "6",
		function: "input",
		args: ["6"],
		keybindings: [{ value: "6", ctrlKey: false }],
	},
	{
		id: "seven",
		value: "7",
		function: "input",
		args: ["7"],
		keybindings: [{ value: "7", ctrlKey: false }],
	},
	{
		id: "eight",
		value: "8",
		function: "input",
		args: ["8"],
		keybindings: [{ value: "8", ctrlKey: false }],
	},
	{
		id: "nine",
		value: "9",
		function: "input",
		args: ["9"],
		keybindings: [{ value: "9", ctrlKey: false }],
	},
	{
		id: "zero",
		value: "0",
		function: "input",
		args: ["0"],
		keybindings: [{ value: "0", ctrlKey: false }],
	},
	{
		id: "point",
		value: ".",
		function: "input",
		args: ["."],
		keybindings: [{ value: ".", ctrlKey: false }],
	},
	{
		id: "plus",
		value: "+",
		function: "selectOperator",
		args: [add],
		keybindings: [{ value: "+", ctrlKey: false }],
	},
	{
		id: "minus",
		value: "-",
		function: "selectOperator",
		args: [subtract],
		keybindings: [{ value: "-", ctrlKey: false }],
	},
	{
		id: "times",
		value: "*",
		function: "selectOperator",
		args: [multiply],
		keybindings: [{ value: "*", ctrlKey: false }],
	},
	{
		id: "divide",
		value: "/",
		function: "selectOperator",
		args: [divide],
		keybindings: [
			{ value: "/", ctrlKey: false },
			{ value: "%", ctrlKey: false },
		],
	},
	{
		id: "equals",
		value: "=",
		function: "calculate",
		args: [],
		keybindings: [
			{ value: "=", ctrlKey: false },
			{ value: "Enter", ctrlKey: false },
		],
	},
	{
		id: "allClear",
		value: "AC",
		function: "clear",
		args: [],
		keybindings: [
			{ value: "Delete", ctrlKey: true },
			{ value: "Backspace", ctrlKey: true },
		],
	},
	{
		id: "delete",
		value: "Del",
		function: "delete",
		args: [],
		keybindings: [
			{ value: "Delete", ctrlKey: false },
			{ value: "Backspace", ctrlKey: false },
		],
	},
];

export default keypad;
