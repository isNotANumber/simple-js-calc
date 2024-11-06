import {
  isDot,
  isOperator,
  isNumber,
  isOperatorInExpression,
  replaceInOperands,
  isDotAllowed,
  isValidChar,
} from "../util/util.js";
import { OPERATIONS } from "../operations/operations.js";
import { writeToDisplay } from "../display/display.js";
import { operatorsRegex, negNumberRegex } from "../const/const.js";

const calcStore = {
  expression: "0",
};

/**
 * Parse current expression.
 * @returns operands and operator.
 */
function parseExpression() {
  const operator = calcStore.expression.match(operatorsRegex);
  const operands = calcStore.expression.split(operator);

  return operator ? [...operands, ...operator] : [...operands];
}

/**
 * Clears the expression.
 */
function clearExpression() {
  calcStore.expression = "0";
  writeToDisplay(calcStore.expression);
}

/**
 * Deletes the last character from the expression.
 */
function deleteLastChar() {
  calcStore.expression = negNumberRegex.test(calcStore.expression)
    ? calcStore.expression.replace(negNumberRegex, "0")
    : calcStore.expression.slice(0, -1) || "0";

  writeToDisplay(calcStore.expression);
}

function calculateResult() {
  let [firstOperand, secondOperand, operator] = parseExpression();

  if (secondOperand) {
    [firstOperand, secondOperand] = replaceInOperands(
      "neg",
      "-",
      firstOperand,
      secondOperand
    );
    calcStore.expression = String(
      OPERATIONS[operator](Number(firstOperand), Number(secondOperand))
    ).replaceAll("-", "neg");
  } else {
    calcStore.expression = firstOperand;
  }

  writeToDisplay(calcStore.expression);
}

/**
 * Appends a value to the calc expression.
 * @param {string} value - The value to append.
 */
function updateExpression(value) {
  const lastChar = calcStore.expression.slice(-1);

  if (isDot(value) && isDotAllowed(calcStore.expression)) {
    calcStore.expression += isOperator(lastChar) ? "0." : value;
  }

  if (isValidChar(value)) {
    if (isNumber(value) && calcStore.expression === "0") {
      calcStore.expression = value;
    } else if (isOperator(value) && isOperator(lastChar)) {
      calcStore.expression = calcStore.expression.slice(0, -1) + value;
    } else if (
      isOperator(value) &&
      isOperatorInExpression(calcStore.expression)
    ) {
      calculateResult();
      calcStore.expression += value;
    } else {
      calcStore.expression += value;
    }
  }

  writeToDisplay(calcStore.expression);
}

/**
 * Toggles the sign of the current number on the expression.
 */
function toggleSign() {
  let [firstOperand, secondOperand, operator] = parseExpression();

  if (firstOperand === "0") {
    return;
  }

  if (!secondOperand) {
    firstOperand = firstOperand.includes("neg")
      ? firstOperand.slice(3)
      : "neg" + firstOperand;
  } else {
    secondOperand = secondOperand.includes("neg")
      ? secondOperand.slice(3)
      : "neg" + secondOperand;
  }

  calcStore.expression = operator
    ? firstOperand + operator + secondOperand
    : firstOperand;

  writeToDisplay(calcStore.expression);
}

export {
  calcStore,
  calculateResult,
  clearExpression,
  deleteLastChar,
  updateExpression,
  toggleSign,
};
