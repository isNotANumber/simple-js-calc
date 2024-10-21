import { operatorsRegex, validCharsRegex } from "../const/const.js";

/**
 * Checks if a character is valid.
 * @param {string} char - The character to check.
 * @returns {boolean} - True if the character is valid, false otherwise.
 */
function isValidChar(char) {
  return validCharsRegex.test(char);
}

/**
 * Checks if a character is dot symbol.
 * @param {string} char - The character to check.
 */
function isDot(char) {
  return char === ".";
}

/**
 * Checks if a character is operator symbol.
 * @param {string} char - The character to check.
 */
function isOperator(char) {
  return operatorsRegex.test(char);
}

/**
 * Checks if operator in expression.
 * @param {string} expression - Current displayed expression.
 */
function isOperatorInExpression(expression) {
  return operatorsRegex.test(expression);
}

/**
 * Checks if a character is number.
 * @param {string} char - The character to check.
 */
function isNumber(char) {
  return char >= "0" && char <= "9";
}

/**
 * Checks if dot allowed to append to number.
 * @param {expression} - current calc expression.
 */
function isDotAllowed(expression) {
  const lastNumber = expression.split(/[\+\-\*\%\/]/).pop();
  return !lastNumber.includes(".");
}

/**
 * Replaces substrings in operands.
 * @param {string} from
 * @param {string} to
 * @param {*} operands
 */
function replaceInOperands(from, to, ...operands) {
  const result = [];

  for (const operand of operands) {
    operand.includes(from)
      ? result.push(operand.replace(from, to))
      : result.push(operand);
  }

  return result;
}

export {
  isValidChar,
  isDot,
  isOperator,
  isNumber,
  isOperatorInExpression,
  isDotAllowed,
  replaceInOperands,
};
