const roundResult = (value) =>  Math.round(value * 100) / 100;

const sum = (a, b) => roundResult(a + b);
const minus = (a, b) => roundResult(a - b);
const multiply = (a, b) => roundResult(a * b);
const divide = (a, b) => roundResult(a / b);
const divideWithRemainder = (a, b) => roundResult(a % b);

const OPERATIONS = {
  "+": sum,
  "-": minus,
  "*": multiply,
  "/": divide,
  "%": divideWithRemainder,
};

export { OPERATIONS };
