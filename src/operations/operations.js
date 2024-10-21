const sum = (a, b) => a + b;
const minus = (a, b) => a - b;
const multiply = (a, b) => Math.round(a * b * 100) / 100;
const divide = (a, b) => Math.round(a / b * 100) / 100;
const divideWithRemainder = (a, b) => Math.round(a % b * 100) / 100;

const OPERATIONS = {
  "+": sum,
  "-": minus,
  "*": multiply,
  "/": divide,
  "%": divideWithRemainder,
};

export { OPERATIONS };
