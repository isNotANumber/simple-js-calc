const sum = (a, b) => a + b;
const minus = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;
const divideWithRemainder = (a, b) => a % b;

const OPERATIONS = {
  "+": sum,
  "-": minus,
  "*": multiply,
  "/": divide,
  "%": divideWithRemainder,
};

export { OPERATIONS };
