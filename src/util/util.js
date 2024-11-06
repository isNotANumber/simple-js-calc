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
function isDotAllowed(operand) {
  return !operand.hasDot;
}

/**
 * Checks if a given number is an integer.
 * @param {number} number - The number to be checked.
 * @returns {boolean} `true` if `number` is an integer, `false` otherwise.
 */
function isInt(number) {
  return number % 1 === 0;
}

export { isValidChar, isDot, isOperator, isNumber, isDotAllowed, isInt };
